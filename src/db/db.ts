import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

/* eslint-disable no-var */

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

/* eslint-enable no-var */

const db = globalThis.prisma ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
