import { createTRPCRouter } from "./trpc";
import { projectsRouter } from "./routers/projects";
import { accountRouter } from "./routers/account";
import { profileRouter } from "./routers/profiles";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  projects: projectsRouter,
  profile: profileRouter,
  account: accountRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
