import { MainLayout } from "@components/layouts";
import { TextInput } from "@components/TextInput";
import { typo } from "@styles/typography";
import type { Children } from "@utils/types/props";
import Link from "next/link";

export const DiscoverLayout: React.FC<Children> = ({ children }) => {
  return (
    <MainLayout>
      <header>
        <nav className="mb-4 flex flex-row gap-x-4">
          <Link className="hover:text-tertiary" href="/discover/proposals">
            Proposals
          </Link>
          <Link className="hover:text-tertiary" href="/discover/revisions">
            Revisions
          </Link>
          <Link className="hover:text-tertiary" href="/discover/archive">
            Archive
          </Link>
        </nav>
      </header>
      <h1 className={typo({ tag: "h1" })}>Discover</h1>
      <TextInput label="Search" />
      {children}
    </MainLayout>
  );
};
