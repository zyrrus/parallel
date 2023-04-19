import { DiscoverLayout } from "@components/layouts";
import { api } from "@utils/api";
import type { InferGetServerSidePropsType, NextPage } from "next";
import { DisplayProjectCard } from "@components/projects/DisplayProjectCard";
import { requireAuth } from "@components/HOC/requireAuth";

const Discover: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { data, isLoading } = api.projects.getAllByState.useQuery({
    state: "REVISION",
  });

  return (
    <DiscoverLayout>
      <h2 className="text-r-4xl mb-8 font-bold">Revisions</h2>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        data?.map((project) => (
          <DisplayProjectCard key={project.id} project={project} />
        ))
      )}
    </DiscoverLayout>
  );
};

export default Discover;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});
