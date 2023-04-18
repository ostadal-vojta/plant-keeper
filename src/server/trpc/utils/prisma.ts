import {PrismaClient} from "@prisma/client";

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
}
export const prismaClient = prismaGlobal.prisma || new PrismaClient();