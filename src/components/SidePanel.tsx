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
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      id="side-panel"
      className="fixed top-0 left-0 hidden h-full bg-bg-600 shadow md:block"
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
  //   return (
  //     <>
  //       <div className="fixed top-0 left-0 hidden h-full w-16 bg-gray-900 text-gray-50 shadow md:block">
  //         <nav className="flex h-full flex-col justify-between">
  //           <div className="mt-6 flex flex-col items-center">
  //             <Link href="/" className="mb-8">
  //               <FiHome size={28} />
  //             </Link>
  //             <Link href="/search" className="mb-8">
  //               <FiSearch size={28} />
  //             </Link>
  //             <Link href="/proposals" className="mb-8">
  //               <FiList size={28} />
  //             </Link>
  //             <Link href="/revisions" className="mb-8">
  //               <FiEdit size={28} />
  //             </Link>
  //             <Link href="/archive" className="mb-8">
  //               <FiArchive size={28} />
  //             </Link>
  //           </div>
  //           <div className="mb-6 flex flex-col items-center">
  //             <Link href="/profile">
  //               <FiUser size={28} />
  //             </Link>
  //           </div>
  //         </nav>
  //       </div>
  //       <div className="fixed top-0 right-0 m-4 md:hidden">
  //         <button
  //           className="text-gray-900 focus:outline-none"
  //           onClick={toggleMenu}
  //         >
  //           <FiMenu size={28} />
  //         </button>
  //       </div>
  //       <div
  //         className={`${
  //           isOpen ? "flex" : "hidden"
  //         } fixed top-0 left-0 h-full w-full bg-gray-900 text-gray-50 shadow md:hidden`}
  //       >
  //         <nav className="flex h-full flex-col items-center justify-center">
  //           <Link href="/" className="my-6">
  //             <FiHome size={28} />
  //             <span className="ml-4">Home</span>
  //           </Link>
  //           <Link href="/search" className="my-6">
  //             <FiSearch size={28} />
  //             <span className="ml-4">Search</span>
  //           </Link>
  //           <Link href="/proposals" className="my-6">
  //             <FiList size={28} />
  //             <span className="ml-4">Proposals</span>
  //           </Link>
  //           <Link href="/revisions" className="my-6">
  //             <FiEdit size={28} />
  //             <span className="ml-4">Revisions</span>
  //           </Link>
  //           <Link href="/archive" className="my-6">
  //             <FiArchive size={28} />
  //             <span className="ml-4">Archive</span>
  //           </Link>
  //           <Link href="/profile" className="my-6">
  //             <FiUser size={28} />
  //             <span className="ml-4">Profile</span>
  //           </Link>
  //         </nav>
  //       </div>
  //     </>
  //   );
};
