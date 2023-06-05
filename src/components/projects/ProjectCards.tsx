import { useState } from "react";
import type { ProjectLifecycle } from "@prisma/client";
import { formatDate } from "@utils/filters";
import type { Children, ProjectCardDetails } from "@utils/types/props";
import { FiPlus } from "react-icons/fi";
import { type VariantProps, cva, cx } from "class-variance-authority";
import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
import { getRootContainer } from "@utils/constants/htmlTools";
import { NewProposalPopup } from "@components/NewProposalPopup";
import Link from "next/link";
import { WithScroll } from "@components/WithScroll";

// === Styles =================================================================

const container = cva(
  [
    "h-72 w-full  max-w-sm rounded-md bg-quaternary shadow-solid-medium transition-all overflow-hidden",
    "focus-visible:outline focus-visible:outline-fg focus-visible:outline-8 focus-visible:outline-offset-2",
  ],
  {
    variants: {
      activity: {
        static: "",
        interactive: [
          "hover:shadow-solid-medium-lowered hover:opacity-90",
          "active:shadow-solid-lowest active:opacity-60",
        ],
        skeleton: "animate-pulse",
      },
    },
  }
);

// === Types ==================================================================

type Component = { component?: React.ElementType };

type ProjectCardContainerProps = Children &
  Component &
  VariantProps<typeof container>;

type ProjectCardProps = Component & ProjectCardDetails;

type NewProjectCardProps = Component & { onSubmit?: () => void };

// === Components =============================================================

const ProjectCardContainer: React.FC<ProjectCardContainerProps> = ({
  children,
  activity = "static",
  component: Tag = "div",
}) => <Tag className={container({ activity: activity })}>{children}</Tag>;

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  state,
  component,
  createdAt,
  bannerImageUrl,
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <ProjectCardContainer activity="interactive" component={component}>
      <Link href={`/projects/${id}`} className="h-full w-full">
        <div
          className="flex h-full w-full flex-col"
          onMouseEnter={() => setShowMore(true)}
          onMouseLeave={() => setShowMore(false)}
          onFocus={() => setShowMore(true)}
          onBlur={() => setShowMore(false)}
        >
          <div
            className={cx(
              "relative w-full transition-all",
              showMore ? "h-14" : "h-48"
            )}
          >
            <Image
              fill
              className="object-cover object-top"
              src={
                bannerImageUrl ??
                `https://picsum.photos/seed/${id}/300/400.webp`
              }
              alt={title}
            />
          </div>
          <div className="mx-4 flex flex-grow flex-col justify-between gap-y-2 overflow-hidden overflow-ellipsis transition-all">
            <label className="mt-4 block overflow-x-clip overflow-ellipsis whitespace-nowrap text-left font-bold text-r-xl">
              {title}
            </label>
            {showMore && (
              <WithScroll height="full">
                <p className="mr-3 max-h-full flex-grow whitespace-pre-wrap">
                  {description}
                </p>
              </WithScroll>
            )}
            <div className="mb-4 flex flex-row items-center gap-x-3">
              <ProjectLifecycleIndicator state={state} />
              <p className="overflow-ellipsis">
                {/* TODO: Change to time last updated */}
                Created {formatDate(createdAt)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </ProjectCardContainer>
  );
};

const ProjectLifecycleIndicator: React.FC<{ state: ProjectLifecycle }> = ({
  state,
}) => {
  const container = getRootContainer();

  const lifecycleColors: Record<ProjectLifecycle, string> = {
    PROPOSAL: "bg-disabled",
    IN_PROGRESS: "bg-warning",
    REVISION: "bg-error",
    COMPLETE: "bg-success",
  };

  const lifecycleTooltips: Record<ProjectLifecycle, string> = {
    PROPOSAL: "This project is in the proposal stage",
    IN_PROGRESS: "This project is in progress",
    REVISION: "This project is in the revision stage",
    COMPLETE: "This project is complete",
  };

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div
            className={`${lifecycleColors[state]} aspect-square w-5 rounded-full shadow-solid-small`}
          />
        </Tooltip.Trigger>
        <Tooltip.Portal container={container}>
          <Tooltip.Content
            side="right"
            sideOffset={4}
            className="animate-slideRightAndFade rounded-md bg-bg-700 p-3 px-3 py-2 text-r-lg"
          >
            {lifecycleTooltips[state]}
            {/* <Tooltip.Arrow className="fill-fg" /> */}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export const NewProjectCard: React.FC<NewProjectCardProps> = ({
  component,
  onSubmit,
}) => {
  return (
    <ProjectCardContainer activity="interactive" component={component}>
      <NewProposalPopup onSubmit={onSubmit}>
        <button className="flex h-full w-full flex-col items-center justify-end transition-all">
          <div className="rounded-full border-8 border-bg bg-secondary shadow-solid-medium">
            <FiPlus size={60} className="m-2 text-bg" />
          </div>
          <label className="mb-2 mt-5 font-bold text-r-2xl">
            Start a new project
          </label>
          <p className="mb-5 max-w-xs text-r-lg">
            Pitch your idea, assemble a team, and create something amazing.
          </p>
        </button>
      </NewProposalPopup>
    </ProjectCardContainer>
  );
};

export const LoadingProjectCard: React.FC<Component> = ({ component }) => {
  return (
    <ProjectCardContainer activity="skeleton" component={component}>
      <div className="h-48 bg-fg/25" />
      <div className="mx-4">
        <div className="mb-2 mt-4 h-8 w-80 rounded bg-fg/25" />
        <div className="flex flex-row items-center gap-x-3">
          <div className="aspect-square w-6 rounded-full bg-fg/25" />
          <div className="h-5 w-56 rounded bg-fg/25" />
        </div>
      </div>
    </ProjectCardContainer>
  );
};
