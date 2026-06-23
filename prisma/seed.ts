import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const adminUserId: string = "cmqojbcg60000lgfwtnenvkdz";

export async function main() {
    await prisma.role.createMany({
      data: [{ name: "USER" }, { name: "ADMIN" }],
      skipDuplicates: true,
    });
}

main();
