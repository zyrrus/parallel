import type { Children } from "@utils/types/props";
import { cx } from "class-variance-authority";

interface Props {
  className?: string;
  containerClassName?: string;
  barsClassName?: string;
}

export const Divider: React.FC<Children & Props> = ({
  children,
  className,
  containerClassName,
  barsClassName,
}) => {
  if (children === undefined)
    return (
      <div
        className={cx(
          "h-1.5 border-y-2 border-y-fg/10",
          className,
          containerClassName,
          barsClassName
        )}
      />
    );

  return (
    <div
      className={cx(
        "flex w-full flex-row items-center gap-x-2",
        className,
        containerClassName
      )}
    >
      <div
        className={cx(
          "h-1.5 flex-grow border-y-2 border-y-fg/10",
          className,
          barsClassName
        )}
      />
      {children}
      <div
        className={cx(
          "h-1.5 flex-grow border-y-2 border-y-fg/10",
          className,
          barsClassName
        )}
      />
    </div>
  );
};
