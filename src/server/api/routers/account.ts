import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  editAccountDetailsSchema,
  usernameSchema,
} from "@utils/constants/schema/profile";
import { TRPCError } from "@trpc/server";
import type { Prisma, PrismaClient } from "@prisma/client";

type PrismaCtx = PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>;

async function checkUsernameExists(
  prisma: PrismaCtx,
  username: string
): Promise<boolean> {
  const user = await prisma.user.findFirst({ where: { username } });
  return Boolean(user);
}

export const accountRouter = createTRPCRouter({
  checkIsNewUser: protectedProcedure.query(async ({ ctx }) => {
    const currentUserId = ctx.session.user.id;
    const user = await ctx.prisma.user.findUnique({
      where: { id: currentUserId },
      select: { username: true },
    });

    if (!user)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Could not find user.",
      });

    return !Boolean(user.username);
  }),
  editAccountDetails: protectedProcedure
    .input(editAccountDetailsSchema)
    .mutation(async ({ ctx, input }) => {
      const currentUserId = ctx.session.user.id;
      const { username, name, bio } = input;

      // Check if username already exists
      const usernameAlreadyExists = await checkUsernameExists(
        ctx.prisma,
        username
      );
      if (usernameAlreadyExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username has already been taken.",
        });
      }

      // Otherwise, update the user data
      try {
        const user = await ctx.prisma.user.update({
          where: { id: currentUserId },
          data: {
            username,
            name: name.length > 0 ? name : undefined,
            bio: bio.length > 0 ? bio : undefined,
          },
        });

        return { username: user.username };
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not update user information.",
        });
      }
    }),
  checkUsernameExists: protectedProcedure
    .input(usernameSchema)
    .query(async ({ ctx, input: username }) => {
      return await checkUsernameExists(ctx.prisma, username);
    }),
});
