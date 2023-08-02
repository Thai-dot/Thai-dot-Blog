"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface LayoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 0,
      refetchOnWindowFocus: false,
    },
  },
});

const Providers: FC<LayoutProps> = ({ children }) => {
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
