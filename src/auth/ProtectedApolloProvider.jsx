import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from '@apollo/client'
import { Box, CircularProgress } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import { useApolloClientWithAuth } from '../apollo/client'

export function ProtectedApolloProvider({ children }) {
  const { isLoading } = useAuth0()
  const client = useApolloClientWithAuth()

  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    )
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

ProtectedApolloProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
