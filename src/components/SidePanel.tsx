import { typo } from "@styles/typography";
import Link from "next/link";
import { useState } from "react";
import {
  FiMenu,
  FiHome,
  FiSearch,
  FiClipboard,
  FiEdit,
  FiArchive,
  FiUser,
} from "react-icons/fi";
import type { IconType } from "react-icons/lib";

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
      className="fixed top-0 left-0 hidden h-full w-64 bg-bg-600 md:block"
    >
      <header className="mx-12 my-8 flex flex-col">
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
      </header>
    </div>
  );
};
