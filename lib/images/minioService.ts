import { minioClient } from "@/lib/minio";

export type BucketType = "characters" | "weapons";

function getBucket(type: BucketType): string {
  const key = `MINIO_BUCKET_${type.toUpperCase()}`;
  const bucket = process.env[key];

  if (!bucket) {
    throw new Error(`Missing env: ${key}`);
  }

  return bucket;
}

export async function listBucketFiles(bucketType: BucketType) {
  const files: string[] = [];

  const bucket = getBucket(bucketType);
  const stream = minioClient.listObjectsV2(bucket, "", true);

  await new Promise<void>((resolve, reject) => {
    stream.on("data", (obj) => {
      if (!obj.name) return;

      const endpoint = process.env.MINIO_ENDPOINT || "localhost";
      const port = process.env.MINIO_PORT || 9000;

      files.push(`http://${endpoint}:${port}/${bucket}/${obj.name}`);
    });

    stream.on("end", resolve);
    stream.on("error", reject);
  });

  return files;
}

export async function uploadToBucket(
  type: BucketType,
  fileName: string,
  buffer: Buffer,
  size: number,
  contentType: string,
) {
  const bucket = getBucket(type);

  await minioClient.putObject(bucket, fileName, buffer, size, {
    "Content-Type": contentType,
  });

  const endpoint = process.env.MINIO_ENDPOINT || "localhost";
  const port = process.env.MINIO_PORT || 9000;

  return {
    bucket,
    url: `http://${endpoint}:${port}/${bucket}/${fileName}`,
  };
}

export async function deleteFromBucket(type: BucketType, fileName: string) {
  const bucket = getBucket(type);

  await minioClient.removeObject(bucket, fileName);

  return {
    bucket,
    fileName,
  };
}