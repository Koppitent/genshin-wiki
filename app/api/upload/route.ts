import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { minioClient } from "@/lib/minio";
import { withErrorHandler } from "@/lib/api/errorHandler";
import { requireAdmin } from "@/lib/auth/authService";
import {
  BucketType,
  deleteFromBucket,
  listBucketFiles,
  uploadToBucket,
} from "@/lib/images/minioService";

export const POST = withErrorHandler(async (request: NextRequest) => {
  await requireAdmin();
  const BUCKET: BucketType =
    (request.nextUrl.searchParams.get("bucket") as BucketType) ?? "characters";

  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${randomUUID()}-${file.name}`;

  const result = await uploadToBucket(
    BUCKET,
    fileName,
    buffer,
    file.size,
    file.type,
  );

  return NextResponse.json({
    fileName,
    imageUrl: result.url,
  });
});

export const GET = withErrorHandler(async (request: NextRequest) => {
  await requireAdmin();
  const BUCKET: BucketType =
    (request.nextUrl.searchParams.get("bucket") as BucketType) ?? "characters";

  const images = await listBucketFiles(BUCKET);

  return NextResponse.json({ images });
});

export const DELETE = withErrorHandler(async (request: NextRequest) => {
  await requireAdmin();

  const bucket: BucketType =
    (request.nextUrl.searchParams.get("bucket") as BucketType) ?? "characters";

  const fileName = request.nextUrl.searchParams.get("file");

  if (!fileName) {
    return NextResponse.json({ error: "Missing file name" }, { status: 400 });
  }

  await deleteFromBucket(bucket, fileName);

  return NextResponse.json({
    success: true,
    fileName,
  });
});