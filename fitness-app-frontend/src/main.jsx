
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App'
import { AuthProvider } from 'react-oauth2-code-pkce'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './theme'

const authConfig = {
  clientId: "oauth2-pkce-client",
  authorizationEndpoint: "http://localhost:8181/realms/fitness-oauth2/protocol/openid-connect/auth",
  tokenEndpoint: "http://localhost:8181/realms/fitness-oauth2/protocol/openid-connect/token",
  redirectUri: "http://localhost:5173/",
  scope: "openid profile email",
  pkceEnabled: true,
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <AuthProvider authConfig={authConfig}
                loadingComponent={<div>Loading...</div>}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </AuthProvider>
)