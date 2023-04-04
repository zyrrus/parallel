import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { cx, cva } from "class-variance-authority";
import type { LinkProps } from "next/link";
import Link from "next/link";

const button = cva(
  [
    "w-fit rounded-full border-8 min-w-max font-medium shadow-solid transition-all",
    "hover:shadow-solid-lowered",
    "active:shadow-solid-lowest",
    "disabled:bg-fg-400/10 disabled:text-fg-600/50 disabled:border-fg-600/10 disabled:shadow-none",
    "focus-visible:outline focus-visible:outline-fg focus-visible:outline-8 focus-visible:outline-offset-2",
  ],
  {
    variants: {
      size: {
        default: "text-r-2xl px-14 py-3",
        small: "text-r-lg px-10 py-2",
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
  }
);

interface CommonProps {
  children: ReactNode;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  className?: string;
  variant?: VariantProps<typeof button>;
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
      {prefixIcon && prefixIcon}
      {children}
      {suffixIcon && suffixIcon}
    </>
  );

  const defaultVariant = { size: "default", role: "primary" };
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
