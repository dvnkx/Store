import db from "@/db/db";
import { routes } from "@/keys";
import { NextRequest, NextResponse } from "next/server";
import { getFileDetails } from "@/app/_actions/file.action";

export const GET = async (
  req: NextRequest,
  {
    params: { downloadVerificationId },
  }: { params: { downloadVerificationId: string } }
) => {
  const data = await db.downloadVerification.findUnique({
    where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
    select: { product: { select: { filePath: true, name: true } } },
  });

  if (data == null) {
    return NextResponse.redirect(new URL(routes.DOWNLOAD_EXPIRES, req.url));
  }

  return getFileDetails(data.product);
};
