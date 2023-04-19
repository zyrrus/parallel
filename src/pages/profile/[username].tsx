import { requireAuth } from "@components/HOC/requireAuth";
import { MainLayout } from "@components/layouts";
import { api } from "@utils/api";
import type { InferGetServerSidePropsType } from "next";
import { type NextPage } from "next";

const Profile: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ username }) => {
  const { data } = api.profile.getProfileByUsername.useQuery(
    username as string
  );

  return (
    <MainLayout>
      <h1 className="text-r-5xl font-bold text-primary">Profile</h1>
      {data && (
        <>
          <h2 className="text-r-4xl">{data.name}</h2>
          <p>{data.username}</p>
          <p>{data.bio}</p>

          <h3 className="text-r-3xl">My Projects</h3>
          {data.authoredProjects.map((m) => (
            <>
              <p>{m.title}</p>
              <p>{m.description}</p>
            </>
          ))}
          <h3 className="text-r-3xl">Projects I{"'"}ve Worked On</h3>
          {data.projects.map((m) => (
            <>
              <p>{m.title}</p>
              <p>{m.description}</p>
            </>
          ))}
        </>
      )}
    </MainLayout>
  );
};

export default Profile;

export const getServerSideProps = requireAuth((ctx) => {
  return { props: { username: ctx.params?.username } };
});
