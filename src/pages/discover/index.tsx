import { DiscoverLayout } from "@components/layouts";
import { api } from "@utils/api";
import type { InferGetServerSidePropsType, NextPage } from "next";
import { requireAuth } from "@components/HOC/requireAuth";

const Discover: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { data, isLoading, isFetching } = api.projects.getAll.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <DiscoverLayout
      subtitle="Favorites"
      projects={data}
      showLoading={isLoading || isFetching}
    />
  );
};

export default Discover;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});
