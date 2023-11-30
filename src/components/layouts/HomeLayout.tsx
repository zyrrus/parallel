import type { Children } from "@utils/types/props";
import { useState, useEffect } from "react";
import { cva, cx } from "class-variance-authority";
import { Button } from "@components/Button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const HomeLayout: React.FC<Children> = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
};

// === Header =================================================================

const header = cva(
  ["fixed top-0 z-50 w-full transition-all duration-300 ease-in-out"],
  {
    variants: {
      size: {
        default: "py-4 md:py-6 2xl:py-8",
        large: "py-8 md:py-12 2xl:py-16",
      },
    },
  }
);

const Header: React.FC = () => {
  const [isLargeBar, setIsLargeBar] = useState(true);

  // Scroll Listener
  useEffect(() => {
    const listenScrollEvent: () => void = () => {
      const threshold = 25;
      setIsLargeBar(
        document.body.scrollTop < threshold &&
          document.documentElement.scrollTop < threshold
      );
    };

    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  });

  return (
    <header
      className={header({
        size: isLargeBar ? "large" : "default",
      })}
    >
      <Background />
      <nav className="container flex flex-row items-center justify-between gap-x-4">
        <a href="#" className="min-w-max font-bold text-primary text-r-2xl">
          <span className="text-fg">||</span> Parallel
        </a>
        {/*<div className="flex flex-row items-center gap-x-4 sm:gap-x-8">
          <a href="#" className="font-medium text-r-lg">
            About
          </a>
           <FlexDivider />
          <a href="#" className="font-medium text-r-lg">
            Premium
          </a> 
        </div>*/}
        <CTAButton />
      </nav>
    </header>
  );
};

const FlexDivider: React.FC = () => (
  <span className="text-fg/25 text-r-2xl">||</span>
);

const Background: React.FC = () => (
  <div
    className={cx(
      "absolute inset-0 -z-10",
      "bg-gradient-to-b from-bg via-bg/60 to-transparent",
      "backdrop-blur [mask:linear-gradient(black_75%,transparent)]"
    )}
  />
);

const CTAButton: React.FC = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    const username = session.data.user.username ?? "";

    return (
      <Button
        variant={{ size: "small" }}
        onClick={() => {
          void signIn(undefined, {
            callbackUrl: `/profile/${username}`,
            redirect: false,
          });
        }}
      >
        {username}
      </Button>
    );
  }

  return (
    <Button
      variant={{ size: "small" }}
      onClick={() => {
        void router.push(`/projects`);
      }}
    >
      Sign In
    </Button>
  );
};

// === Footer =================================================================

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-xl px-6 pt-4">
      <div className="grid items-center gap-y-8 md:grid-cols-2 ">
        <a
          href="#"
          className="-ml-[0.8em] min-w-max font-bold text-primary text-r-4xl"
        >
          <span className="text-fg">||</span> Parallel
        </a>

        <div className="hidden md:block" />

        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://zyrrus.dev"
            className="hover:opacity- block"
          >
            Created by Zyrrus
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/zyrrus/parallel"
            className="hover:opacity- block"
          >
            Check it out on GitHub
          </a>
        </div>
        <Button
          onClick={() =>
            void signIn(undefined, {
              callbackUrl: "/projects",
              redirect: false,
            })
          }
          variant={{ size: "small" }}
          className="md:ml-auto"
        >
          Sign Up Now
        </Button>
      </div>

      <p className="col-span-2 mb-8 mt-28 text-center text-r-base">
        Copyright © {year} Parallel
      </p>
    </footer>
  );
};
