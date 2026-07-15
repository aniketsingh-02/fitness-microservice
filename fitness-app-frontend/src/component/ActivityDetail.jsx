import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getActivityById, getUserRecommendations } from "../services/api";
import {
    Box, Card, CardContent, Chip, CircularProgress,
    Divider, List, ListItem, ListItemText, Typography, Button
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const ActivityDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const activityRes = await getActivityById(id);
                setActivity(activityRes.data);
                const userId = localStorage.getItem('userId');
                const recRes = await getUserRecommendations(userId);
                const activityRec = recRes.data.find(r => r.activityId === id);
                setRecommendation(activityRec);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <Box display='flex' justifyContent='center' alignItems='center'
                sx={{ minHeight: '80vh' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress sx={{ color: '#6C63FF', mb: 2 }} />
                    <Typography color='text.secondary'>
                        Loading AI recommendations...
                    </Typography>
                </Box>
            </Box>
        );
    }

    if (!activity) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color='text.secondary'>Activity not found!</Typography>
                <Button onClick={() => navigate('/activities')}
                    sx={{ mt: 2, color: '#6C63FF' }}>
                    Go Back
                </Button>
            </Box>
        );
    }

    const typeColors = {
        RUNNING: '#FF6584',
        WALKING: '#6C63FF',
        CYCLING: '#00C896',
    };
    const typeColor = typeColors[activity.type] || '#6C63FF';

    return (
        <Box sx={{
            maxWidth: '900px',
            margin: '0 auto',
            p: 3
        }}>
            {/* Back Button */}
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/activities')}
                sx={{
                    color: 'text.secondary',
                    mb: 3,
                    '&:hover': { color: '#6C63FF' }
                }}>
                Back to Activities
            </Button>

            {/* Activity Info Card */}
            <Card sx={{
                mb: 3,
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${typeColor}40`,
                borderRadius: '20px',
                boxShadow: `0 0 30px ${typeColor}20`
            }}>
                <CardContent sx={{ p: 3 }}>
                    <Box display='flex' alignItems='center' gap={2} mb={3}>
                        <Box sx={{
                            background: `${typeColor}20`,
                            borderRadius: '14px',
                            p: 1.5,
                            display: 'flex'
                        }}>
                            <FitnessCenterIcon sx={{ color: typeColor, fontSize: 28 }} />
                        </Box>
                        <Box>
                            <Chip
                                label={activity.type || 'UNKNOWN'}
                                sx={{
                                    background: `${typeColor}20`,
                                    color: typeColor,
                                    fontWeight: 700,
                                    border: `1px solid ${typeColor}40`,
                                    mb: 0.5
                                }}
                            />
                            <Typography variant='body2' color='text.secondary'>
                                {new Date(activity.createdAt).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 3 }} />

                    {/* Stats */}
                    <Box display='flex' gap={3} flexWrap='wrap'>
                        <Box sx={{
                            background: 'rgba(255,255,255,0.04)',
                            borderRadius: '14px',
                            p: 2,
                            flex: 1,
                            minWidth: '120px',
                            textAlign: 'center'
                        }}>
                            <Typography variant='h4' sx={{
                                fontWeight: 800,
                                color: '#6C63FF'
                            }}>
                                {activity.duration}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                ⏱ Minutes
                            </Typography>
                        </Box>
                        <Box sx={{
                            background: 'rgba(255,255,255,0.04)',
                            borderRadius: '14px',
                            p: 2,
                            flex: 1,
                            minWidth: '120px',
                            textAlign: 'center'
                        }}>
                            <Typography variant='h4' sx={{
                                fontWeight: 800,
                                color: '#FF6584'
                            }}>
                                {activity.caloriesBurned}
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                🔥 Calories
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {/* AI Recommendations */}
            {recommendation ? (
                <Box>
                    {/* Header */}
                    <Box display='flex' alignItems='center' gap={1.5} mb={3}>
                        <Box sx={{
                            background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
                            borderRadius: '12px',
                            p: 1,
                            display: 'flex'
                        }}>
                            <AutoAwesomeIcon sx={{ color: 'white', fontSize: 20 }} />
                        </Box>
                        <Typography variant='h5' sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #6C63FF, #FF6584)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            AI Recommendations
                        </Typography>
                        <Chip label='Powered by Gemini'
                            size='small'
                            sx={{
                                background: 'rgba(108,99,255,0.15)',
                                color: '#6C63FF',
                                border: '1px solid rgba(108,99,255,0.3)',
                                fontSize: '0.7rem'
                            }}
                        />
                    </Box>

                    {/* Analysis */}
                    <Card sx={{
                        mb: 2,
                        background: 'rgba(108,99,255,0.05)',
                        border: '1px solid rgba(108,99,255,0.15)',
                        borderRadius: '16px'
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box display='flex' alignItems='center' gap={1} mb={2}>
                                <EmojiEventsIcon sx={{ color: '#6C63FF', fontSize: 20 }} />
                                <Typography variant='h6' sx={{ fontWeight: 700, color: '#6C63FF' }}>
                                    Analysis
                                </Typography>
                            </Box>
                            <Typography variant='body2' color='text.secondary'
                                sx={{ lineHeight: 1.8 }}>
                                {recommendation.recommendation}
                            </Typography>
                        </CardContent>
                    </Card>

                    {/* Improvements */}
                    {recommendation.improvements?.length > 0 && (
                        <Card sx={{
                            mb: 2,
                            background: 'rgba(0,200,150,0.05)',
                            border: '1px solid rgba(0,200,150,0.15)',
                            borderRadius: '16px'
                        }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box display='flex' alignItems='center' gap={1} mb={2}>
                                    <TipsAndUpdatesIcon sx={{ color: '#00C896', fontSize: 20 }} />
                                    <Typography variant='h6' sx={{ fontWeight: 700, color: '#00C896' }}>
                                        Improvements
                                    </Typography>
                                </Box>
                                <List dense disablePadding>
                                    {recommendation.improvements.map((item, index) => (
                                        <ListItem key={index} sx={{
                                            px: 0,
                                            py: 0.5,
                                            alignItems: 'flex-start'
                                        }}>
                                            <ListItemText
                                                primary={`${index + 1}. ${item}`}
                                                primaryTypographyProps={{
                                                    variant: 'body2',
                                                    color: 'text.secondary',
                                                    lineHeight: 1.7
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    )}

                    {/* Suggestions */}
                    {recommendation.suggestions?.length > 0 && (
                        <Card sx={{
                            mb: 2,
                            background: 'rgba(255,101,132,0.05)',
                            border: '1px solid rgba(255,101,132,0.15)',
                            borderRadius: '16px'
                        }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box display='flex' alignItems='center' gap={1} mb={2}>
                                    <AutoAwesomeIcon sx={{ color: '#FF6584', fontSize: 20 }} />
                                    <Typography variant='h6' sx={{ fontWeight: 700, color: '#FF6584' }}>
                                        Next Workout Suggestions
                                    </Typography>
                                </Box>
                                <List dense disablePadding>
                                    {recommendation.suggestions.map((item, index) => (
                                        <ListItem key={index} sx={{
                                            px: 0,
                                            py: 0.5,
                                            alignItems: 'flex-start'
                                        }}>
                                            <ListItemText
                                                primary={`${index + 1}. ${item}`}
                                                primaryTypographyProps={{
                                                    variant: 'body2',
                                                    color: 'text.secondary',
                                                    lineHeight: 1.7
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    )}

                    {/* Safety */}
                    {recommendation.safety?.length > 0 && (
                        <Card sx={{
                            background: 'rgba(255,179,71,0.05)',
                            border: '1px solid rgba(255,179,71,0.15)',
                            borderRadius: '16px'
                        }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box display='flex' alignItems='center' gap={1} mb={2}>
                                    <WarningAmberIcon sx={{ color: '#FFB347', fontSize: 20 }} />
                                    <Typography variant='h6' sx={{ fontWeight: 700, color: '#FFB347' }}>
                                        Safety Guidelines
                                    </Typography>
                                </Box>
                                <List dense disablePadding>
                                    {recommendation.safety.map((item, index) => (
                                        <ListItem key={index} sx={{
                                            px: 0,
                                            py: 0.5,
                                            alignItems: 'flex-start'
                                        }}>
                                            <ListItemText
                                                primary={`• ${item}`}
                                                primaryTypographyProps={{
                                                    variant: 'body2',
                                                    color: 'text.secondary',
                                                    lineHeight: 1.7
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    )}
                </Box>
            ) : (
                <Card sx={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px'
                }}>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                        <AutoAwesomeIcon sx={{ fontSize: 40, color: '#6C63FF', mb: 2 }} />
                        <Typography variant='h6' color='text.secondary'>
                            AI recommendations are being generated...
                        </Typography>
                        <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
                            Please check back in a few moments!
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default ActivityDetail;