import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'

export function TopBar() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Suivi Investissements
        </Typography>
        {isAuthenticated && (
          <Box mr={2}>
            <Typography variant="body2">{user?.name || user?.nickname || user?.email}</Typography>
          </Box>
        )}
        {!isAuthenticated ? (
          <Button color="inherit" onClick={() => loginWithRedirect()}>
            Connexion
          </Button>
        ) : (
          <Button
            color="inherit"
            onClick={() =>
              logout({
                logoutParams: { returnTo: window.location.origin },
              })
            }
          >
            Déconnexion
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
