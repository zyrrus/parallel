import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { typo } from "@styles/typography";
import type { VariantProps } from "class-variance-authority";
import { cx, cva } from "class-variance-authority";
import type { LinkProps } from "next/link";
import Link from "next/link";

const button = cva(
  [
    "w-fit rounded-full border-8 border-quaternary min-w-max bg-secondary font-medium text-quaternary shadow-solid transition-all",
    "hover:bg-secondary-600 hover:border-quaternary-600 hover:text-quaternary-600 hover:shadow-solid-lowered",
    "active:bg-secondary-700 active:border-quaternary-700 active:text-quaternary-700 active:shadow-solid-lowest",
    "disabled:bg-fg-400/10 disabled:text-fg-600/30 disabled:border-fg-600/10 disabled:shadow-none",
    "focus-visible:outline focus-visible:outline-fg focus-visible:outline-8 focus-visible:outline-offset-2",
  ],
  {
    variants: {
      size: {
        default: typo({ size: "2xl", className: "px-14 py-3" }),
        small: typo({ size: "lg", className: "px-10 py-2" }),
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
  const {
    children,
    prefixIcon,
    suffixIcon,
    className,
    variant = { size: "default" },
  }: CommonProps = props;
  const linkProps: Partial<LinkProps> = props;
  const buttonProps: ButtonProps = props;

  const buttonContent = (
    <>
      {prefixIcon && prefixIcon}
      {children}
      {suffixIcon && suffixIcon}
    </>
  );

  // Render a Link if href is provided
  if (linkProps.href) {
    const { href, ...rest } = linkProps;
    return (
      <Link href={href} {...rest} className={cx(button(variant), className)}>
        {buttonContent}
      </Link>
    );
  }

  // Otherwise, render a standard button
  return (
    <button {...buttonProps} className={cx(button(variant), className)}>
      {buttonContent}
    </button>
  );
};

export default Button;
