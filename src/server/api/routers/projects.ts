import { proposalSchema } from "@utils/constants/schema/project";
import { ProjectLifecycle } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const projectsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany({
      take: 100,
      include: { members: true, author: true },
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
    .query(async ({ ctx, input }) => {
      const projects = await ctx.prisma.project.findMany({
        where: { state: input.state },
        select: {
          id: true,
          author: true,
          members: true,
          bannerImageUrl: true,
          createdAt: true,
          description: true,
          state: true,
          title: true,
        },
        take: 100,
        orderBy: [{ createdAt: "desc" }],
      });

      return projects.map((p) => ({
        members: (() => {
          p.members.push(p.author);
          return p.members
            .map((m) => m.username)
            .filter((username) => !!username) as string[];
        })(),
        id: p.id,
        createdAt: p.createdAt,
        title: p.title,
        description: p.description,
        bannerImageUrl: p.bannerImageUrl,
        state: p.state,
      }));
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
        include: { author: true, members: true, previews: true },
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
  updateState: protectedProcedure
    .input(
      z.object({
        state: z.nativeEnum(ProjectLifecycle),
        projectId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, state } = input;
      await ctx.prisma.project.update({
        where: { id: projectId },
        data: { state },
      });
    }),
});
