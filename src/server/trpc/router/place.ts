import { z } from "zod";
import { router, publicProcedure } from "@/server/trpc/trpc";

export const placeRouter = router({
  place: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.place.findUnique({ where: { id: input.id } });
    }),
  allPlaces: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.place.findMany();
  }),
  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.place.create({
        data: { name: input.name }
      });
    })
});