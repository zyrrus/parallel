import { MainLayout } from "@components/layouts";
import { SearchBar } from "@components/SearchBar";
import { TabList } from "@components/TabList";
import type { Children } from "@utils/types/props";

export const DiscoverLayout: React.FC<Children> = ({ children }) => {
  return (
    <MainLayout>
      <h1 className="text-r-5xl font-bold text-primary">Discover</h1>
      <div className="my-8 max-w-3xl">
        <SearchBar />
      </div>
      <TabList />
      {children}
    </MainLayout>
  );
};
