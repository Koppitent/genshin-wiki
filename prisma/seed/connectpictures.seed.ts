import { listBucketFiles } from "@/lib/images/minioService";
import prisma from "@/lib/prisma";
import { log } from "console";

function normalize(name: string) {
  return name.toLowerCase().replace(/\s+/g, "").replace(".jpg", "").replace(".png", "");
}

async function main() {
  console.log("🔄 Starting connectpictures seed...");

  // 1. Load all characters
  const characters = await prisma.character.findMany();

  console.log(`📦 Found ${characters.length} characters`);

  // 2. Load all images from MinIO
  const files = await listBucketFiles("characters");

  console.log(`🖼️ Found ${files.length} images in bucket`);

  // 3. Build lookup map (normalized filename → url)
  const imageMap = new Map<string, string>();

  for (const url of files) {
    const fileName = url.split("/").pop(); // get actual file name
    if (!fileName) continue;

    const key = normalize(fileName);
    imageMap.set(key, url);
  }

  let connected = 0;

  // 4. Match characters
  for (const character of characters) {
    const key = normalize(character.name);

    const imageUrl = imageMap.get(key);

    if (!imageUrl) {
      console.log(`❌ No image found for ${character.name}`);
      continue;
    }

    // 5. Skip if already set
    if (character.imageUrl === imageUrl) {
      console.log(`⏭️ Already connected: ${character.name}`);
      continue;
    }

    // 6. Update DB
    await prisma.character.update({
      where: { id: character.id },
      data: { imageUrl },
    });

    connected++;
    console.log(`✅ Connected ${character.name} → ${imageUrl}`);
  }

  console.log(`🎉 Done! Connected ${connected} images.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
