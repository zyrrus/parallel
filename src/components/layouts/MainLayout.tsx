import type { Children } from "@utils/types/props";
import Link from "next/link";
import {
  FiMenu,
  FiHome,
  FiSearch,
  FiClipboard,
  FiEdit,
  FiArchive,
  FiUser,
  FiSettings,
} from "react-icons/fi";
import type { IconType } from "react-icons/lib";
import { Button } from "@components/Button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { cx } from "class-variance-authority";
import { TextInput, MultilineTextInput } from "@components/TextInput";
import { Divider } from "@components/Divider";
import { ImageInput } from "@components/ImageInput";
import { api } from "@utils/api";
import { getRootContainer } from "@constants/htmlTools";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { proposalSchema } from "@constants/schema/project";
import type { z } from "zod";
import type { SubmitHandler } from "react-hook-form";

export const MainLayout: React.FC<Children> = ({ children }) => {
  return (
    <>
      <SidePanel />
      <main className="mx-96">{children}</main>
    </>
  );
};

// === Side Panel =============================================================

interface NavItem {
  label: string;
  route: string;
  Icon: IconType;
}

const navItems: NavItem[] = [
  { label: "Home", route: "/projects", Icon: FiHome },
  { label: "Search", route: "/discover", Icon: FiSearch },
  { label: "Proposals", route: "/discover/proposals", Icon: FiClipboard },
  { label: "Revisions", route: "/discover/revisions", Icon: FiEdit },
  { label: "Archive", route: "/discover/archive", Icon: FiArchive },
  { label: "Profile", route: "/profile", Icon: FiUser },
];

export const SidePanel: React.FC = () => {
  return (
    <div
      id="side-panel"
      className="fixed top-0 left-0 bottom-0 hidden bg-bg-600 md:block"
    >
      <header className="flex h-screen flex-col justify-between gap-y-8 px-12 py-8">
        <div>
          <h1>
            <Link href="/" className="text-r-3xl font-bold text-primary">
              <span className="text-fg">||</span> Parallel
            </Link>
          </h1>
          <nav className="my-8 flex flex-col gap-y-5">
            {navItems.map(({ label, route, Icon }) => (
              <Link
                key={label}
                href={route}
                className="text-r-2xl flex flex-row items-center gap-x-2 font-medium hover:font-bold hover:text-fg-400"
              >
                <Icon size={28} /> {label}
              </Link>
            ))}
          </nav>
          <NewProposalButton />
        </div>
        <MoreMenu />
      </header>
    </div>
  );
};

type ProposalForm = z.infer<typeof proposalSchema>;

const NewProposalButton: React.FC = () => {
  // === Constants ============================================================

  const container = getRootContainer();

  // === Hooks ================================================================

  const { handleSubmit, register, formState, reset } = useForm<ProposalForm>({
    resolver: zodResolver(proposalSchema),
  });

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } =
    api.projects.createProposal.useMutation({
      onSuccess: () => {
        reset();
        void ctx.projects.getAll.invalidate();
      },
      onError: (e) => {
        toast.error(e.message);
      },
    });

  // === Functions ============================================================

  const onSubmit: SubmitHandler<ProposalForm> = (data): void => {
    if (isPosting) return;
    mutate(data);
  };

  // === Components ===========================================================

  const FullDivider = () => (
    <div className="mt-4">
      <Divider />
    </div>
  );

  return (
    <Dialog.Root
      onOpenChange={(isOpen) => {
        if (!isOpen) reset();
      }}
    >
      <Dialog.Trigger asChild>
        <Button variant={{ size: "small" }}>New Proposal</Button>
      </Dialog.Trigger>

      <Dialog.Portal container={container}>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-overlayShow" />

        <Dialog.Content
          className={cx(
            "fixed left-[50%] top-[50%] w-[90vw] max-w-[750px] translate-x-[-50%] translate-y-[-50%]",
            "rounded-3xl bg-bg",
            "focus:outline-none data-[state=open]:animate-contentShow",
            "overflow-clip"
          )}
        >
          <div className="px-10 pt-10">
            <Dialog.Title asChild>
              <h1 className="text-r-xl font-bold text-primary">
                Create new proposal
              </h1>
            </Dialog.Title>
            <Dialog.Description asChild>
              <p className="text-r-lg">
                Let others know a little about your project idea.
              </p>
            </Dialog.Description>
          </div>
          <FullDivider />

          <WithScroll height="70vh">
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 px-10 pb-10"
            >
              <div className="mb-8 flex flex-col gap-y-4">
                <TextInput
                  label="Title"
                  placeholder={proposalSchema.shape.title.description}
                  error={formState.errors.title?.message}
                  {...register("title")}
                />
                <MultilineTextInput
                  hasAdaptiveHeight
                  label="Description"
                  placeholder={proposalSchema.shape.description.description}
                  error={formState.errors.description?.message}
                  {...register("description")}
                />
                {/* <ImageInput label="Image" /> */}
              </div>
              <div className="flex flex-row justify-end">
                <Button
                  variant={{ size: "small" }}
                  type="submit"
                  disabled={isPosting}
                >
                  Create
                </Button>
              </div>
            </form>
          </WithScroll>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const MoreMenu: React.FC = () => {
  const container = getRootContainer();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="text-r-2xl flex flex-row items-center gap-x-2 font-medium hover:font-bold hover:text-fg-400">
          <FiMenu size={28} /> More
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal container={container}>
        <DropdownMenu.Content
          side="top"
          className="min-w-[250px] rounded-md bg-bg-700 p-3 data-[side=top]:animate-slideUpAndFade"
          sideOffset={10}
        >
          <DropdownMenu.Item className="flex select-none items-center justify-between px-[5px] pl-[25px] outline-none">
            <p className="text-r-lg">Settings</p>
            <FiSettings />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export const WithScroll: React.FC<Children & { height: string }> = ({
  height,
  children,
}) => {
  return (
    <ScrollArea.Root
      type="auto"
      className={`h-${height} w-full overflow-hidden`}
    >
      <ScrollArea.Viewport className="h-full w-full">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex touch-none select-none bg-bg-600 p-0.5 transition-colors duration-150 ease-out hover:bg-bg-700 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-full bg-fg-700 before:absolute before:top-1/2 before:left-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] hover:bg-fg" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
