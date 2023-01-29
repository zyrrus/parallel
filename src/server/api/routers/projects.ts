import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const projectRouter = createTRPCRouter({
    // countCompletedVideos: publicProcedure.query(({ ctx }) => 0),
});
