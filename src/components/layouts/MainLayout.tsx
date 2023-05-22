import { SidePanel } from "@components/SidePanel";
import type { Children } from "@utils/types/props";

export const MainLayout: React.FC<Children> = ({ children }) => {
  return (
    <div className="min-w-screen flex h-screen flex-row">
      <SidePanel />
      <main className="w-full overflow-y-scroll">{children}</main>
    </div>
  );
};
