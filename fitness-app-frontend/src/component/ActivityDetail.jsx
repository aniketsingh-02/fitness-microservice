import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getActivityById, getUserRecommendations } from "../services/api";
import {
    Box, Card, CardContent, Chip, CircularProgress,
    Divider, List, ListItem, ListItemText, Typography, Button
} from "@mui/material";

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
            <Box display='flex' justifyContent='center' mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (!activity) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Activity not found!</Typography>
                <Button onClick={() => navigate('/activities')}>Go Back</Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>

            {/* Back Button */}
            <Button
                onClick={() => navigate('/activities')}
                sx={{ mb: 2 }}>
                ← Back
            </Button>

            {/* Activity Info Card */}
            <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 2 }}>
                <CardContent>
                    <Chip
                        label={activity.type}
                        color='primary'
                        sx={{ mb: 2, fontWeight: 'bold' }}
                    />
                    <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2 }}>
                        Activity Details
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant='body1'>⏱ Duration: <strong>{activity.duration} mins</strong></Typography>
                    <Typography variant='body1'>🔥 Calories Burned: <strong>{activity.caloriesBurned}</strong></Typography>
                    <Typography variant='body1' color='text.secondary' sx={{ mt: 1 }}>
                        📅 {new Date(activity.createdAt).toLocaleDateString()}
                    </Typography>
                </CardContent>
            </Card>

            {/* AI Recommendation Card */}
            {recommendation ? (
                <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                    <CardContent>
                        <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2 }}>
                            🤖 AI Recommendations
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        {/* Analysis */}
                        <Typography variant='h6' sx={{ mb: 1 }}>📊 Analysis</Typography>
                        <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
                            {recommendation.recommendation}
                        </Typography>

                        {/* Improvements */}
                        {recommendation.improvements?.length > 0 && (
                            <>
                                <Typography variant='h6' sx={{ mb: 1 }}>💪 Improvements</Typography>
                                <List dense>
                                    {recommendation.improvements.map((item, index) => (
                                        <ListItem key={index} sx={{ py: 0 }}>
                                            <ListItemText
                                                primary={`• ${item}`}
                                                primaryTypographyProps={{ variant: 'body2' }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        )}

                        {/* Suggestions */}
                        {recommendation.suggestions?.length > 0 && (
                            <>
                                <Typography variant='h6' sx={{ mt: 2, mb: 1 }}>🎯 Suggestions</Typography>
                                <List dense>
                                    {recommendation.suggestions.map((item, index) => (
                                        <ListItem key={index} sx={{ py: 0 }}>
                                            <ListItemText
                                                primary={`• ${item}`}
                                                primaryTypographyProps={{ variant: 'body2' }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        )}

                        {/* Safety */}
                        {recommendation.safety?.length > 0 && (
                            <>
                                <Typography variant='h6' sx={{ mt: 2, mb: 1 }}>⚠️ Safety Guidelines</Typography>
                                <List dense>
                                    {recommendation.safety.map((item, index) => (
                                        <ListItem key={index} sx={{ py: 0 }}>
                                            <ListItemText
                                                primary={`• ${item}`}
                                                primaryTypographyProps={{ variant: 'body2' }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
                    <CardContent>
                        <Typography variant='h6'>🤖 AI Recommendations</Typography>
                        <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
                            No recommendations available yet. Please check back later!
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default ActivityDetail;