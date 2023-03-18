import { typo } from "@styles/typography";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="container flex flex-row justify-center py-32">
      {/* <nav> */}
      <h2 className={typo({ tag: "h2" })}>Footer goes here!</h2>
      {/* </nav> */}
    </footer>
  );
};
