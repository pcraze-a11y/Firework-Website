import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Left column (A) = 9 spots, right column (B) = 9 spots
// matching the 18 white squares measured from the aerial photo.
const SPOTS = [
  ...Array.from({ length: 9 }, (_, i) => ({ id: `A${i + 1}`, row: "A", col: i + 1 })),
  ...Array.from({ length: 9 }, (_, i) => ({ id: `B${i + 1}`, row: "B", col: i + 1 })),
];

async function main() {
  const result = await prisma.spot.createMany({
    data: SPOTS,
    skipDuplicates: true,
  });
  console.log(`Seeded ${result.count} spots`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
