import Text from "@components/Text";
import { cva } from "class-variance-authority";
import type { ZodString } from "zod";

const input = cva([
  "appearance-none",
  "w-full rounded border-[6px] py-2 px-3 md:py-3 md:px-4 leading-tight text-fg border-fg placeholder-fg/50 bg-fg/20",
  "focus:outline-none",
]);

interface Props {
  label: string;
  validator: ZodString;
}

const TextInput: React.FC<
  Props &
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
> = ({ label, validator, name, type = "text", ...inputProps }) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="mb-1 block text-fg">
        <Text weight="bold">{label}</Text>
      </label>
      <Text size="h4">
        <input name={name} type={type} className={input()} {...inputProps} />
      </Text>
    </div>
  );
};

export default TextInput;
