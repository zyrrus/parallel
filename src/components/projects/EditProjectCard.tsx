import type { Project } from "@prisma/client";
import { formatDate } from "@utils/filters";
import Link from "next/link";

export const EditProjectCard: React.FC<{ project: Project }> = ({
  project,
}) => {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="mb-10 rounded border-[6px] border-fg py-2 px-3">
        <h4 className="text-r-2xl font-medium">{project.title}</h4>
        <p className="text-r-sm">{formatDate(project.createdAt)}</p>
        <p className="text-r-sm">{project.state}</p>
        <p className="text-r-lg">{project.description}</p>
      </div>
    </Link>
  );
};
