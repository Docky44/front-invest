import React from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { ProtectedApolloProvider } from "./auth/ProtectedApolloProvider";
import { MainLayout } from "./layout/MainLayout";

const theme = createTheme();

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProtectedApolloProvider>
        <MainLayout />
      </ProtectedApolloProvider>
    </ThemeProvider>
  );
}
