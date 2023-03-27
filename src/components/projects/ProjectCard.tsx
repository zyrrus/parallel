import Button from "@components/Button";
import type { Project } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div key={project.id} className="mb-10">
      <h4 className="text-r-2xl font-medium">{project.title}</h4>
      <p className="text-r-sm">{dayjs(project.createdAt).fromNow()}</p>
      <p className="text-r-sm">{project.state}</p>
      <p className="text-r-lg">{project.description}</p>
    </div>
  );
};
