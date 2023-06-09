import type { User, Project, ProjectPreview } from "@prisma/client";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { PropsWithChildren } from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import Image from "next/image";
import { MDX } from "@components/MDX";
import { FiEdit3, FiSettings, FiEye } from "react-icons/fi";
import { ProjectPageMode } from "@utils/types/projects";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

// TODO: all icon buttons should have tooltips

/* === Toolbar ===
 * Visitor: join, leave a comment/review (later)
 * Member: edit, settings
 * Editor: save, cancel
 * Preview: exit
 */

type FetchedProjectAsProps = {
  project:
    | (Project & {
        author: User;
        members: User[];
        previews: ProjectPreview[];
      })
    | null
    | undefined;
};

interface DisplayProps extends FetchedProjectAsProps, PropsWithChildren {
  description: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
}

type CanSetMode = {
  setMode: React.Dispatch<React.SetStateAction<ProjectPageMode>>;
};

type GenericDisplayProps = DisplayProps & PropsWithChildren;
type MemberDisplayProps = DisplayProps & CanSetMode;
type EditorDisplayProps = DisplayProps & CanSetMode;
type PreviewDisplayProps = DisplayProps & CanSetMode;

const GenericDisplay: React.FC<GenericDisplayProps> = ({
  project,
  description,
  children: toolbarItems,
}) => {
  return (
    <div className="flex-1">
      <div className="relative h-44 w-full shadow">
        <Image
          src={
            project?.bannerImageUrl ??
            `https://picsum.photos/seed/${project?.id ?? "A"}/800/200.webp`
          }
          alt="project banner"
          className="object-cover"
          fill
        />
      </div>
      <Toolbar.Root
        className="flex w-full flex-row items-center border-y-2 border-y-fg/10 bg-bg-600 px-5 py-3"
        aria-label="Project options"
      >
        {toolbarItems}
      </Toolbar.Root>
      <article className="mx-5 my-3">
        <h1 className="font-bold text-primary text-r-5xl">{project?.title}</h1>
        <MDX {...description} />
      </article>
    </div>
  );
};

export const VisitorDisplay: React.FC<DisplayProps> = (props) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleJoinRequest = () => {
    toast.error("TODO: Implement 'request to join'");
  };

  return (
    <GenericDisplay {...props}>
      <span className="text-r-base">You are not a member of this project.</span>
      <Toolbar.Separator className="mx-3 h-5 w-[2px] rounded-full bg-fg/30" />
      <div className="flex-grow" />
      <Toolbar.Button asChild>
        <button
          className="mr-5 text-fg/80 text-r-base hover:text-fg-600/80"
          onClick={handleGoBack}
        >
          Go back
        </button>
      </Toolbar.Button>
      <Toolbar.Button asChild>
        <button
          className="font-semibold text-fg text-r-base hover:text-fg-600"
          onClick={handleJoinRequest}
        >
          Request to join
        </button>
      </Toolbar.Button>
    </GenericDisplay>
  );
};

export const PreviewDisplay: React.FC<PreviewDisplayProps> = ({
  setMode,
  ...rest
}) => {
  const handleExitPreview = () => {
    setMode(ProjectPageMode.editor);
  };

  return (
    <GenericDisplay {...rest}>
      <span className="text-r-base">This is a preview.</span>
      <div className="flex-grow" />
      <Toolbar.Button asChild>
        <button
          className="font-semibold text-fg text-r-base hover:text-fg-600"
          onClick={handleExitPreview}
        >
          Exit preview
        </button>
      </Toolbar.Button>
    </GenericDisplay>
  );
};

export const MemberDisplay: React.FC<MemberDisplayProps> = ({
  setMode,
  ...rest
}) => {
  const handleEditMode = () => {
    setMode(ProjectPageMode.editor);
  };

  return (
    <GenericDisplay {...rest}>
      <span className="text-r-base">You are a member of this project.</span>
      <Toolbar.Separator className="mx-3 h-5 w-[2px] rounded-full bg-fg/30" />
      <span className="text-r-base">Last updated X minutes ago.</span>
      <div className="flex-grow" />
      <Toolbar.Button asChild>
        <button
          className="-my-2 mr-1 rounded-full p-2 hover:bg-bg-300/30"
          onClick={handleEditMode}
        >
          <FiEdit3 className="font-bold text-r-2xl" />
        </button>
      </Toolbar.Button>
      {/* TODO: Make dropdown menu popup */}
      <Toolbar.Button asChild>
        <button className="-my-2 -mr-2 rounded-full p-2 hover:bg-bg-300/30">
          <FiSettings className="font-bold text-r-2xl" />
        </button>
      </Toolbar.Button>
    </GenericDisplay>
  );
};

export const EditorDisplay: React.FC<EditorDisplayProps> = ({
  setMode,
  ...rest
}) => {
  const handleCancel = () => {
    setMode(ProjectPageMode.member);
  };

  const handleSave = () => {
    toast.error("TODO: Need to save changes");
    setMode(ProjectPageMode.member);
  };

  const handlePreview = () => {
    setMode(ProjectPageMode.preview);
  };

  return (
    <GenericDisplay {...rest}>
      <span className="text-r-base">Editing</span>
      <Toolbar.Separator className="mx-3 h-5 w-[2px] rounded-full bg-fg/30" />
      <Toolbar.Button asChild>
        <button
          className="-my-2 mr-1 rounded-full p-2 hover:bg-bg-300/30"
          onClick={handlePreview}
        >
          <FiEye className="font-bold text-r-2xl" />
        </button>
      </Toolbar.Button>
      <div className="flex-grow" />
      <Toolbar.Button asChild>
        <button
          className="mr-5 text-fg/80 text-r-base hover:text-fg-600/80"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </Toolbar.Button>
      <Toolbar.Button asChild>
        <button
          className="font-semibold text-fg text-r-base hover:text-fg-600"
          onClick={handleSave}
        >
          Save changes
        </button>
      </Toolbar.Button>
    </GenericDisplay>
  );
};
