import { Murecho } from "@next/font/google";
import { useRouter } from "next/router";
import { cva } from "class-variance-authority";
import Header from "@components/Header";

const murecho = Murecho({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-murecho",
});

const layout = cva([`${murecho.variable} font-sans`], {
  variants: {
    // page: {
    //   home: "",
    //   app: "",
    // },
  },
});

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  const isOnHomePage = router.pathname === "/";

  return (
    <main className={layout()}>
      <Header />
      {children}
    </main>
  );
};

export default Layout;
