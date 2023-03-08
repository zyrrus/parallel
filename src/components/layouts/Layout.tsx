import { Murecho } from "@next/font/google";
import { useRouter } from "next/router";
import AuthLayout from "@components/layouts/AuthLayout";
import HomeLayout from "@components/layouts/HomeLayout";
import InfoLayout from "@components/layouts/InfoLayout";
import { useEffect, useState } from "react";

const murecho = Murecho({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-murecho",
});

type LayoutWrapper = "none" | "home" | "auth" | "info";
const layoutWrappers: Record<
  LayoutWrapper,
  React.FC<{ children: React.ReactNode }>
> = {
  none: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  home: HomeLayout,
  info: InfoLayout,
  auth: AuthLayout,
};

interface Props {
  children: React.ReactNode;
  layout?: LayoutWrapper;
}

const Layout: React.FC<Props> = ({ layout = "none", children }) => {
  const ContextualLayout = layoutWrappers[layout];

  return (
    <main className={`${murecho.variable} font-sans`}>
      <ContextualLayout>{children}</ContextualLayout>
    </main>
  );
};

export default Layout;
