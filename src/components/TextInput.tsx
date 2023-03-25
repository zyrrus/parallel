import { cva } from "class-variance-authority";
import React from "react";

const input = cva([
  "text-r-lg w-full rounded border-[6px] py-2 px-3 md:py-3 md:px-4 leading-tight border-fg placeholder-fg/50 bg-fg/20",
  "focus:outline-none",
]);

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  error?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

export const TextInput = React.forwardRef<HTMLInputElement, Props>(
  ({ label, placeholder, error, prefixIcon, suffixIcon, ...rest }, ref) => {
    return (
      <fieldset className="w-full">
        {label && (
          <label className="text-r-lg mb-1 block text-fg">{label}</label>
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
            className="w-full appearance-none border-none bg-transparent leading-tight text-fg placeholder-fg/50 focus:outline-none"
            ref={ref}
            {...rest}
          />
          {suffixIcon && suffixIcon}
        </div>
        {error && (
          <p className="text-r-xl overflow-clip overflow-ellipsis whitespace-nowrap text-error">
            {error}
          </p>
        )}
      </fieldset>
    );
  }
);

TextInput.displayName = "TextInput";
