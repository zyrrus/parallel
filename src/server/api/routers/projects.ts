import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const projectsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => ctx.prisma.project.findMany()),
});
