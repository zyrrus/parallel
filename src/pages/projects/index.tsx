import type { NextPage } from "next";
import { MainLayout } from "@components/layouts";
import { requireAuth } from "@components/HOC/requireAuth";
import { api } from "@utils/api";
import { useMemo, useState } from "react";
import { SearchBar } from "@components/SearchBar";
import { Divider } from "@components/Divider";
import { useSession } from "next-auth/react";
import { cx } from "class-variance-authority";
import { ProjectCardList } from "@components/projects/ProjectCardList";

const Projects: NextPage = () => {
  // === Hooks ================================================================

  const { data: session, status } = useSession();
  const [searchText, setSearchText] = useState("");

  // === Data Fetching ========================================================

  const {
    data: projects,
    isLoading,
    isFetching,
  } = api.projects.getAllByCurrentUser.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  // === Data Processing ======================================================

  const personalizedPageTitle = useMemo(() => {
    const username = session?.user.username;
    if (!username) return "Projects";

    const possessiveEnding =
      username.charAt(username.length - 1) === "s" ? "'" : "'s";

    return `${username}${possessiveEnding} Projects`;
  }, [session?.user.username]);

  const sortedProjects = useMemo(() => {
    if (!projects) return [];

    const mergedProjects = projects.projects.concat(projects.authoredProjects);

    const filteredBySearch = mergedProjects.filter((project) =>
      project.title?.toLowerCase().includes(searchText.toLowerCase())
    );

    return filteredBySearch.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }, [projects, searchText]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <MainLayout>
      <h1
        className={cx(
          "mx-11 mb-6 mt-8 font-bold text-r-5xl",
          status === "loading"
            ? "max-w-md animate-pulse rounded bg-primary/25 text-primary/0"
            : "text-primary"
        )}
      >
        {personalizedPageTitle}
      </h1>
      <div className="mx-11 max-w-3xl">
        <SearchBar
          placeholder="Search through projects you've worked on"
          value={searchText}
          onChange={handleSearchInputChange}
          clearInput={() => setSearchText("")}
        />
      </div>
      <Divider className="my-11" />
      <ProjectCardList
        showNewProjectButton
        projects={sortedProjects}
        showLoading={isLoading || isFetching}
      />
    </MainLayout>
  );
};

export default Projects;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});
