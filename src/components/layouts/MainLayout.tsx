import type { Children } from "@utils/types/props";
import Link from "next/link";

const TempHeader = () => (
  <header>
    <nav className="flex flex-row gap-x-4">
      <Link className="hover:text-tertiary" href="/projects">
        Projects
      </Link>
      <Link className="hover:text-tertiary" href="/discover">
        Discover
      </Link>
      <Link className="hover:text-tertiary" href="/profile">
        Profile
      </Link>
    </nav>
  </header>
);

export const MainLayout: React.FC<Children> = ({ children }) => {
  return (
    <>
      <TempHeader />
      {/* <SidePanel/> */}
      {children}
    </>
  );
};
