import type { NextPage } from "next";
import { MainLayout } from "@components/layouts";
import { requireAuth } from "@components/HOC/requireAuth";
import { api } from "@utils/api";
import { useMemo } from "react";
import { EditProjectCard } from "@components/projects/EditProjectCard";

const Projects: NextPage = () => {
  const { data } = api.projects.getAllByCurrentUser.useQuery();

  const sortedProjects = useMemo(() => {
    if (!data) return [];

    const projects = data.projects.concat(data.authoredProjects);
    return projects.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }, [data]);

  return (
    <MainLayout>
      <h1 className="text-r-5xl font-bold text-primary">Projects</h1>
      {sortedProjects.map((p) => (
        <EditProjectCard key={p.id} project={p} />
      ))}
    </MainLayout>
  );
};

export default Projects;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});
