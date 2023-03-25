import type { Children } from "@utils/types/props";
import { useState, useEffect } from "react";
import { cva, cx } from "class-variance-authority";
import { Button } from "@components/Button";
import { signIn } from "next-auth/react";

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
    const listenScrollEvent = () => {
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

  const FlexDivider = () => <span className="text-r-2xl text-fg/25">||</span>;

  const Background = () => (
    <div
      className={cx(
        "absolute inset-0 -z-10",
        "bg-gradient-to-b from-bg via-bg/60 to-transparent",
        "backdrop-blur [mask:linear-gradient(black_75%,transparent)]"
      )}
    />
  );

  return (
    <header
      className={header({
        size: isLargeBar ? "large" : "default",
      })}
    >
      <Background />
      <nav className="container flex flex-row items-center justify-between gap-x-4">
        <a href="#" className="text-r-2xl min-w-max font-bold text-primary">
          <span className="text-fg">||</span> Parallel
        </a>
        <div className="flex flex-row items-center gap-x-4 sm:gap-x-8">
          <a href="#" className="text-r-lg font-medium">
            About Us
          </a>
          <FlexDivider />
          <a href="#" className="text-r-lg font-medium">
            Premium
          </a>
        </div>
        <Button variant={{ size: "small" }} onClick={() => void signIn()}>
          Sign In
        </Button>
      </nav>
    </header>
  );
};

// === Footer =================================================================

const Footer: React.FC = () => {
  return (
    <footer className="container flex flex-row justify-center py-32">
      {/* <nav> */}
      <h2 className="text-r-4xl font-bold">Footer goes here!</h2>
      {/* </nav> */}
    </footer>
  );
};
