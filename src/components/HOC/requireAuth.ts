import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getServerAuthSession } from "@server/auth";
import type { Session } from "next-auth";

type GetServerSidePropsWithAuth = (
  ctx: GetServerSidePropsContext,
  session: Session
) =>
  | Promise<
      GetServerSidePropsResult<{
        [key: string]: any;
      }>
    >
  | GetServerSidePropsResult<{
      [key: string]: any;
    }>;

export const requireAuth =
  (func: GetServerSidePropsWithAuth) =>
  async (ctx: GetServerSidePropsContext) => {
    const session = await getServerAuthSession(ctx);

    if (!session) {
      return {
        redirect: {
          destination: "/auth/sign-in",
          permanent: false,
        },
      };
    }

    return await func(ctx, session);
  };
