/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    // screens: {},
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
        400: "#bf9899",
        500: "#af7e7f",
        600: "#8c6566",
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
        100: "#dad8d9",
        200: "#b6b2b3",
        300: "#918b8d",
        400: "#6d6567",
        500: "#483e41",
        600: "#3a3234",
        700: "#2b2527",
        800: "#1d191a",
        900: "#0e0c0d",
      },
      success: "#ACD161",
      error: "#E24536",
      warning: "#EDC25E",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-murecho)"],
      },
      backgroundImage: {
        radial:
          "radial-gradient(circle farthest-side at center, #deb887 0%, #00000000 100%)",
        //   grid: `url('./public/grid.svg')`,
      },
    },
  },
  plugins: [],
};