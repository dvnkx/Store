import fs from "fs/promises";
import { NextResponse } from "next/server";

type getFileDetailsProps = {
  filePath: string;
  name: string;
};

export const getFileDetails = async ({
  filePath,
  name,
}: getFileDetailsProps) => {
  const { size } = await fs.stat(filePath);
  const file = await fs.readFile(filePath);
  const extension = filePath.split(".").pop();

  return new NextResponse(file, {
    headers: {
      "Content-Disposition": `attachment; filename="${name}.${extension}"`,
      "Content-Length": size.toString(),
    },
  });
};
