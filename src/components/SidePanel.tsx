import Link from "next/link";
import {
  FiMoreVertical,
  FiLogOut,
  FiSettings,
  FiExternalLink,
  FiPlus,
} from "react-icons/fi";
import { Button } from "@components/Button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { getRootContainer } from "@utils/constants/htmlTools";
import { signOut } from "next-auth/react";
import { navItems } from "@utils/constants/sidepanel";
import { NewProposalPopup } from "./NewProposalPopup";

export const SidePanel: React.FC = () => {
  return (
    <div id="side-panel" className="hidden md:block">
      <div className="flex flex-row-reverse">
        <div className="w-1.5 border-x-2 border-x-fg/10" />
        <header className="flex h-screen flex-col justify-between gap-y-8 px-12 py-8">
          <div>
            <h1>
              <Link href="/" className="font-bold text-primary text-r-3xl">
                <span className="text-fg">||</span> Parallel
              </Link>
            </h1>
            <nav className="my-8 flex flex-col gap-y-5">
              {navItems.map(({ label, route, Icon }) => (
                <Link
                  key={label}
                  href={route}
                  className="flex flex-row items-center gap-x-2 font-medium text-r-2xl hover:font-bold hover:text-fg-400"
                >
                  <Icon size={28} /> {label}
                </Link>
              ))}
            </nav>
            <NewProposalPopup>
              <Button
                variant={{ size: "small" }}
                prefixIcon={<FiPlus size={25} />}
              >
                New Proposal
              </Button>
            </NewProposalPopup>
          </div>
          <MoreMenu />
        </header>
      </div>
    </div>
  );
};

const MoreMenu: React.FC = () => {
  const container = getRootContainer();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex flex-row items-center gap-x-2 font-medium text-r-2xl hover:font-bold hover:text-fg-400">
          <FiMoreVertical size={28} /> More
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal container={container}>
        <DropdownMenu.Content
          side="top"
          className="min-w-[250px] rounded-md bg-bg-700 p-3 data-[side=top]:animate-slideUpAndFade"
          sideOffset={10}
        >
          {/* Settings */}
          <DropdownMenu.Item>
            <Link
              href="/settings"
              className="flex w-full select-none items-center justify-between px-[5px] pl-[25px] outline-none"
            >
              <p className="text-r-lg">Settings</p>
              <FiSettings />
            </Link>
          </DropdownMenu.Item>

          {/* Landing page */}
          <DropdownMenu.Item>
            <Link
              href="/"
              className="flex w-full select-none items-center justify-between px-[5px] pl-[25px] outline-none"
            >
              <p className="text-r-lg">Parallel Homepage</p>
              <FiExternalLink />
            </Link>
          </DropdownMenu.Item>

          {/* Sign out */}
          <DropdownMenu.Item>
            <button
              type="button"
              className="flex w-full select-none items-center justify-between px-[5px] pl-[25px] outline-none"
              onClick={() => void signOut()}
            >
              <p className="text-r-lg">Sign Out</p>
              <FiLogOut />
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
