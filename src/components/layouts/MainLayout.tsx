import type { Children } from "@utils/types/props";
import { typo } from "@styles/typography";
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
import { cx } from "class-variance-authority";
import { TextInput } from "@components/TextInput";
import { Divider } from "@components/Divider";
import { ImageInput } from "@components/ImageInput";

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
            <Link
              href="/"
              className={typo({ tag: "h3", className: "text-primary" })}
            >
              <span className="text-fg">||</span> Parallel
            </Link>
          </h1>
          <nav className="my-8 flex flex-col gap-y-5">
            {navItems.map(({ label, route, Icon }) => (
              <Link
                key={label}
                href={route}
                className={typo({
                  size: "2xl",
                  className:
                    "flex flex-row items-center gap-x-2 font-medium hover:font-bold hover:text-fg-400",
                })}
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

const NewProposalButton: React.FC = () => {
  const container =
    typeof window !== "undefined" ? document.getElementById("root") : null;

  const FullDivider = () => (
    <div className="my-4 -mx-10">
      <Divider />
    </div>
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant={{ size: "small" }}>New Proposal</Button>
      </Dialog.Trigger>

      <Dialog.Portal container={container}>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-overlayShow" />

        <Dialog.Content
          className={cx(
            "fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[750px] translate-x-[-50%] translate-y-[-50%]",
            "rounded-3xl bg-bg p-10",
            "focus:outline-none data-[state=open]:animate-contentShow"
          )}
        >
          <Dialog.Title>
            <h1 className={typo({ tag: "h5", className: "text-primary" })}>
              Create new proposal
            </h1>
          </Dialog.Title>
          <Dialog.Description>
            Let others know a little about your project idea.
          </Dialog.Description>
          <FullDivider />
          <div className="mb-8 flex flex-col gap-y-4">
            <TextInput label="Title" />
            <TextInput
              label="Description"
              placeholder="Describe your project"
            />
            <ImageInput label="Image" />
          </div>
          <Dialog.Close asChild>
            <div className="flex flex-row justify-end">
              <Button variant={{ size: "small" }}>Create</Button>
            </div>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const MoreMenu: React.FC = () => {
  const container =
    typeof window !== "undefined" ? document.getElementById("root") : null;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={typo({
            size: "2xl",
            className:
              "flex flex-row items-center gap-x-2 font-medium hover:font-bold hover:text-fg-400",
          })}
        >
          <FiMenu size={28} /> More
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal container={container}>
        <DropdownMenu.Content
          side="top"
          className="min-w-[250px] rounded-md bg-bg-700 p-3 data-[side=top]:animate-slideUpAndFade"
          sideOffset={10}
        >
          <DropdownMenu.Item className="flex select-none items-center justify-between px-[5px] pl-[25px] text-lg outline-none">
            <p className={typo({ tag: "p" })}>Settings</p>
            <FiSettings />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
