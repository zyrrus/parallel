import { DiscoverLayout } from "@components/layouts";
import { getServerAuthSession } from "@server/auth";
import { api } from "@utils/api";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { ProjectCard } from "@components/projects/ProjectCard";

const Discover: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { data, isLoading } = api.projects.getAllByState.useQuery({
    state: "PROPOSAL",
  });

  return (
    <DiscoverLayout>
      <h2 className="text-r-4xl mb-8 font-bold">Proposals</h2>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        data?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))
      )}
    </DiscoverLayout>
  );
};

export default Discover;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(ctx);

  if (session === null || session.user === null || session.user.id === null) {
    return {
      redirect: { destination: "/api/auth/signin", permanent: false },
    };
  }

  return { props: { session } };
};
