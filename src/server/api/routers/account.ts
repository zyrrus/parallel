import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { editAccountDetailsSchema } from "@constants/schema/profile";

export const accountRouter = createTRPCRouter({
  getNewUserStatus: protectedProcedure.query(({ ctx }) => {
    const currentUserId = ctx.session.user.id;
    return ctx.prisma.user.findUnique({
      where: { id: currentUserId },
      select: { isNewUser: true },
    });
  }),
  //   editAccountDetails: protectedProcedure
  //     .input(editAccountDetailsSchema)
  //     .mutation(({ ctx, input }) => {}),
  disableNewUserStatus: protectedProcedure.mutation(({ ctx }) => {
    const currentUserId = ctx.session.user.id;
    return ctx.prisma.user.update({
      where: { id: currentUserId },
      data: { isNewUser: false },
    });
  }),
});
