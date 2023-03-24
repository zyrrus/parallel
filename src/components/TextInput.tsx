import { typo } from "@styles/typography";
import { cva } from "class-variance-authority";
import { useState } from "react";
import type { ZodString } from "zod";

const input = cva([
  typo({ tag: "p" }),
  "w-full rounded border-[6px] py-2 px-3 md:py-3 md:px-4 leading-tight border-fg placeholder-fg/50 bg-fg/20",
  "focus:outline-none",
]);

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  validator?: ZodString;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
}

export const TextInput: React.FC<Props> = ({
  label,
  placeholder,
  prefixIcon,
  suffixIcon,
  validator,
  onChange,
  value: valueProp,
  ...rest
}) => {
  const [value, setValue] = useState<string | undefined>(valueProp);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (onChange) {
      onChange(event);
    }
  };

  //   let validationError: string | null = null;

  //   if (validator) {
  //     const result = validator.safeParse(value);
  //     if (result.success) {
  //       result.data;
  //     } else {
  //       validationError = result.error.message;
  //     }
  //   }

  return (
    <div className="w-full">
      {label && (
        <label
          className={typo({ size: "base", className: "mb-1 block text-fg" })}
        >
          {label}
        </label>
      )}
      <div
        className={input({
          className: "flex flex-row items-center gap-x-2 px-2",
        })}
      >
        {prefixIcon && prefixIcon}
        <input
          type="text"
          placeholder={placeholder}
          value={value ?? ""}
          onChange={handleChange}
          className="w-full appearance-none border-none bg-transparent leading-tight text-fg placeholder-fg/50 focus:outline-none"
          {...rest}
        />
        {suffixIcon && suffixIcon}
      </div>
      {/* {validationError && (
        <span className="validation-error">{validationError}</span>
      )} */}
    </div>
  );
};
