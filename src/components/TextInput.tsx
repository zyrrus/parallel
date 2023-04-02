import type { TextInputProps, MultilineInputProps } from "@utils/types/props";
import { cva } from "class-variance-authority";
import React, { useEffect, useImperativeHandle, useRef } from "react";

// === Text Input =============================================================

const input = cva([
  "text-r-lg w-full rounded border-[6px] py-2 px-3 md:py-3 md:px-4 leading-tight border-fg placeholder-fg/50 bg-fg/20",
  "focus:outline-none",
]);

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
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
            className="w-full appearance-none border-none bg-transparent leading-tight text-fg placeholder-fg/50 outline-none"
            ref={ref}
            {...rest}
          />
          {suffixIcon && suffixIcon}
        </div>
        {error && (
          <p className="text-r-md overflow-clip overflow-ellipsis whitespace-nowrap text-error">
            {error}
          </p>
        )}
      </fieldset>
    );
  }
);

TextInput.displayName = "TextInput";

// === Multiline Text Input ===================================================

export const MultilineTextInput = React.forwardRef<
  HTMLTextAreaElement,
  MultilineInputProps
>(({ label, placeholder, error, hasAdaptiveHeight = false, ...rest }, ref) => {
  const innerRef = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement);

  // Handle adaptive height
  useEffect(() => {
    const r = innerRef.current;

    function updateHeight() {
      if (!r) return;
      const scrollHeight = r.scrollHeight;
      r.style.height = `${scrollHeight}px`;
    }

    if (hasAdaptiveHeight) {
      r?.addEventListener("input", updateHeight);
    }

    return () => {
      r?.removeEventListener("input", updateHeight);
    };
  }, [innerRef.current?.scrollHeight, hasAdaptiveHeight]);

  return (
    <fieldset className="w-full">
      {label && <label className="text-r-lg mb-1 block text-fg">{label}</label>}
      <div
        className={input({
          className: "flex flex-row items-center gap-x-2 px-2",
        })}
      >
        <textarea
          placeholder={placeholder}
          className="max-h-64 min-h-[150px] w-full appearance-none overflow-y-hidden border-none bg-transparent leading-tight text-fg placeholder-fg/50 outline-none transition-all"
          ref={innerRef}
          {...rest}
        />
      </div>
      {error && (
        <p className="text-r-md overflow-clip overflow-ellipsis whitespace-nowrap text-error">
          {error}
        </p>
      )}
    </fieldset>
  );
});

MultilineTextInput.displayName = "MultilineTextInput";
