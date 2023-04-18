import { router } from "../trpc";
import { plantRouter } from "./plant";
import { placeRouter } from "@/server/trpc/router/place";

export const appRouter = router({
  plantRouter, placeRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
