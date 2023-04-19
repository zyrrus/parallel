import { proposalSchema } from "@utils/constants/schema/project";
import { ProjectLifecycle } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const projectsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });
  }),
  getAllByCurrentUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { authoredProjects: true, projects: true },
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
  getProjectById: publicProcedure
    .input(
      z.object({
        projectId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findUnique({
        where: { id: input.projectId },
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
