import { NextRequest, NextResponse } from "next/server";

import { s3 } from "@/lib/aws-config";
import { env } from "@/config";

// Example usasages: /api/upload?fileName=&fileType=
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const fileName = searchParams.get("fileName");
  const fileType = searchParams.get("fileType");

  const s3Params = {
    Bucket: env.AWS_S3_BUCKET_NAME,
    Key: `uploads/${fileName}`,
    Expires: 60, // Expiry time of the URL
    ContentType: fileType,
    ACL: "public-read", // Adjust according to privacy needs
  };

  try {
    const uploadURL = await s3.getSignedUrlPromise("putObject", s3Params);

    return NextResponse.json({
      success: true,
      uploadURL: uploadURL,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
