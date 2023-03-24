import type { Children } from "@utils/types/props";
import * as Tabs from "@radix-ui/react-tabs";
import Link from "next/link";
import { Divider } from "@components/Divider";
import type { IconType } from "react-icons/lib";
import { FiArchive, FiClipboard, FiEdit, FiStar } from "react-icons/fi";

interface TabItemProps {
  label: string;
  route: string;
  Icon?: IconType;
}

const tabItems: TabItemProps[] = [
  { label: "Favorites", route: "/discover", Icon: FiStar },
  { label: "Proposals", route: "/discover/proposals", Icon: FiClipboard },
  { label: "Revisions", route: "/discover/revisions", Icon: FiEdit },
  { label: "Archive", route: "/discover/archive", Icon: FiArchive },
];

export const TabList: React.FC<Children> = ({ children }) => {
  return (
    <Tabs.Root>
      <Divider className="mt-4 -mb-[5px]" />
      <Tabs.List
        className="mx-auto flex justify-center gap-x-8"
        aria-label="Discover projects"
      >
        {tabItems.map((item) => (
          <TabItem key={item.label} {...item} />
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};

export const TabItem: React.FC<TabItemProps> = ({ label, route, Icon }) => {
  return (
    <Tabs.Trigger
      // Useful pseudo-selectors: hover, data-[state=active/inactive], first, last
      className="border-t-4 border-transparent px-2 text-lg font-medium text-fg/70 hover:border-fg/10 hover:text-fg-300 data-[state=active]:border-fg/50 data-[state=active]:text-fg-400"
      value={label}
    >
      <Link
        href={route}
        className="mt-2 flex select-none flex-row items-center gap-2"
      >
        {Icon && <Icon size={18} />}
        {label}
      </Link>
    </Tabs.Trigger>
  );
};
