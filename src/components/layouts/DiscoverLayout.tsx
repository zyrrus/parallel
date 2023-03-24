import { MainLayout } from "@components/layouts";
import { TabList } from "@components/TabList";
import { TextInput } from "@components/TextInput";
import { typo } from "@styles/typography";
import type { Children } from "@utils/types/props";
import { FiSearch, FiX } from "react-icons/fi";

export const DiscoverLayout: React.FC<Children> = ({ children }) => {
  return (
    <MainLayout>
      <h1 className={typo({ tag: "h1", className: "text-primary" })}>
        Discover
      </h1>
      <div className="my-8">
        <TextInput
          placeholder="Search"
          prefixIcon={<FiSearch size={24} strokeWidth={3} />}
          suffixIcon={<FiX size={24} strokeWidth={3} />}
        />
      </div>
      <TabList />
      {children}
    </MainLayout>
  );
};
