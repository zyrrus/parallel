import { Divider } from "@components/Divider";
import { requireAuth } from "@components/HOC/requireAuth";
import { SearchBar } from "@components/SearchBar";
import { MainLayout } from "@components/layouts";
import { ProjectCardList } from "@components/projects/ProjectCardList";
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
      <div className="mx-11 my-8">
        <h1 className="font-bold text-primary text-r-5xl">{data?.name}</h1>
        <p>@{data?.username}</p>
        <p>{data?.bio}</p>
      </div>
      <Divider className="my-11" />
      <h2 className="mx-11 font-bold text-r-4xl">My Projects</h2>
      {data && data.authoredProjects.length > 0 ? (
        <ProjectCardList projects={data?.authoredProjects} />
      ) : (
        <p className="mx-11">There are no projects here yet.</p>
      )}
      <h2 className="mx-11 font-bold text-r-4xl">
        Projects I{"'"}ve Worked On
      </h2>
      {data && data.projects.length > 0 ? (
        <ProjectCardList projects={data?.projects} />
      ) : (
        <p className="mx-11">There are no projects here yet.</p>
      )}
    </MainLayout>
  );
};

export default Profile;

export const getServerSideProps = requireAuth((ctx) => {
  return { props: { username: ctx.params?.username } };
});
