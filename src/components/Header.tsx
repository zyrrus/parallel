import { useState, useEffect } from "react";
import Button from "@components/Button";
import { cva } from "class-variance-authority";

const header = cva(
  ["fixed top-0 z-50 w-full transition-all duration-300 ease-in-out"],
  {
    variants: {
      bg: {
        blur: "backdrop-blur-lg backdrop-filter",
        gradient: "bg-gradient-to-b from-bg via-bg/60 to-transparent",
        blurgrad:
          "bg-gradient-to-b from-bg via-bg/60 to-transparent backdrop-blur [mask:linear-gradient(black_60%,transparent)]",
      },
      size: {
        default: "py-8",
        large: "py-16",
      },
    },
    compoundVariants: [
      {
        bg: "blur",
        size: "default",
        class: "shadow",
      },
    ],
  }
);

interface Props {
  isOnHomePage: boolean;
}

const Header: React.FC<Props> = ({ isOnHomePage }) => {
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

  return (
    <header
      className={header({
        // bg: "blurgrad", // This is a cool effect, but it has a few visual bugs currently
        bg: isOnHomePage ? "gradient" : "blur",
        size: isLargeBar ? "large" : "default",
      })}
    >
      <nav className="container flex flex-row items-center justify-between gap-x-4">
        <a href="#" className="text-2xl font-bold text-primary">
          <span className="text-fg">||</span> Parallel
        </a>
        <div className="flex flex-row items-center gap-x-4 sm:gap-x-8">
          <a href="#" className="font-medium">
            About
          </a>
          <span className="text-2xl font-bold text-fg/25">||</span>
          <a href="#" className="font-medium">
            FAQ
          </a>
          <span className="text-2xl font-bold text-fg/25">||</span>
          <a href="#" className="font-medium">
            Roadmap
          </a>
        </div>
        <Button variant={{ size: "small" }}>Sign Up</Button>
      </nav>
    </header>
  );
};

export default Header;
