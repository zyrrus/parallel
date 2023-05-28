import type { ProjectCardDetails } from "@utils/types/props";
import {
  NewProjectCard,
  LoadingProjectCard,
  ProjectCard,
} from "./ProjectCards";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface ProjectCardListProps {
  projects?: ProjectCardDetails[];
  loadingCount?: number;
  showLoading?: boolean;
  showNewProjectButton?: boolean;
}

export const ProjectCardList: React.FC<ProjectCardListProps> = ({
  projects,
  loadingCount = 5,
  showLoading = false,
  showNewProjectButton = false,
}) => {
  const [animationRef] = useAutoAnimate();

  return (
    <ul className="m-11 flex flex-row flex-wrap gap-11" ref={animationRef}>
      {showNewProjectButton && <NewProjectCard component="li" />}
      {showLoading || !projects
        ? Array(loadingCount).fill(<LoadingProjectCard component="li" />)
        : projects.map((p) => <ProjectCard key={p.id} {...p} component="li" />)}
    </ul>
  );
};
