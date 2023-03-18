import { cva, cx } from "class-variance-authority";

const responsiveText = {
  base: "text-sm md:text-base 2xl:text-lg",
  lg: "text-sm md:text-base 2xl:text-lg",
  xl: "text-base md:text-lg 2xl:text-xl",
  "2xl": "text-lg md:text-xl 2xl:text-2xl",
  "3xl": "text-xl md:text-2xl 2xl:text-3xl",
  "4xl": "text-2xl md:text-3xl 2xl:text-4xl",
  "5xl": "text-3xl md:text-4xl 2xl:text-5xl",
};

export const typo = cva("", {
  variants: {
    tag: {
      p: cx("font-normal", responsiveText["lg"]),
      h1: cx("font-bold", responsiveText["5xl"]),
      h2: cx("font-bold", responsiveText["4xl"]),
      h3: cx("font-bold", responsiveText["3xl"]),
      h4: cx("font-bold", responsiveText["2xl"]),
      h5: cx("font-semibold", responsiveText["xl"]),
      h6: cx("font-semibold", responsiveText["lg"]),
    },
    size: responsiveText,
  },
});
