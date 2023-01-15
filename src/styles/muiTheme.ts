import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#303030",
            paper: "#424242",
        },
        text: {
            primary: "#ffffff",
            secondary: "rgba(255,255,255,0.7)",
            disabled: "rgba(255,255,255,0.5)",
        },
        primary: {
            main: "#deb887",
            light: "rgb(228, 198, 159)",
            dark: "rgb(155, 128, 94)",
            contrastText: "rgb(0, 0, 0, 0.87)",
        },
        secondary: {
            main: "#bbafd6",
            light: "rgb(200, 191, 222)",
            dark: "rgb(130, 122, 149)",
            contrastText: "rgb(0, 0, 0, 0.87)",
        },
        error: {
            main: "#f44336",
            light: "#e57373",
            dark: "#d32f2f",
            contrastText: "#fff",
        },
        warning: {
            main: "#ff9800",
            light: "#ffb74d",
            dark: "#f57c00",
            contrastText: "rgb(0, 0, 0, 0.87)",
        },
        info: {
            main: "#2196f3",
            light: "#64b5f6",
            dark: "#1976d2",
            contrastText: "#fff",
        },
        success: {
            main: "#4caf50",
            light: "#81c784",
            dark: "#388e3c",
            contrastText: "rgb(0, 0, 0, 0.87)",
        },
        divider: "rgba(255,255,255,0.12)",
    },
    typography: {
        fontFamily: "Murecho",
    },
});
