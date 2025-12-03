import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from "@mui/material";
import { MainLayout } from "./layout/MainLayout";
import { LoginPage } from "./pages/LoginPage";

export function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex items-center justify-center">
        <Typography>Chargement...</Typography>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <MainLayout />;
}
