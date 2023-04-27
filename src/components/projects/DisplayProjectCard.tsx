import { useState } from "react";
import type { Project, User } from "@prisma/client";
import { formatDate } from "@utils/filters";

export const DisplayProjectCard: React.FC<{
  project: Omit<Project, "authorId"> & {
    members: User[];
  };
}> = ({ project }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      tabIndex={0}
      onMouseEnter={() => setShowMore(true)}
      onMouseLeave={() => setShowMore(false)}
      onClick={() => setShowMore((prevState) => !prevState)}
      onFocus={() => setShowMore(true)}
      onBlur={() => setShowMore(false)}
      className="max-w-lg"
    >
      <h4 className="text-r-2xl font-medium">{project.title}</h4>
      <p className="text-r-sm">{formatDate(project.createdAt)}</p>
      <p className="text-r-sm">{project.state}</p>
      <p>{project.members.join(", ")}</p>
      {showMore && (
        <p className="text-r-lg" aria-hidden={!showMore}>
          {project.description}
        </p>
      )}
    </div>
  );
};
