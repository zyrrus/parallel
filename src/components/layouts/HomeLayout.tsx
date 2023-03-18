import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import type { Children } from "@utils/types/props";

export const HomeLayout: React.FC<Children> = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};
