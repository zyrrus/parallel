import { SidePanel } from "@components/SidePanel";
import type { Children } from "@utils/types/props";

export const MainLayout: React.FC<Children> = ({ children }) => {
  return (
    <>
      <SidePanel />
      <main className="mx-96">{children}</main>
    </>
  );
};
