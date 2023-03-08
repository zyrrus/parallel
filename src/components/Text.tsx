import React from "react";
import { cva } from "class-variance-authority";
import type { Tag, Weight } from "@utils/types/tw";
import Link from "next/link";

export const text = cva("", {
  variants: {
    size: {
      p: "text-sm md:text-base 2xl:text-lg",
      h1: "text-3xl md:text-4xl 2xl:text-5xl",
      h2: "text-2xl md:text-3xl 2xl:text-4xl",
      h3: "text-xl md:text-2xl 2xl:text-3xl",
      h4: "text-lg md:text-xl 2xl:text-2xl",
      h5: "text-base md:text-lg 2xl:text-xl",
      h6: "text-sm md:text-base 2xl:text-lg",
    },
    weight: {
      p: "font-normal",
      h1: "font-bold",
      h2: "font-bold",
      h3: "font-bold",
      h4: "font-bold",
      h5: "font-semibold",
      h6: "font-semibold",
      thin: "font-thin",
      extralight: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
      black: "font-black",
    },
  },
});

interface Props {
  children: React.ReactNode;
  tag?: Tag | "span" | "a";
  styleLike?: Tag;
  href?: string;
  // Override default tag styling
  size?: Tag;
  weight?: Weight;
  className?: string;
}

const Text: React.FC<Props> = ({
  children,
  tag = "p",
  styleLike,
  href = "#",
  size,
  weight,
  className = "",
}) => {
  // Links
  if (tag === "a") {
    return (
      <Link
        href={href}
        className={text({
          className: className,
          size: size ?? styleLike ?? "p",
          weight: weight ?? styleLike ?? "p",
        })}
      >
        {children}
      </Link>
    );
  }

  // Other tags
  const styleTag: Tag = tag === "span" ? "p" : tag;
  return React.createElement(
    tag,
    {
      className: text({
        className: className,
        size: size ?? styleLike ?? styleTag,
        weight: weight ?? styleLike ?? styleTag,
      }),
    },
    children
  );
};

export default Text;
