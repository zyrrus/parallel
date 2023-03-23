import { DiscoverLayout } from "@components/layouts";
import { getServerAuthSession } from "@server/auth";
import { typo } from "@styles/typography";
import { api } from "@utils/api";
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

const Discover: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { data } = api.projects.getAll.useQuery();

  return (
    <DiscoverLayout>
      {data?.map((project) => (
        <div key={project.id}>
          <h4 className={typo({ tag: "h4" })}>{project.title}</h4>
          <p>{project.description}</p>
        </div>
      ))}
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
