import React from "react";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { TopBar } from "./components/TopBar";
import { ProtectedApolloProvider } from "./auth/ProtectedApolloProvider";
import { Dashboard } from "./pages/Dashboard";

const theme = createTheme();

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <TopBar />
        <ProtectedApolloProvider>
          <Dashboard />
        </ProtectedApolloProvider>
      </Box>
    </ThemeProvider>
  );
}
