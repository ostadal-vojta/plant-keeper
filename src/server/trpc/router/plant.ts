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
  allPlants: publicProcedure.query(async ({ ctx }) => {
    const plants = await ctx.prisma.plant.findMany();

    const plantsWithDaysToWater = plants.map((plant) => {
      if (!plant.watered) {
        return { ...plant, daysToWater: 0 };
      }
      return { ...plant, daysToWater: dayjs(plant.watered).add(plant.interval, "day").diff(dayjs(), "day") };
    });
    const sortedByDaysToWater = plantsWithDaysToWater.sort((plantA, plantB) => {
      return plantA.daysToWater - plantB.daysToWater;
    });

    return { sortedByDaysToWater };
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
