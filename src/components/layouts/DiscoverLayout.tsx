import { MainLayout } from "@components/layouts";
import { ProjectCardList } from "@components/projects/ProjectCardList";
import { SearchBar } from "@components/SearchBar";
import { TabList } from "@components/TabList";
import type { ProjectCardDetails } from "@utils/types/props";
import { useState, useMemo } from "react";

interface DiscoverLayoutProps {
  subtitle: string;
  projects?: ProjectCardDetails[];
  showLoading?: boolean;
}

export const DiscoverLayout: React.FC<DiscoverLayoutProps> = ({
  subtitle,
  projects,
  showLoading,
}) => {
  const [searchText, setSearchText] = useState("");

  const sortedProjects = useMemo(() => {
    if (!projects) return [];

    const filteredBySearch = projects.filter((project) =>
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
      <h1 className="mx-11 mb-6 mt-8 font-bold text-primary text-r-5xl">
        Discover
      </h1>
      <div className="mx-11 max-w-3xl">
        <SearchBar
          placeholder="Search through projects you've worked on"
          value={searchText}
          onChange={handleSearchInputChange}
          clearInput={() => setSearchText("")}
        />
      </div>
      <TabList />
      <h2 className="mx-11 mb-8 font-bold text-r-4xl">{subtitle}</h2>
      <ProjectCardList projects={sortedProjects} showLoading={showLoading} />
    </MainLayout>
  );
};
