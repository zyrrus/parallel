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
          <p>{data.username}</p>
          <p>{data.name}</p>
          <p>{data.bio}</p>
          <p>
            {data.projects.map((m) => (
              <>
                <p>{m.title}</p>
              </>
            ))}
          </p>
        </>
      )}
    </MainLayout>
  );
};

export default Profile;

export const getServerSideProps = requireAuth((ctx) => {
  return { props: { username: ctx.params?.username } };
});
