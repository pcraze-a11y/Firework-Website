import { NextRequest, NextResponse } from "next/server"

function isAuthorized(request: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false

  const cookieToken = request.cookies.get("x-admin-token")?.value
  if (cookieToken === adminPassword) return true

  const authHeader = request.headers.get("Authorization")
  if (authHeader?.startsWith("Basic ")) {
    const base64 = authHeader.slice(6)
    const decoded = Buffer.from(base64, "base64").toString("utf-8")
    const colonIndex = decoded.indexOf(":")
    if (colonIndex !== -1) {
      const password = decoded.slice(colonIndex + 1)
      if (password === adminPassword) return true
    }
  }

  return false
}

export function proxy(request: NextRequest) {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Admin"',
      },
    })
  }

  const response = NextResponse.next()
  const adminPassword = process.env.ADMIN_PASSWORD ?? ""
  response.cookies.set("x-admin-token", adminPassword, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  })
  return response
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
