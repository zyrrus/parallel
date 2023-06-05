import { MDXRemote } from "next-mdx-remote";
import type {
  ClassAttributes,
  ComponentPropsWithoutRef,
  HTMLAttributes,
} from "react";
import "highlight.js/styles/base16/gruvbox-dark-medium.css";

type Tag<T> = JSX.IntrinsicAttributes & ClassAttributes<T> & HTMLAttributes<T>;
type HTMLTag = Tag<HTMLElement>;
type HTag = Tag<HTMLHeadingElement>;

export const components = {
  h1: (props: HTag) => <h1 className="font-bold text-r-5xl" {...props} />,
  h2: (props: HTag) => <h2 className="font-bold text-r-4xl" {...props} />,
  h3: (props: HTag) => <h3 className="font-bold text-r-3xl" {...props} />,
  h4: (props: HTag) => <h4 className="font-bold text-r-2xl" {...props} />,
  h5: (props: HTag) => <h5 className="font-bold text-r-xl" {...props} />,
  h6: (props: HTag) => <h1 className="font-bold text-r-lg" {...props} />,
  p: (props: Tag<HTMLParagraphElement>) => (
    <p className="text-r-lg" {...props} />
  ),
  a: (props: Tag<HTMLAnchorElement>) => (
    <a
      className="font-semibold text-tertiary text-r-lg hover:text-tertiary-600"
      {...props}
    />
  ),
  blockquote: (props: Tag<HTMLQuoteElement>) => (
    <blockquote
      className="my-4 rounded border-l-4 border-fg-700 pl-4 italic"
      {...props}
    />
  ),
  br: (props: Tag<HTMLBRElement>) => <br {...props} />,
  code: (props: HTMLTag) => (
    <code className="rounded bg-bg-600 p-1" {...props} />
  ),
  em: (props: HTMLTag) => <em className="italic" {...props} />,
  hr: (props: Tag<HTMLHRElement>) => (
    <hr className="my-4 rounded border-2 border-fg-700" {...props} />
  ),
  img: (props: Tag<HTMLImageElement>) => (
    <img className="my-4 max-w-full rounded" {...props} />
  ),
  li: (props: Tag<HTMLLIElement>) => <li className="ml-4" {...props} />,
  ol: (props: Tag<HTMLOListElement>) => (
    <ol className="my-2 ml-4 list-decimal" {...props} />
  ),
  ul: (props: Tag<HTMLUListElement>) => (
    <ul className="my-2 ml-4 list-disc" {...props} />
  ),
  pre: (props: Tag<HTMLPreElement>) => (
    <pre className="my-4 overflow-auto rounded" {...props} />
  ),
  strong: (props: HTMLTag) => <strong className="font-bold" {...props} />,
};

export const MDX: React.FC<
  Omit<ComponentPropsWithoutRef<typeof MDXRemote>, "components">
> = (props) => {
  return <MDXRemote components={components} {...props} />;
};
