import { useState, useEffect } from "react";
import Button from "@components/Button";

const Header: React.FC = () => {
  const [isLargeBar, setIsLargeBar] = useState(true);

  // Scroll Listener
  useEffect(() => {
    const listenScrollEvent = () => {
      const threshold = 10;
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
      className={`sticky top-0 z-50 w-full backdrop-blur-lg backdrop-filter transition-all duration-300 ease-in-out ${
        isLargeBar ? "py-8" : "py-4 shadow"
      }`}
    >
      <nav className="container flex flex-row justify-between gap-x-4">
        <a href="#intro" className="flex flex-row gap-x-3">
          <h3 className="hidden sm:block">Parallel</h3>
        </a>
        <div className="flex flex-row items-center gap-x-8 sm:gap-x-16">
          <a href="#about">About</a>
          <a href="#faq">FAQ</a>
          <a href="#roadmap">Roadmap</a>
        </div>
        <Button variant={{ size: "small" }}>Sign Up</Button>
      </nav>
    </header>
  );
};

export default Header;
