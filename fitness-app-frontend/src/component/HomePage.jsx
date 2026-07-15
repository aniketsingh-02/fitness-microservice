import { Box, Typography, Button, Grid } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from 'react-oauth2-code-pkce';
import { useNavigate } from 'react-router';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BoltIcon from '@mui/icons-material/Bolt';
import InsightsIcon from '@mui/icons-material/Insights';

const HomePage = () => {
    const { tokenData } = useContext(AuthContext);
    const navigate = useNavigate();

    const features = [
        {
            icon: <FitnessCenterIcon sx={{ fontSize: 40, color: '#6C63FF' }} />,
            title: 'Track Activities',
            description: 'Log your workouts and track your fitness journey'
        },
        {
            icon: <BoltIcon sx={{ fontSize: 40, color: '#FF6584' }} />,
            title: 'AI Powered',
            description: 'Get personalized recommendations from Google Gemini AI'
        },
        {
            icon: <InsightsIcon sx={{ fontSize: 40, color: '#00C896' }} />,
            title: 'Get Insights',
            description: 'Analyze your performance and improve over time'
        }
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.15)',
                zIndex: 0
            }
        }}>
            {/* Gradient overlay */}
            <Box sx={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(135deg, rgba(108,99,255,0.3) 0%, rgba(255,101,132,0.1) 100%)',
                zIndex: 1
            }}/>

            {/* Content */}
            <Box sx={{
                position: 'relative',
                zIndex: 2,
                maxWidth: '1000px',
                margin: '0 auto',
                px: 3,
                pt: 8,
                pb: 6
            }}>
                {/* Hero */}
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography variant='h6' sx={{
                        color: '#6C63FF',
                        fontWeight: 600,
                        mb: 2,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        fontSize: '0.85rem'
                    }}>
                        Welcome back 👋
                    </Typography>

                    <Typography variant='h2' sx={{
                        fontWeight: 800,
                        color: 'white',
                        mb: 2,
                        letterSpacing: '-2px'
                    }}>
                        Hello, {tokenData?.given_name || 'Athlete'}!
                    </Typography>

                    <Typography variant='h6' sx={{
                        color: 'rgba(255,255,255,0.6)',
                        mb: 5,
                        fontWeight: 400,
                        maxWidth: '500px',
                        margin: '0 auto 40px'
                    }}>
                        Ready to crush your fitness goals today?
                    </Typography>

                    {/* Get Started button → goes to Activities */}
                    <Button
                        variant='contained'
                        size='large'
                        onClick={() => navigate('/activities')}
                        sx={{
                            background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
                            px: 5,
                            py: 1.8,
                            borderRadius: '14px',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            boxShadow: '0 10px 40px rgba(108,99,255,0.4)',
                            '&:hover': {
                                transform: 'translateY(-3px)',
                                boxShadow: '0 20px 60px rgba(108,99,255,0.5)',
                                background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
                            }
                        }}>
                        Get Started →
                    </Button>
                </Box>

                {/* Features */}
                <Grid container spacing={3}>
                    {features.map((feature) => (
                        <Grid item xs={12} md={4} key={feature.title}>
                            <Box sx={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '20px',
                                p: 3,
                                textAlign: 'center',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    background: 'rgba(255,255,255,0.08)',
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                                }
                            }}>
                                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                                <Typography variant='h6' sx={{
                                    color: 'white',
                                    fontWeight: 700,
                                    mb: 1
                                }}>
                                    {feature.title}
                                </Typography>
                                <Typography variant='body2' sx={{
                                    color: 'rgba(255,255,255,0.5)'
                                }}>
                                    {feature.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default HomePage;