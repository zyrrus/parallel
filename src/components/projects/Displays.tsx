import type { User, Project, ProjectPreview } from "@prisma/client";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { PropsWithChildren } from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import Image from "next/image";
import { MDX } from "@components/MDX";
import { FiEdit3, FiSettings, FiEye } from "react-icons/fi";
import { ProjectPageMode } from "@utils/types/projects";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { MultilineTextInput, TextInput } from "@components/TextInput";
import { api } from "@utils/api";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { proposalSchema } from "@utils/constants/schema/project";
import type { z } from "zod";

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
  toolbar: React.ReactNode | undefined;
  description: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  descriptionAsString: string;
}

type CanSetMode = {
  setMode: React.Dispatch<React.SetStateAction<ProjectPageMode>>;
};

type GenericDisplayProps = DisplayProps & PropsWithChildren;
type VisitorDisplayProps = Omit<DisplayProps, "toolbar"> & CanSetMode;
type MemberDisplayProps = Omit<DisplayProps, "toolbar"> & CanSetMode;
type EditorDisplayProps = Omit<DisplayProps, "toolbar"> & CanSetMode;
type PreviewDisplayProps = Omit<DisplayProps, "toolbar"> & CanSetMode;

const GenericDisplay: React.FC<GenericDisplayProps> = ({
  project,
  description,
  toolbar,
  children,
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
        {toolbar}
      </Toolbar.Root>
      <article className="mx-5 my-3">
        {children ? (
          children
        ) : (
          <>
            <h1 className="font-bold text-primary text-r-5xl">
              {project?.title}
            </h1>
            <MDX {...description} />
          </>
        )}
      </article>
    </div>
  );
};

export const VisitorDisplay: React.FC<VisitorDisplayProps> = (props) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleJoinRequest = () => {
    toast.error("TODO: Implement 'request to join'");
  };

  return (
    <GenericDisplay
      {...props}
      toolbar={
        <>
          <span className="text-r-base">
            You are not a member of this project.
          </span>
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
        </>
      }
    />
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
    <GenericDisplay
      {...rest}
      toolbar={
        <>
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
        </>
      }
    />
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
    <GenericDisplay
      {...rest}
      toolbar={
        <>
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
        </>
      }
    />
  );
};

type EditProjectForm = z.infer<typeof proposalSchema>;

export const EditorDisplay: React.FC<EditorDisplayProps> = ({
  setMode,
  ...rest
}) => {
  const { project, descriptionAsString } = rest;

  const ctx = api.useContext();

  const { handleSubmit, register, formState, reset } = useForm<EditProjectForm>(
    {
      resolver: zodResolver(proposalSchema),
      defaultValues: {
        title: project?.title,
        description: descriptionAsString,
      },
    }
  );

  const { mutate, isLoading: isUpdating } =
    api.projects.editProject.useMutation({
      onSuccess: async () => {
        toast.success("Successfully updated the project");

        await ctx.projects.getProjectById.invalidate();
        reset();
      },
      onError: (e) => {
        toast.error(e.message);
      },
    });

  const handleCancel = () => {
    reset();
    setMode(ProjectPageMode.member);
  };

  const handleSave: SubmitHandler<EditProjectForm> = (data): void => {
    if (!project || isUpdating) {
      return;
    }
    mutate({ projectId: project.id, ...data });
    setMode(ProjectPageMode.member);
  };

  const handlePreview = () => {
    toast("This feature is coming soon.", {
      icon: "🚧",
    });
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="flex-1" onSubmit={handleSubmit(handleSave)}>
      <GenericDisplay
        {...rest}
        toolbar={
          <>
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
                type="submit"
                className="font-semibold text-fg text-r-base hover:text-fg-600"
              >
                Save changes
              </button>
            </Toolbar.Button>
          </>
        }
      >
        <div className="mb-8 flex flex-col gap-y-4">
          <TextInput
            label="Title"
            placeholder={proposalSchema.shape.title.description}
            error={formState.errors.title?.message}
            {...register("title")}
          />
          <MultilineTextInput
            label="Description"
            placeholder={proposalSchema.shape.description.description}
            // className=""
            error={formState.errors.description?.message}
            {...register("description")}
          />
        </div>
      </GenericDisplay>
    </form>
  );
};
