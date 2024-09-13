import db from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";
import { getFileDetails } from "@/app/_actions/file.action";

export async function GET(
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const product = await db.product.findUnique({
    where: { id },
    select: { filePath: true, name: true },
  });

  if (product == null) return notFound();

  return getFileDetails(product);
}
