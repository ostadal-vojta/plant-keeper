import { z } from "zod";
import { router, publicProcedure } from "@/server/trpc/trpc";
import { TRPCError } from "@trpc/server";
import dayjs from "dayjs";

export const plantRouter = router({
  plant: publicProcedure
    .input(z.number())
    .query(({ ctx, input }) => {
      return ctx.prisma.plant.findUnique({ where: { id: input } });
    }),
  allPlants: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.plant.findMany();
  }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      description: z.string(),
      placeId: z.number(),
      interval: z.number(),
      amount: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      const room = await ctx.prisma.place.findFirst({
        where: { id: input.placeId }
      });

      if (!room) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid room."
        });
      }

      return ctx.prisma.plant.create({
        data: { ...input }
      });
    }),

  water: publicProcedure
    .input(z.object({
      id: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
        const plantToWater = await ctx.prisma.plant.findFirst({
          where: { id: input.id }
        });

        if (!plantToWater) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Plant does not exist."
          });
        }

        return ctx.prisma.plant.update({
          where: { id: input.id },
          data: { watered: dayjs().toDate() }
        });
      }
    )
});
