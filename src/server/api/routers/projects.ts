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
  getAllByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findMany({
        where: { authorId: input.userId },
        take: 100,
        orderBy: [{ createdAt: "desc" }],
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
