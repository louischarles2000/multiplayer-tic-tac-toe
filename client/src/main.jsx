import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider from './Contexts/AuthContext.jsx'
import GameContextProvider from './Contexts/GameContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
