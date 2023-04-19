import type { Project } from "@prisma/client";
import { formatDate } from "@utils/filters";

export const DisplayProjectCard: React.FC<{ project: Project }> = ({
  project,
}) => {
  return (
    <div key={project.id} className="mb-10">
      <h4 className="text-r-2xl font-medium">{project.title}</h4>
      <p className="text-r-sm">{formatDate(project.createdAt)}</p>
      <p className="text-r-sm">{project.state}</p>
      <p className="text-r-lg">{project.description}</p>
    </div>
  );
};
