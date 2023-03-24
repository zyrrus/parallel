import { Murecho } from "@next/font/google";
import type { Children } from "@utils/types/props";

const murecho = Murecho({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-murecho",
});

export const RootLayout: React.FC<Children> = ({ children }) => {
  return (
    <div id="root" className={`${murecho.variable} font-sans`}>
      {children}
    </div>
  );
};
