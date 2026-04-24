import { createTheme } from "@mui/material/styles";

const sharedTheme = {
  shape: {
    borderRadius: 18,
  },
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.04em",
    },
    h2: {
      fontWeight: 800,
      letterSpacing: "-0.03em",
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 600,
    },
    body2: {
      lineHeight: 1.5,
    },
  },
};

export const lightTheme = createTheme({
  ...sharedTheme,
  palette: {
    mode: "light",

    primary: {
      main: "#3b82f6",
    },

    secondary: {
      main: "#8b5cf6",
    },

    background: {
      default: "#f1f5f9",
      paper: "#ffffff",

      app: "radial-gradient(circle at top, rgba(59,130,246,0.18), transparent 40%), linear-gradient(180deg, #f1f5f9 0%, #ffffff 100%)",

      card: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",

      soft: "rgba(59,130,246,0.08)",
    },

    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },

    divider: "rgba(15, 23, 42, 0.06)",

    action: {
      hover: "rgba(59,130,246,0.08)",
      selected: "rgba(59,130,246,0.12)",
    },
  },

  shadows: [
    "none",
    "0 2px 6px rgba(15,23,42,0.04)",
    "0 6px 16px rgba(15,23,42,0.06)",
    "0 10px 25px rgba(15,23,42,0.08)",
    "0 16px 40px rgba(15,23,42,0.10)",
    ...Array(20).fill("0 18px 45px rgba(15,23,42,0.12)"),
  ],
});

export const darkTheme = createTheme({
  ...sharedTheme,
  palette: {
    mode: "dark",

    primary: {
      main: "#60a5fa",
    },

    secondary: {
      main: "#a78bfa",
    },

    background: {
      default: "#0b1220",
      paper: "#0f172a",

      app: "radial-gradient(circle at top, rgba(59,130,246,0.12), transparent 35%), linear-gradient(180deg, #0b1220 0%, #111827 100%)",

      card: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",

      soft: "rgba(255,255,255,0.05)",
    },

    text: {
      primary: "#f8fafc",
      secondary: "#94a3b8",
    },

    divider: "rgba(255,255,255,0.08)",

    action: {
      hover: "rgba(255,255,255,0.05)",
      selected: "rgba(255,255,255,0.08)",
    },
  },
});