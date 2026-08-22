import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const bucket = process.env.S3_BUCKET ?? "chronologicalbibleacademy";
const region = process.env.AWS_REGION ?? "us-east-2";
const publicBaseUrl = (
  process.env.S3_PUBLIC_BASE_URL ??
  `https://${bucket}.s3.${region}.amazonaws.com`
).replace(/\/+$/, "");

let client: S3Client | null = null;

function getClient() {
  if (!client) {
    client = new S3Client({ region });
  }
  return client;
}

function normalizeKey(relKey: string) {
  return relKey.replace(/^\/+/, "");
}

function publicUrlForKey(key: string) {
  return `${publicBaseUrl}/${key.split("/").map(encodeURIComponent).join("/")}`;
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  const body = typeof data === "string" ? Buffer.from(data) : data;

  await getClient().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  return { key, url: publicUrlForKey(key) };
}

export async function storageGet(
  relKey: string
): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  return { key, url: publicUrlForKey(key) };
}
