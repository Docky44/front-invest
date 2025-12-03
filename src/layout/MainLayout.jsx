import React, { useState } from 'react'
import { Box } from '@mui/material'
import TrendingUp from '@mui/icons-material/TrendingUp'
import Newspaper from '@mui/icons-material/Newspaper'
import Psychology from '@mui/icons-material/Psychology'
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet'
import Logout from '@mui/icons-material/Logout'
import { useAuth0 } from '@auth0/auth0-react'
import { InvestmentsPage } from '../pages/InvestmentsPage'
import { NewsPage } from '../pages/NewsPage'
import { AIPage } from '../pages/AIPage'

export function MainLayout() {
  const [activeTab, setActiveTab] = useState('investments')
  const { logout, user } = useAuth0()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">

      <header className="bg-black/30 backdrop-blur-md border-b border-purple-500/30">
        <div className="w-full px-6 py-4">

          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 w-full">

            <div className="flex items-center space-x-2 justify-start">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <h1
                onClick={() => setActiveTab('investments')}
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 
                           bg-clip-text text-transparent cursor-pointer whitespace-nowrap"
              >
                Investissements
              </h1>
            </div>

            <div className="pl-6">
              <nav className="flex items-center justify-center space-x-4">

                <button
                  onClick={() => setActiveTab('news')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === 'news'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-purple-600/20'
                  }`}
                >
                  <Newspaper className="w-5 h-5" />
                  <span>Actu</span>
                </button>

                <button
                  onClick={() => setActiveTab('investments')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === 'investments'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-purple-600/20'
                  }`}
                >
                  <AccountBalanceWallet className="w-5 h-5" />
                  <span>Investissements</span>
                </button>

                <button
                  onClick={() => setActiveTab('ia')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === 'ia'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-purple-600/20'
                  }`}
                >
                  <Psychology className="w-5 h-5" />
                  <span>IA</span>
                </button>

              </nav>
            </div>

            <div className="flex items-center space-x-3 justify-end">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium">
                  {user?.name || user?.nickname || 'Utilisateur'}
                </span>
                <span className="text-xs text-gray-400 truncate max-w-[180px]">
                  {user?.email}
                </span>
              </div>

              <button
                className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/40 transition-all border border-red-500/30"
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  })
                }
              >
                <Logout className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Box>
          {activeTab === 'investments' && <InvestmentsPage />}
          {activeTab === 'news' && <NewsPage />}
          {activeTab === 'ia' && <AIPage />}
        </Box>
      </main>

    </div>
  )
}
