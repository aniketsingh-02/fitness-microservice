import { Box, Typography, Button, Avatar, Chip } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from 'react-oauth2-code-pkce';
import { useNavigate } from 'react-router';
import LogoutIcon from '@mui/icons-material/Logout';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Navbar = () => {
    const { logOut, tokenData } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 4,
            background: 'rgba(10, 10, 15, 0.95)',
            borderBottom: '1px solid rgba(108, 99, 255, 0.2)',
            zIndex: 9999,
            backdropFilter: 'blur(20px)',
        }}>
            {/* Logo */}
            <Box display='flex' alignItems='center' gap={1.5}
                onClick={() => navigate('/activities')}
                sx={{ cursor: 'pointer' }}>
                <Box sx={{
                    background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
                    borderRadius: '10px',
                    p: 0.7,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <FitnessCenterIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
                <Typography variant='h6' sx={{
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.5px'
                }}>
                    FitAI
                </Typography>
            </Box>

            {/* Right side */}
            <Box display='flex' alignItems='center' gap={2}>
                {/* User chip */}
                <Chip
                    avatar={
                        <Avatar sx={{
                            bgcolor: '#6C63FF !important',
                            color: 'white !important',
                            fontWeight: 700,
                            fontSize: '0.8rem'
                        }}>
                            {tokenData?.given_name?.[0]?.toUpperCase() || 'U'}
                        </Avatar>
                    }
                    label={tokenData?.given_name || 'User'}
                    sx={{
                        background: 'rgba(108, 99, 255, 0.15)',
                        border: '1px solid rgba(108, 99, 255, 0.3)',
                        color: 'white',
                        fontWeight: 600,
                        '& .MuiChip-label': { px: 1.5 }
                    }}
                />

                {/* Logout button */}
                <Button
                    variant='outlined'
                    size='small'
                    startIcon={<LogoutIcon sx={{ fontSize: 16 }} />}
                    onClick={logOut}
                    sx={{
                        borderColor: 'rgba(255,255,255,0.15)',
                        color: 'rgba(255,255,255,0.6)',
                        borderRadius: '10px',
                        fontSize: '0.8rem',
                        px: 2,
                        '&:hover': {
                            borderColor: '#FF6584',
                            color: '#FF6584',
                            background: 'rgba(255, 101, 132, 0.08)'
                        }
                    }}>
                    Logout
                </Button>
            </Box>
        </Box>
    );
};

export default Navbar;