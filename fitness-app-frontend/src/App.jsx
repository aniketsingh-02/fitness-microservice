import { BrowserRouter as Router, Route, Routes } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useContext, useEffect } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { setCredentials } from './store/authSlice';
import ActivityForm from './component/ActivityForm';
import ActivityList from './component/ActivityList';
import ActivityDetail from './component/ActivityDetail';
import Navbar from './component/Navbar';
import HomePage from './component/HomePage';

const ActivitiesPage = () => {
  return (
    <Box sx={{
      maxWidth: '1200px',
      margin: '0 auto',
      p: 3
    }}>
      {/* Header */}
      <Box sx={{ mb: 4, pt: 2 }}>
        <Typography variant='h4' sx={{
          fontWeight: 800,
          background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 0.5
        }}>
          My Activities
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Track your fitness journey and get AI-powered insights
        </Typography>
      </Box>

      {/* Form Card */}
      <Box sx={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        p: 3,
        mb: 4,
        backdropFilter: 'blur(10px)'
      }}>
        <Typography variant='h6' sx={{
          color: 'white',
          fontWeight: 700,
          mb: 3
        }}>
          ➕ Log New Activity
        </Typography>
        <ActivityForm onActivityAdded={() => window.location.reload()}/>
      </Box>

      {/* Activities List */}
      <Box>
        <Typography variant='h6' sx={{
          color: 'white',
          fontWeight: 700,
          mb: 2
        }}>
          📋 Recent Activities
        </Typography>
        <ActivityList/>
      </Box>
    </Box>
  )
}

function App() {
  const {token, tokenData, logIn} = useContext(AuthContext)
  const dispatch = useDispatch();

  useEffect(() => {
    if(token){
      dispatch(setCredentials({token, user: tokenData}));
      localStorage.setItem('token', token);
      localStorage.setItem('userId', tokenData?.sub);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
        // ← Login page with gym background
        <Box sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)',
            zIndex: 0
          }
        }}>
          {/* Gradient overlay */}
          <Box sx={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(135deg, rgba(108,99,255,0.4) 0%, rgba(255,101,132,0.2) 100%)',
            zIndex: 1
          }}/>

          {/* Content */}
          <Box sx={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
            px: 3
          }}>
            {/* Logo icon */}
            <Box sx={{
              display: 'inline-flex',
              background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
              borderRadius: '24px',
              p: 2,
              mb: 3,
              boxShadow: '0 20px 60px rgba(108,99,255,0.4)'
            }}>
              <Typography sx={{ fontSize: '3rem', lineHeight: 1 }}>🏋️</Typography>
            </Box>

            {/* Title */}
            <Typography variant='h2' sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #FFFFFF, #B8B5FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              letterSpacing: '-2px'
            }}>
              FitAI
            </Typography>

            {/* Subtitle */}
            <Typography variant='h6' sx={{
              color: 'rgba(255,255,255,0.7)',
              mb: 1,
              fontWeight: 400
            }}>
              Your AI-powered fitness companion
            </Typography>

            <Typography variant='body2' sx={{
              color: 'rgba(255,255,255,0.4)',
              mb: 4
            }}>
              Track activities • Get AI insights • Improve performance
            </Typography>

            {/* Features */}
            <Box display='flex' gap={2} justifyContent='center' mb={4} flexWrap='wrap'>
              {[
                { icon: '🏃', text: 'Activity Tracking' },
                { icon: '🤖', text: 'AI Analysis' },
                { icon: '📊', text: 'Insights' }
              ].map((feature) => (
                <Box key={feature.text} sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '50px',
                  px: 2.5,
                  py: 0.8,
                  backdropFilter: 'blur(10px)',
                }}>
                  <Typography sx={{ fontSize: '1rem' }}>{feature.icon}</Typography>
                  <Typography variant='body2' sx={{
                    color: 'rgba(255,255,255,0.8)',
                    fontWeight: 500,
                    whiteSpace: 'nowrap'
                  }}>
                    {feature.text}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Login Button → opens Keycloak */}
            <Box
              onClick={() => logIn()}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
                color: 'white',
                padding: '16px 48px',
                borderRadius: '14px',
                fontWeight: 700,
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxShadow: '0 10px 40px rgba(108,99,255,0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 20px 60px rgba(108,99,255,0.6)'
                }
              }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                Login →
              </Typography>
            </Box>

            <Typography variant='body2' sx={{
              color: 'rgba(255,255,255,0.3)',
              mt: 2,
              fontSize: '0.8rem'
            }}>
              Secure authentication powered by Keycloak OAuth2
            </Typography>
          </Box>
        </Box>
      ) : (
        // ← After login → show Navbar + HomePage first
        <Box sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0A0A0F 0%, #13131A 100%)'
        }}>
          <Navbar />
          <Box sx={{ pt: '64px' }}>
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/activities" element={<ActivitiesPage/>}/>
              <Route path="/activities/:id" element={<ActivityDetail/>}/>
            </Routes>
          </Box>
        </Box>
      )}
    </Router>
  )
}

export default App