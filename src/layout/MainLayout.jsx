import React, { useState } from 'react'
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Typography,
} from '@mui/material'
import { useQuery } from '@apollo/client'
import { get } from 'lodash'
import TrendingUp from '@mui/icons-material/TrendingUp'
import Newspaper from '@mui/icons-material/Newspaper'
import Psychology from '@mui/icons-material/Psychology'
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet'
import Logout from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import GroupIcon from '@mui/icons-material/Group'
import { useAuth0 } from '@auth0/auth0-react'
import { InvestmentsPage } from '../pages/InvestmentsPage'
import { NewsPage } from '../pages/NewsPage'
import { AIPage } from '../pages/AIPage'
import { UsersPage } from '../pages/UsersPage'
import { ME_QUERY } from '../graphql/me'

export function MainLayout() {
  const [activeTab, setActiveTab] = useState('investments')
  const [menuAnchor, setMenuAnchor] = useState(null)
  const { logout, user } = useAuth0()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const useBurgerNav = useMediaQuery(theme.breakpoints.down('lg'))

  const { data: meData, loading: meLoading, error: meError } = useQuery(ME_QUERY)
  const me = get(meData, 'me', null)
  const role = get(me, 'role', null)
  const isAdmin = role === 'ADMIN'

  const openMenu = (e) => {
    setMenuAnchor(e.currentTarget)
  }

  const closeMenu = () => {
    setMenuAnchor(null)
  }

  const navigate = (tab) => {
    setActiveTab(tab)
    closeMenu()
  }

  const logoutUser = () => {
    closeMenu()
    logout({
      logoutParams: { returnTo: window.location.origin },
    })
  }

  if (meLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex items-center justify-center">
        <Typography>Chargement...</Typography>
      </div>
    )
  }

if (meError || !me) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex items-center justify-center px-4">
      <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 max-w-md w-full text-center">
        <Typography variant="h5" className="text-purple-300 mb-3">
          Erreur lors du chargement du profil
        </Typography>
        <Typography variant="body2" className="text-gray-300">
          {meError?.message || 'Aucune donnée'}
        </Typography>
      </div>
    </div>
  )
}


  if (!me.isActive) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex items-center justify-center px-4">
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30 max-w-md w-full text-center">
          <Typography variant="h5" className="text-purple-300 mb-3">
            Compte en attente d&apos;activation
          </Typography>
          <Typography variant="body1" className="text-gray-300">
            Ton compte a été créé mais n&apos;est pas encore activé. Un administrateur doit valider ton accès avant que tu puisses utiliser l&apos;application.
          </Typography>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <header className="bg-black/30 backdrop-blur-md border-b border-purple-500/30">
        <div className={isSmallScreen ? 'w-full px-4 py-3' : 'w-full px-6 py-4'}>
          {useBurgerNav ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-8 h-8 text-purple-400" />
                <h1
                  onClick={() => setActiveTab('investments')}
                  className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer"
                >
                  Investissements
                </h1>
              </div>

              <IconButton onClick={openMenu} size="large" sx={{ color: 'white' }}>
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={closeMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={() => navigate('news')}>
                  <Newspaper className="w-5 h-5 mr-2" />
                  Actu
                </MenuItem>
                <MenuItem onClick={() => navigate('investments')}>
                  <AccountBalanceWallet className="w-5 h-5 mr-2" />
                  Investissements
                </MenuItem>
                <MenuItem onClick={() => navigate('ia')}>
                  <Psychology className="w-5 h-5 mr-2" />
                  IA
                </MenuItem>
                {isAdmin && (
                  <MenuItem onClick={() => navigate('users')}>
                    <GroupIcon className="w-5 h-5 mr-2" />
                    Utilisateurs
                  </MenuItem>
                )}
                <MenuItem onClick={logoutUser}>
                  <Logout className="w-5 h-5 mr-2 text-red-600" />
                  <span className="text-red-600">Déconnexion</span>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 w-full">
              <div className="flex items-center space-x-2 justify-start">
                <TrendingUp className="w-7 h-7 text-purple-400" />
                <h1
                  onClick={() => setActiveTab('investments')}
                  className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer whitespace-nowrap"
                >
                  Investissements
                </h1>
              </div>

              <nav className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => setActiveTab('news')}
                  className={`flex items-center space-x-2 rounded-lg transition-all text-sm ${
                    activeTab === 'news'
                      ? 'bg-purple-600 text-white px-4 py-2'
                      : 'text-gray-300 hover:text-white hover:bg-purple-600/20 px-3 py-1.5'
                  }`}
                >
                  <Newspaper className="w-5 h-5" />
                  <span>Actu</span>
                </button>

                <button
                  onClick={() => setActiveTab('investments')}
                  className={`flex items-center space-x-2 rounded-lg transition-all text-sm ${
                    activeTab === 'investments'
                      ? 'bg-purple-600 text-white px-4 py-2'
                      : 'text-gray-300 hover:text-white hover:bg-purple-600/20 px-3 py-1.5'
                  }`}
                >
                  <AccountBalanceWallet className="w-5 h-5" />
                  <span>Investissements</span>
                </button>

                <button
                  onClick={() => setActiveTab('ia')}
                  className={`flex items-center space-x-2 rounded-lg transition-all text-sm ${
                    activeTab === 'ia'
                      ? 'bg-purple-600 text-white px-4 py-2'
                      : 'text-gray-300 hover:text-white hover:bg-purple-600/20 px-3 py-1.5'
                  }`}
                >
                  <Psychology className="w-5 h-5" />
                  <span>IA</span>
                </button>

                {isAdmin && (
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`flex items-center space-x-2 rounded-lg transition-all text-sm ${
                      activeTab === 'users'
                        ? 'bg-purple-600 text-white px-4 py-2'
                        : 'text-gray-300 hover:text-white hover:bg-purple-600/20 px-3 py-1.5'
                    }`}
                  >
                    <GroupIcon className="w-5 h-5" />
                    <span>Utilisateurs</span>
                  </button>
                )}
              </nav>

              <div className="flex items-center space-x-2 justify-end">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium">
                    {user?.name || user?.nickname || 'Utilisateur'}
                  </span>
                  <span className="text-xs text-gray-400 truncate max-w-[160px]">
                    {user?.email}
                  </span>
                </div>

                <button
                  className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/40 transition-all border border-red-500/30"
                  onClick={logoutUser}
                >
                  <Logout className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main
        className={
          isSmallScreen
            ? 'max-w-full mx-auto px-4 py-4'
            : 'max-w-6xl mx-auto px-6 py-8'
        }
      >
        <Box>
          {activeTab === 'investments' && <InvestmentsPage />}
          {activeTab === 'news' && <NewsPage />}
          {activeTab === 'ia' && <AIPage />}
          {activeTab === 'users' && isAdmin && <UsersPage />}
        </Box>
      </main>
    </div>
  )
}
