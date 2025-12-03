import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  Box,
  Typography,
  CircularProgress,
  Switch,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'
import { get, defaultTo, map } from 'lodash'
import {
  USERS_QUERY,
  UPDATE_USER_STATUS_MUTATION,
  UPDATE_USER_ROLE_MUTATION,
} from '../graphql/users'

export function UsersPage() {
  const { data, loading, error } = useQuery(USERS_QUERY)
  const [updateUserStatus, { loading: statusUpdating }] = useMutation(
    UPDATE_USER_STATUS_MUTATION
  )
  const [updateUserRole, { loading: roleUpdating }] = useMutation(
    UPDATE_USER_ROLE_MUTATION
  )

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
        <CircularProgress sx={{ color: '#c084fc' }} />
      </Box>
    )
  }

  if (error || !data) {
    const message = defaultTo(error?.message, 'Aucune donnée')
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
        <Typography className="text-red-400">{message}</Typography>
      </Box>
    )
  }

  const users = defaultTo(get(data, 'users', []), [])

  const handleToggleActive = (user) => {
    const nextIsActive = !user.isActive

    updateUserStatus({
      variables: {
        id: user.id,
        isActive: nextIsActive,
      },
      optimisticResponse: {
        updateUserStatus: {
          __typename: 'User',
          id: user.id,
          isActive: nextIsActive,
        },
      },
    })
  }

  const handleChangeRole = (user, newRole) => {
    updateUserRole({
      variables: {
        id: user.id,
        role: newRole,
      },
      optimisticResponse: {
        updateUserRole: {
          __typename: 'User',
          id: user.id,
          role: newRole,
        },
      },
    })
  }

  const globalUpdating = statusUpdating || roleUpdating

  return (
    <div className="space-y-6">
      <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h5" className="text-purple-300">
            Utilisateurs
          </Typography>
          {globalUpdating && (
            <Typography variant="body2" className="text-purple-300">
              Mise à jour...
            </Typography>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {map(users, (user) => (
            <div
              key={user.id}
              className="bg-black/30 border border-purple-500/20 rounded-xl p-4 hover:border-purple-400/40 transition-all"
            >
              <p className="text-sm text-gray-400 mb-1">ID</p>
              <p className="text-white font-medium truncate">{user.id}</p>

              <p className="text-sm text-gray-400 mt-3 mb-1">Nom d'utilisateur</p>
              <p className="text-purple-300 font-semibold">{user.username}</p>

              <p className="text-sm text-gray-400 mt-3 mb-1">Rôle</p>
              <FormControl
                size="small"
                fullWidth
                sx={{
                  mt: 0.5,
                  '& .MuiOutlinedInput-root': {
                    color: '#e5e7eb',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(168, 85, 247, 0.5)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(216, 180, 254, 0.9)',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#e5e7eb',
                  },
                }}
              >
                <Select
                  value={user.role}
                  onChange={(e) => handleChangeRole(user, e.target.value)}
                >
                  <MenuItem value="USER">USER</MenuItem>
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                </Select>
              </FormControl>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Status</p>
                  <p className={user.isActive ? 'text-green-400' : 'text-red-400'}>
                    {user.isActive ? 'Actif' : 'Inactif'}
                  </p>
                </div>
                <Switch
                  checked={user.isActive}
                  onChange={() => handleToggleActive(user)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#22c55e',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#22c55e',
                    },
                  }}
                />
              </div>

              <p className="text-sm text-gray-400 mt-4 mb-1">Créé le</p>
              <p className="text-white">{user.createdAt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
