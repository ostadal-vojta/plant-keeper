import { z } from "zod";
import { router, publicProcedure } from "@/server/trpc/trpc";

export const plantRouter = router({
  plant: publicProcedure
    .input(z.number())
    .query(({ ctx, input }) => {
      return ctx.prisma.plant.findUnique({ where: { id: input } });
    }),
  allPlants: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.plant.findMany();
  })
});
