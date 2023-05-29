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
      <h3 className="mx-11 font-bold text-r-3xl">My Projects</h3>
      <ProjectCardList projects={data?.authoredProjects} />
      <h3 className="mx-11 font-bold text-r-3xl">
        Projects I{"'"}ve Worked On
      </h3>
      <ProjectCardList projects={data?.projects} />
    </MainLayout>
  );
};

export default Profile;

export const getServerSideProps = requireAuth((ctx) => {
  return { props: { username: ctx.params?.username } };
});
