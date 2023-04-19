import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { usernameSchema } from "@utils/constants/schema/profile";

export const profileRouter = createTRPCRouter({
  getProfileByUsername: publicProcedure
    .input(usernameSchema)
    .query(async ({ ctx, input: username }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { username },
        select: {
          username: true,
          name: true,
          bio: true,
          image: true,
          authoredProjects: true,
          projects: true,
        },
      });
      console.log("USER", user);
      return user;
    }),
});
