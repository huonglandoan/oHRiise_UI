import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/mantine.css'
import { MantineProvider } from '@mantine/core'
import { theme } from './theme/theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>,
)
