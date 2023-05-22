import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { cx, cva } from "class-variance-authority";
import type { LinkProps } from "next/link";
import Link from "next/link";

const button = cva(
  [
    "w-fit rounded-full border-8 min-w-max flex gap-x-1 flex-row items-center font-medium shadow-solid transition-all",
    "hover:shadow-solid-lowered",
    "active:shadow-solid-lowest",
    "disabled:bg-fg-400/10 disabled:text-fg-600/50 disabled:border-fg-600/10 disabled:shadow-none",
    "focus-visible:outline focus-visible:outline-fg focus-visible:outline-8 focus-visible:outline-offset-2",
  ],
  {
    variants: {
      icon: {
        none: "",
        prefix: "",
        suffix: "",
        both: "",
      },
      size: {
        default: "text-r-2xl py-3",
        small: "text-r-lg py-2",
      },
      role: {
        primary: [
          "border-quaternary bg-secondary text-quaternary",
          "hover:bg-secondary-600 hover:border-quaternary-600 hover:text-quaternary-600",
          "active:bg-secondary-700 active:border-quaternary-700 active:text-quaternary-700",
        ],
        secondary: [
          "border-fg-600/50 bg-bg-400/30 text-fg",
          "hover:bg-bg-400/20 hover:border-fg-600/30 hover:text-fg-600",
          "active:bg-bg active:border-fg-600/20 active:text-fg-600/75",
        ],
      },
    },
    compoundVariants: [
      {
        icon: "none",
        size: "default",
        className: "px-14",
      },
      {
        icon: "prefix",
        size: "default",
        className: "pr-14 pl-12",
      },
      {
        icon: "suffix",
        size: "default",
        className: "pl-14 pr-12",
      },
      {
        icon: "both",
        size: "default",
        className: "px-12",
      },
      {
        icon: "none",
        size: "small",
        className: "px-10",
      },
      {
        icon: "prefix",
        size: "small",
        className: "pr-10 pl-7",
      },
      {
        icon: "suffix",
        size: "small",
        className: "pl-10 pr-7",
      },
      {
        icon: "both",
        size: "small",
        className: "px-7",
      },
    ],
  }
);

type ButtonVariantProps = VariantProps<typeof button>;

interface CommonProps {
  children: ReactNode;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  className?: string;
  variant?: Omit<ButtonVariantProps, "icon">;
}

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type Props = CommonProps & ButtonProps & Partial<LinkProps>;

export const Button: React.FC<Props> = (props) => {
  // Destructure props by subtype
  const { children, prefixIcon, suffixIcon, className, variant }: CommonProps =
    props;
  const linkProps: Partial<LinkProps> = props;
  const buttonProps: ButtonProps = props;

  const buttonContent = (
    <>
      {prefixIcon}
      {children}
      {suffixIcon}
    </>
  );

  const defaultVariant: ButtonVariantProps = {
    size: "default",
    role: "primary",
    icon: (() => {
      if (prefixIcon && suffixIcon) return "both";
      if (prefixIcon) return "prefix";
      if (suffixIcon) return "suffix";
      return "none";
    })(),
  };
  const updatedVariant = Object.assign(defaultVariant, variant);

  // Render a Link if href is provided
  if (linkProps.href) {
    const { href, ...rest } = linkProps;
    return (
      <Link
        href={href}
        {...rest}
        className={cx(button(updatedVariant), className)}
      >
        {buttonContent}
      </Link>
    );
  }

  // Otherwise, render a standard button
  return (
    <button {...buttonProps} className={cx(button(updatedVariant), className)}>
      {buttonContent}
    </button>
  );
};

export default Button;
