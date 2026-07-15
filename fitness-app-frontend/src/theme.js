import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#6C63FF',
            light: '#8B85FF',
            dark: '#4B44CC',
        },
        secondary: {
            main: '#FF6584',
            light: '#FF85A1',
            dark: '#CC4466',
        },
        background: {
            default: '#0A0A0F',
            paper: '#13131A',
        },
        success: {
            main: '#00C896',
        },
        warning: {
            main: '#FFB347',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#9999BB',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", sans-serif',
        h1: { fontWeight: 800 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '10px 24px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    backgroundImage: 'none',
                    border: '1px solid rgba(255,255,255,0.08)',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                    },
                },
            },
        },
    },
});

export default theme;