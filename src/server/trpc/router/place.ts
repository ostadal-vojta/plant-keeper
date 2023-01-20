import { z } from "zod";
import { router, publicProcedure } from "@/server/trpc/trpc";

export const placeRouter = router({
  place: publicProcedure
    .input(z.number())
    .query(({ ctx, input }) => {
      return ctx.prisma.place.findUnique({ where: { id: input } });
    }),
  allPlaces: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.place.findMany();
  })
});