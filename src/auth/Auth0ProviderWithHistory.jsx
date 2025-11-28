import React from 'react'
import PropTypes from 'prop-types'
import { Auth0Provider } from '@auth0/auth0-react'

export function Auth0ProviderWithHistory({ children }) {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE
  const redirectUri = window.location.origin

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
        scope: 'openid profile email',
      }}
      cacheLocation="localstorage"
      useRefreshTokens
    >
      {children}
    </Auth0Provider>
  )
}


Auth0ProviderWithHistory.propTypes = {
  children: PropTypes.node.isRequired,
}
