import React from 'react'
import { useQuery } from '@apollo/client/react/hooks'
import { Box, Typography, Paper } from '@mui/material'
import { get, defaultTo } from 'lodash'
import { ME_QUERY } from '../graphql/me'

export function Dashboard() {
  const { data, loading, error } = useQuery(ME_QUERY)

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Chargement...</Typography>
      </Box>
    )
  }

  if (error || !data) {
    const message = defaultTo(error?.message, 'Aucune donnée')
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Erreur: {message}</Typography>
      </Box>
    )
  }

  const me = get(data, 'me', null)
  const email = defaultTo(me?.email, 'Non renseigné')
  const lastLogin = defaultTo(me?.lastLoginAt, 'N/A')

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper sx={{ p: 4, maxWidth: 480, width: '100%' }}>
        <Typography variant="h5" mb={2}>
          Connexion réussie
        </Typography>
        <Typography variant="body1">ID: {me.id}</Typography>
        <Typography variant="body1">Auth0 Sub: {me.auth0Sub}</Typography>
        <Typography variant="body1">Username: {me.username}</Typography>
        <Typography variant="body1">Email: {email}</Typography>
        <Typography variant="body1">Role: {me.role}</Typography>
        <Typography variant="body2" mt={2}>
          Dernière connexion: {lastLogin}
        </Typography>
      </Paper>
    </Box>
  )
}
