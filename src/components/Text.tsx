import React from "react";
import { cx } from "class-variance-authority";
import type {
  Tag,
  ColorEnding,
  Size,
  Weight,
  Hundred,
  TwSize,
  TwWeight,
  TwColor,
} from "@utils/types/tw";
import { weights } from "@utils/types/tw";

/*
    THIS NEEDS TO BE ABLE TO HANDLE TYPOGRAPHY SIZE AT SMALL BREAKPOINTS
    (IT CAN'T CURRENTLY)
 */

interface Props {
  children: React.ReactNode;
  tag?: Tag;
  color?: ColorEnding;
  // Override default tag styling
  size?: Size;
  weight?: Weight | Hundred;
  className?: string;
  overrideStyles?: boolean;
}

const Text: React.FC<Props> = ({
  children,
  tag = "p",
  color,
  size,
  weight,
  className,
  overrideStyles = false,
}) => {
  const styleMap: Record<Tag, { size: TwSize; weight: TwWeight }> = {
    p: { size: "text-base", weight: "font-normal" },
    h1: { size: "text-5xl", weight: "font-bold" },
    h2: { size: "text-4xl", weight: "font-bold" },
    h3: { size: "text-3xl", weight: "font-bold" },
    h4: { size: "text-2xl", weight: "font-bold" },
    h5: { size: "text-base", weight: "font-semibold" },
    h6: { size: "text-base", weight: "font-semibold" },
  };

  const twDefaultColor: TwColor = "text-fg";
  const twDefaultSize: TwSize = styleMap[tag].size;
  const twDefaultWeight: TwWeight = styleMap[tag].weight;

  const twParamColor: TwColor | undefined =
    color === undefined ? undefined : `text-${color}`;
  const twParamSize: TwSize | undefined =
    size === undefined ? undefined : `text-${size}`;
  const twParamWeight: TwWeight | undefined =
    weight === undefined
      ? undefined
      : `font-${
          (typeof weight === "number" ? weights[weight / 100] : weight) ??
          "normal"
        }`;

  return React.createElement(
    tag,
    {
      className: overrideStyles
        ? className
        : cx(
            className,
            twParamColor ?? twDefaultColor,
            twParamSize ?? twDefaultSize,
            twParamWeight ?? twDefaultWeight
          ),
    },
    children
  );
};

export default Text;
