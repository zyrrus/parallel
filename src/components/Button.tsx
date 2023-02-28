import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

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
        default: "text-2xl px-14 py-4",
        small: "text-lg px-10 py-3",
      },
    },
  }
);

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: VariantProps<typeof button>;
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  variant = { size: "default" },
}) => {
  return (
    <button className={button(variant)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
