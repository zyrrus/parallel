import * as ScrollArea from "@radix-ui/react-scroll-area";
import type { Children } from "@utils/types/props";

export const WithScroll: React.FC<Children & { height: string }> = ({
  height,
  children,
}) => {
  return (
    <ScrollArea.Root
      type="auto"
      className={`h-${height} w-full overflow-hidden`}
    >
      <ScrollArea.Viewport className="h-full w-full">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="flex touch-none select-none rounded-full bg-bg-600 p-0.5 transition-colors duration-150 ease-out hover:bg-bg-700 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-full bg-fg-700 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] hover:bg-fg" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
