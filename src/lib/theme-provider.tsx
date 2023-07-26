"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { createContext } from "react";

export const ThemeContext = createContext("");

export default function ThemeProviderComponent({ children }: any) {
  const theme = createTheme({
    typography: {
      fontFamily: "Inter,sans-serif",
    },
    palette: {
      primary: {
        main: "#00bdd6",
        light: "#61edff",
        dark: "#006d7c",
      },
      secondary: {
        main: "#8353e2",
        light: "#bda3ef",
        dark: "#4a1ca6",
      },
    },
  });
  return (
    <ThemeContext.Provider value="any">
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
