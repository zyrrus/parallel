import { typo } from "@styles/typography";
import type { VariantProps } from "class-variance-authority";
import { cx, cva } from "class-variance-authority";

const button = cva(
  [
    "w-fit rounded-full border-8 border-quaternary bg-secondary font-medium text-quaternary shadow-solid transition-all",
    "hover:bg-secondary-600 hover:border-quaternary-600 hover:text-quaternary-600 hover:shadow-solid-lowered",
    "active:bg-secondary-700 active:border-quaternary-700 active:text-quaternary-700 active:shadow-solid-lowest",
    "disabled:bg-fg-400/10 disabled:text-fg-600/30 disabled:border-fg-600/10 disabled:shadow-none",
    "focus-visible:outline focus-visible:outline-fg focus-visible:outline-8 focus-visible:outline-offset-2",
  ],
  {
    variants: {
      size: {
        default: cx(typo({ size: "2xl" }), "px-14 py-3"),
        small: cx(typo({ size: "lg" }), "px-10 py-2"),
      },
    },
  }
);

interface Props {
  variant?: VariantProps<typeof button>;
}

export const Button: React.FC<
  Props &
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
> = ({
  variant = { size: "default" },
  children,
  className,
  ...buttonProps
}) => {
  return (
    <button className={cx(button(variant), className)} {...buttonProps}>
      {children}
    </button>
  );
};

export const Anchor: React.FC<
  Props &
    React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
> = ({
  variant = { size: "default" },
  children,
  className,
  ...anchorProps
}) => {
  return (
    <a {...anchorProps} className={cx(button(variant), className)}>
      {children}
    </a>
    // <div className={cx(button(variant), className)}>
    //   <a
    //     className={text({ size: variant.size === "default" ? "h4" : "h6" })}
    //     {...anchorProps}
    //   >
    //     {children}
    //   </a>
    // </div>
  );
};
