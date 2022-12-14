import { router } from "../trpc";
import { plantRouter } from "./plant";

export const appRouter = router({
  plantRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
