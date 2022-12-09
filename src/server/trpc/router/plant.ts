import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const plantRouter = router({
    plant: publicProcedure
        .input(z.object({
            plantId: z.number(),
        }))
        .query(({ input }) => {
            return {
                plantId: input.plantId,
                plantName: 'Dracaena',
                description: 'Water every 1-2 weeks, allowing soil to dry out between waterings. Expect to water more often in brighter light and less often in lower light.'

            };
        }),
});
