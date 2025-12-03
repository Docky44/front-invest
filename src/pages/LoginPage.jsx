import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { CircularProgress, Typography } from '@mui/material'

export function LoginPage() {
  const { loginWithRedirect, isLoading } = useAuth0()

  const handleLogin = () => {
    loginWithRedirect({
      appState: {
        returnTo: '/',
      },
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center px-4 text-white">
      <div className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              <span className="text-xl font-bold">€</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Investissements
            </h1>
          </div>
        </div>

        <Typography variant="h6" className="text-center mb-2 text-purple-100">
          Connexion
        </Typography>
        <Typography variant="body2" className="text-center mb-6 text-gray-300">
          Connecte-toi pour accéder à ton espace d&apos;investissement.
        </Typography>

        <button
          disabled={isLoading}
          onClick={handleLogin}
          className={`w-full flex items-center justify-center rounded-xl py-3 text-sm font-medium transition-all ${
            isLoading
              ? 'bg-purple-500/40 text-gray-300 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/30'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <CircularProgress size={18} sx={{ color: '#e5e7eb' }} />
              <span>Redirection en cours...</span>
            </div>
          ) : (
            <span>Se connecter avec Auth0</span>
          )}
        </button>

        <div className="mt-6 text-xs text-gray-400 text-center">
          <p>Tu seras redirigé vers une page sécurisée Auth0 pour t&apos;authentifier.</p>
        </div>
      </div>
    </div>
  )
}
