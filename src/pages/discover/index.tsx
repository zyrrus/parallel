import { DiscoverLayout } from "@components/layouts";
import { getServerAuthSession } from "@server/auth";
import { api } from "@utils/api";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Discover: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { data, isLoading } = api.projects.getAll.useQuery();

  return (
    <DiscoverLayout>
      <h2 className="text-r-4xl mb-8 font-bold">Favorites</h2>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        data?.map((project) => (
          <div key={project.id} className="mb-4">
            <h4 className="text-r-2xl font-medium">{project.title}</h4>
            <p className="text-r-sm">{dayjs(project.createdAt).fromNow()}</p>
            <p className="text-r-lg">{project.description}</p>
          </div>
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
