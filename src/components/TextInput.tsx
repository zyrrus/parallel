import { typo } from "@styles/typography";
import { cva, cx } from "class-variance-authority";
import type { ZodString } from "zod";

const input = cva([
  typo({ tag: "p" }),
  "appearance-none",
  "w-full rounded border-[6px] py-2 px-3 md:py-3 md:px-4 leading-tight border-fg placeholder-fg/50 bg-fg/20",
  "focus:outline-none",
]);

interface Props {
  label: string;
  validator?: ZodString;
}

export const TextInput: React.FC<
  Props &
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
> = ({ label, name, type = "text", ...inputProps }) => {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className={cx(typo({ size: "base" }), "mb-1 block text-fg")}
      >
        {label}
      </label>
      <input name={name} type={type} className={input()} {...inputProps} />
    </div>
  );
};
