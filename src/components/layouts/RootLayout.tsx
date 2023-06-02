import { Murecho, DM_Mono } from "@next/font/google";
import type { Children } from "@utils/types/props";

const murecho = Murecho({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-murecho",
});

const cutive_mono = DM_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-cutive-mono",
});

export const RootLayout: React.FC<Children> = ({ children }) => {
  return (
    <div
      id="root"
      className={`${murecho.variable} ${cutive_mono.variable} font-sans`}
    >
      {children}
    </div>
  );
};
