import React from "react";
import { cva } from "class-variance-authority";
import Button from "@components/Button";
import Text from "@components/Text";

const footer = cva();

const HomeFooter: React.FC = () => {
  return (
    <footer className="container flex flex-row justify-center py-32">
      {/* <nav> */}
      <Text styleLike="h1">Footer goes here!</Text>
      {/* </nav> */}
    </footer>
  );
};

export default HomeFooter;
