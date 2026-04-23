import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const spots = rows.flatMap((row) =>
    cols.map((col) => ({
      id: `${row}${col}`,
      row,
      col,
    }))
  );

  const result = await prisma.spot.createMany({
    data: spots,
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
