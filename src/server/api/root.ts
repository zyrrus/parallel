import { createTRPCRouter } from "./trpc";
import { projectRouter } from "./routers/projects";
import { parallelStatsRouter } from "./routers/parallel";

/*
 * All newly created routers should be added here
 */
export const appRouter = createTRPCRouter({
    parallelStats: parallelStatsRouter,
    projects: projectRouter,
});

export type AppRouter = typeof appRouter;
