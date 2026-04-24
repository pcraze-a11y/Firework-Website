const args = process.argv.slice(2)
const baseUrlIndex = args.indexOf("--base-url")
const BASE_URL =
  baseUrlIndex !== -1 && args[baseUrlIndex + 1]
    ? args[baseUrlIndex + 1]
    : "http://localhost:3000"

const RUN_ID = Date.now()

interface TestResult {
  name: string
  passed: boolean
  details: string[]
}

async function post(path: string, body: unknown): Promise<Response> {
  return fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
}

async function get(path: string): Promise<Response> {
  return fetch(`${BASE_URL}${path}`)
}

async function release(token: string): Promise<void> {
  try {
    await post("/api/release", { token })
  } catch {
    // Best-effort cleanup; test outcome already recorded.
  }
}

// ---------------------------------------------------------------------------
// Test 1: Concurrent reservation race
// ---------------------------------------------------------------------------
async function testConcurrentRace(): Promise<TestResult> {
  const name = "Test 1: Concurrent reservation race"
  const details: string[] = []
  const spotId = "A1"

  const requests = Array.from({ length: 5 }, (_, i) =>
    post("/api/reserve", {
      spotId,
      familyName: "Test Family",
      email: `email${i + 1}_${RUN_ID}@test.com`,
    })
  )

  const responses = await Promise.all(requests)
  const statuses = await Promise.all(
    responses.map(async (r) => {
      const body = await r.json() as { error?: string; reservation?: { releaseToken: string } }
      return { status: r.status, body }
    })
  )

  const successors = statuses.filter((r) => r.status === 201)
  const conflicts = statuses.filter((r) => r.status === 409)

  statuses.forEach((r, i) => {
    details.push(`  Request ${i + 1}: HTTP ${r.status} — ${JSON.stringify(r.body).slice(0, 120)}`)
  })

  const exactlyOneSuccess = successors.length === 1
  const allOthersConflict =
    conflicts.length === 4 &&
    conflicts.every((r) => (r.body as { error?: string }).error === "spot_taken")

  details.push(`  Successes: ${successors.length} (expected 1)`)
  details.push(`  spot_taken conflicts: ${conflicts.length} (expected 4)`)

  const passed = exactlyOneSuccess && allOthersConflict

  // Cleanup
  for (const s of successors) {
    const token = (s.body as { reservation?: { releaseToken: string } }).reservation?.releaseToken
    if (token) await release(token)
  }

  return { name, passed, details }
}

// ---------------------------------------------------------------------------
// Test 2: Duplicate email rejection
// ---------------------------------------------------------------------------
async function testDuplicateEmail(): Promise<TestResult> {
  const name = "Test 2: Duplicate email rejection"
  const details: string[] = []
  const email = `dup_${RUN_ID}@test.com`
  let releaseToken: string | undefined

  const first = await post("/api/reserve", { spotId: "B1", familyName: "Test Family", email })
  const firstBody = await first.json() as { reservation?: { releaseToken: string }; error?: string }
  details.push(`  First reserve (B1): HTTP ${first.status}`)

  if (first.status !== 201) {
    details.push(`  Unexpected status on first reserve: ${JSON.stringify(firstBody)}`)
    return { name, passed: false, details }
  }

  releaseToken = firstBody.reservation?.releaseToken

  const second = await post("/api/reserve", { spotId: "C1", familyName: "Test Family", email })
  const secondBody = await second.json() as { error?: string }
  details.push(`  Second reserve (C1, same email): HTTP ${second.status} — ${JSON.stringify(secondBody)}`)

  const passed = second.status === 409 && secondBody.error === "email_exists"
  details.push(`  error === "email_exists": ${secondBody.error === "email_exists"}`)

  if (releaseToken) await release(releaseToken)

  return { name, passed, details }
}

