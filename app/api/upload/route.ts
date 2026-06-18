import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { minioClient } from "@/lib/minio";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const fileName = `${randomUUID()}-${file.name}`;

    await minioClient.putObject(
      process.env.MINIO_BUCKET!,
      fileName,
      fileBuffer,
      file.size,
      {
        "Content-Type": file.type,
      },
    );

		const bucket = process.env.MINIO_BUCKET!;
		const endpoint = process.env.MINIO_ENDPOINT || "localhost";
		const port = process.env.MINIO_PORT || 9000;

		const imageUrl = `http://${endpoint}:${port}/${bucket}/${fileName}`;

    return NextResponse.json({
      fileName,
      imageUrl,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
