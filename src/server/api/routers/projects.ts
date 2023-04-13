import { proposalSchema } from "@utils/constants/schema/project";
import { Project, ProjectLifecycle } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const projectsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });
  }),
  getAllByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({
        where: { id: input.userId },
        select: { projects: true },
      });
    }),
  getAllByState: publicProcedure
    .input(
      z.object({
        state: z.nativeEnum(ProjectLifecycle),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findMany({
        where: { state: input.state },
        take: 100,
        orderBy: [{ createdAt: "desc" }],
      });
    }),
  createProposal: protectedProcedure
    .input(proposalSchema)
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session.user.id;

      const proposal = await ctx.prisma.project.create({
        data: { authorId, title: input.title, description: input.description },
      });

      return proposal;
    }),
});