// ---------------------------------------------------------------------------
// Test 3: End-to-end reservation flow
// ---------------------------------------------------------------------------
async function testEndToEndFlow(): Promise<TestResult> {
  const name = "Test 3: End-to-end reservation flow"
  const details: string[] = []
  const email = `e2e_${RUN_ID}@test.com`
  const spotId = "D1"
  let passed = true

  // Step 1: Reserve
  const reserveRes = await post("/api/reserve", { spotId, familyName: "E2E Family", email })
  const reserveBody = await reserveRes.json() as {
    reservation?: { spotId: string; releaseToken: string }
    error?: string
  }
  const step1 = reserveRes.status === 201 && !!reserveBody.reservation?.releaseToken
  details.push(`  Step 1 — Reserve ${spotId}: HTTP ${reserveRes.status} — ${step1 ? "PASS" : "FAIL"}`)
  if (!step1) {
    details.push(`    Body: ${JSON.stringify(reserveBody)}`)
    return { name, passed: false, details }
  }
  passed = passed && step1

  const releaseToken = reserveBody.reservation!.releaseToken

  // Step 2: GET /api/my-reservation
  const myRes = await get(`/api/my-reservation?email=${encodeURIComponent(email)}`)
  const myBody = await myRes.json() as { reservation?: { spotId: string } | null }
  const step2 = myRes.status === 200 && myBody.reservation?.spotId === spotId
  details.push(`  Step 2 — GET my-reservation: HTTP ${myRes.status}, spotId=${myBody.reservation?.spotId ?? "null"} — ${step2 ? "PASS" : "FAIL"}`)
  passed = passed && step2

  // Step 3: GET /api/spots — spot appears as reserved
  const spotsRes1 = await get("/api/spots")
  const spotsBody1 = await spotsRes1.json() as { spots?: Array<{ id: string; reservation?: unknown }> }
  const foundSpot1 = spotsBody1.spots?.find((s) => s.id === spotId)
  const step3 = spotsRes1.status === 200 && foundSpot1 !== undefined && foundSpot1.reservation !== null && foundSpot1.reservation !== undefined
  details.push(`  Step 3 — Spot ${spotId} is reserved: ${step3 ? "PASS" : "FAIL"} (reservation=${JSON.stringify(foundSpot1?.reservation)})`)
  passed = passed && step3

  // Step 4: Release
  const releaseRes = await post("/api/release", { token: releaseToken })
  const releaseBody = await releaseRes.json() as { released?: boolean }
  const step4 = releaseRes.status === 200 && releaseBody.released === true
  details.push(`  Step 4 — Release: HTTP ${releaseRes.status} — ${step4 ? "PASS" : "FAIL"}`)
  passed = passed && step4

  // Step 5: GET /api/spots — spot no longer reserved
  const spotsRes2 = await get("/api/spots")
  const spotsBody2 = await spotsRes2.json() as { spots?: Array<{ id: string; reservation?: unknown }> }
  const foundSpot2 = spotsBody2.spots?.find((s) => s.id === spotId)
  const step5 =
    spotsRes2.status === 200 &&
    (foundSpot2 === undefined || foundSpot2.reservation === null || foundSpot2.reservation === undefined)
  details.push(`  Step 5 — Spot ${spotId} is free after release: ${step5 ? "PASS" : "FAIL"} (reservation=${JSON.stringify(foundSpot2?.reservation ?? null)})`)
  passed = passed && step5

  return { name, passed, details }
}

// ---------------------------------------------------------------------------
// Test 4: Admin CSV export — spots endpoint returns valid JSON
// ---------------------------------------------------------------------------
async function testSpotsEndpoint(): Promise<TestResult> {
  const name = "Test 4: Admin CSV export (API-level — spots JSON)"
  const details: string[] = []

  const res = await get("/api/spots")
  const body = await res.json() as { spots?: unknown }

  const isArray = Array.isArray(body.spots)
  details.push(`  HTTP status: ${res.status}`)
  details.push(`  spots is array: ${isArray}`)
  if (isArray) {
    details.push(`  spots.length: ${(body.spots as unknown[]).length}`)
  } else {
    details.push(`  Body: ${JSON.stringify(body).slice(0, 200)}`)
  }

  const passed = res.status === 200 && isArray

  return { name, passed, details }
}

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------
async function main(): Promise<void> {
  console.log(`Running concurrent-booking tests against ${BASE_URL}\n`)

  // Probe the server first so we can give a clear message if it is not running.
  try {
    await fetch(`${BASE_URL}/api/spots`)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    if (message.includes("ECONNREFUSED") || message.includes("fetch failed")) {
      console.error(
        `ERROR: Could not connect to ${BASE_URL}.\n` +
          `Make sure the dev server is running: npm run dev\n`
      )
      process.exit(1)
    }
    throw err
  }

  const suites: Array<() => Promise<TestResult>> = [
    testConcurrentRace,
    testDuplicateEmail,
    testEndToEndFlow,
    testSpotsEndpoint,
  ]

  const results: TestResult[] = []

  for (const suite of suites) {
    let result: TestResult
    try {
      result = await suite()
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      result = {
        name: suite.name,
        passed: false,
        details: [`  Uncaught error: ${message}`],
      }
    }
    results.push(result)

    const verdict = result.passed ? "PASS" : "FAIL"
    console.log(`[${verdict}] ${result.name}`)
    result.details.forEach((d) => console.log(d))
    console.log()
  }

  const passed = results.filter((r) => r.passed).length
  const total = results.length
  console.log(`${passed}/${total} tests passed`)

  if (passed < total) {
    process.exit(1)
  }
}

main().catch((err) => {
  console.error("Fatal:", err)
  process.exit(1)
})
