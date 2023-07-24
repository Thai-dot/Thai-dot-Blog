"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { createContext } from "react";

export const ThemeContext = createContext("");

export default function ThemeProviderComponent({ children }: any) {
  const theme = createTheme({
    typography: {
      fontFamily: "Inter,sans-serif",
    },
  });
  return (
    <ThemeContext.Provider value="any">
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
