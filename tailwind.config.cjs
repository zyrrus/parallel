/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    // screens: {},
    extend: {
      colors: {
        fg: {
          DEFAULT: "#A3A395",
          100: "#ededea",
          200: "#dadad5",
          300: "#c8c8bf",
          400: "#b5b5aa",
          500: "#a3a395",
          600: "#828277",
          700: "#626259",
          800: "#41413c",
          900: "#21211e",
        },
        bg: {
          DEFAULT: "#303030",
          100: "#d6d6d6",
          200: "#acacac",
          300: "#838383",
          400: "#595959",
          500: "#303030",
          600: "#262626",
          700: "#1d1d1d",
          800: "#131313",
          900: "#0a0a0a",
        },
        primary: {
          DEFAULT: "#DEB887",
          100: "#f8f1e7",
          200: "#f2e3cf",
          300: "#ebd4b7",
          400: "#e5c69f",
          500: "#deb887",
          600: "#b2936c",
          700: "#856e51",
          800: "#594a36",
          900: "#2c251b",
        },
        secondary: {
          DEFAULT: "#AF7E7F",
          100: "#efe5e5",
          200: "#dfcbcc",
          300: "#cfb2b2",
          400: "#B98D8D",
          500: "#af7e7f",
          600: "#8F6869",
          700: "#694c4c",
          800: "#463233",
          900: "#231919",
        },
        tertiary: {
          DEFAULT: "#B35443",
          100: "#f0ddd9",
          200: "#e1bbb4",
          300: "#d1988e",
          400: "#c27669",
          500: "#b35443",
          600: "#8f4336",
          700: "#6b3228",
          800: "#48221b",
          900: "#24110d",
        },
        quaternary: {
          DEFAULT: "#483E41",
          100: "#90898B",
          200: "#787072",
          300: "#655D5F",
          400: "#52484B",
          500: "#483e41",
          600: "#42393C",
          700: "#3a3234",
          800: "#2b2527",
          900: "#1d191a",
        },
        success: "#ACD161",
        error: "#E24536",
        warning: "#EDC25E",
      },
      fontFamily: {
        sans: ["var(--font-murecho)"],
      },
      backgroundImage: {
        radial:
          "radial-gradient(circle farthest-side at center, #deb887 0%, #00000000 100%)",
      },
      boxShadow: {
        "solid-raised": "14px 28px 0px rgba(0, 0, 0, 0.2)",
        solid: "12px 24px 0px rgba(0, 0, 0, 0.2)",
        "solid-lowered": "10px 20px 0px rgba(0, 0, 0, 0.2)",
        "solid-medium": "8px 16px 0px rgba(0, 0, 0, 0.2)",
        "solid-medium-lowered": "6px 12px 0px rgba(0, 0, 0, 0.2)",
        "solid-lowest": "2px 4px 0px rgba(0, 0, 0, 0.2)",
      },
      dropShadow: {
        blur: "0 0 5px #303030",
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: "translateY(-2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: "translateY(2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
