import { z } from "zod";
import type { PrismaPromise } from "@prisma/client";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const parallelStatsRouter = createTRPCRouter({
    countCompletedVideos: publicProcedure.query(({ ctx }) => {
        const completedProjectCount: PrismaPromise<number> =
            ctx.prisma.project.count({
                where: { isComplete: { equals: true } },
            });

        return completedProjectCount;
    }),
});
