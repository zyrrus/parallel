import { cva } from "class-variance-authority";
import React, { useEffect, useImperativeHandle, useRef } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

interface MultilineInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  error?: string;
  hasAdaptiveHeight?: boolean;
}

// === Text Input =============================================================

const input = cva([
  "text-r-lg w-full rounded border-[6px] py-2 px-3 md:py-3 md:px-4 leading-tight border-fg placeholder-fg/50 bg-fg/20",
  "focus:outline-none",
]);

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      placeholder,
      required = false,
      optional = false,
      error,
      prefixIcon,
      suffixIcon,
      ...rest
    },
    ref
  ) => {
    return (
      <fieldset className="w-full">
        {label && (
          <Label label={label} required={required} optional={optional} />
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
            className="w-full appearance-none border-none bg-transparent text-fg placeholder-fg/50 outline-none"
            ref={ref}
            {...rest}
          />
          {suffixIcon && suffixIcon}
        </div>
        {error && <Error error={error} />}
      </fieldset>
    );
  }
);

TextInput.displayName = "TextInput";

// === Multiline Text Input ===================================================

export const MultilineTextInput = React.forwardRef<
  HTMLTextAreaElement,
  MultilineInputProps
>(
  (
    {
      label,
      placeholder,
      required = false,
      optional = false,
      error,
      hasAdaptiveHeight = false,
      ...rest
    },
    ref
  ) => {
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
        {label && (
          <Label label={label} required={required} optional={optional} />
        )}
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
        {error && <Error error={error} />}
      </fieldset>
    );
  }
);

MultilineTextInput.displayName = "MultilineTextInput";

// === Pieces =================================================================

const Label: React.FC<{
  label: string;
  required?: boolean;
  optional?: boolean;
}> = ({ label, required = false, optional = false }) => {
  return (
    <label className="mb-1 block text-fg text-r-lg">
      {label}
      {required && (
        <span className="italic text-tertiary text-r-base"> · Required</span>
      )}
      {optional && (
        <span className="italic text-fg/50 text-r-base"> · Optional</span>
      )}
    </label>
  );
};

const Error: React.FC<{ error: string }> = ({ error }) => {
  return (
    <p className="overflow-clip overflow-ellipsis whitespace-nowrap text-error text-r-base">
      {error}
    </p>
  );
};
