import { proposalSchema } from "@constants/schema";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const projectsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany({
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
