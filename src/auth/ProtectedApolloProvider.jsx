import React from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from '@apollo/client'
import { Box, CircularProgress } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import { useApolloClientWithAuth } from '../apollo/client'

export function ProtectedApolloProvider({ children }) {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0()
  const client = useApolloClientWithAuth()

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect()
    }
  }, [isLoading, isAuthenticated, loginWithRedirect])

  if (isLoading || !isAuthenticated) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    )
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

ProtectedApolloProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
