import { Card, CardContent, Grid, Typography, Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getActivities } from '../services/api';

const ActivityList = () => {
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await getActivities();
                setActivities(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchActivities();
    }, []);

    return (
        <Grid container spacing={2} sx={{ mt: 1 }}>
            {activities.map((activity) => (
                <Grid xs={12} sm={6} md={3} key={activity.id}>
                    <Card
                        sx={{
                            cursor: 'pointer',
                            borderRadius: 2,
                            boxShadow: 1,
                            '&:hover': { boxShadow: 4, transform: 'scale(1.02)', transition: '0.2s' }
                        }}
                        onClick={() => navigate(`/activities/${activity.id}`)}>
                        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                            <Chip
                                label={activity.type || 'UNKNOWN'}
                                size='small'
                                color='primary'
                                sx={{ mb: 1, fontWeight: 'bold', fontSize: '0.7rem' }}
                            />
                            <Typography variant='body2' color='text.secondary'>
                                ⏱ {activity.duration} mins
                            </Typography>
                            <Typography variant='body2' color='text.secondary'>
                                🔥 {activity.caloriesBurned} cal
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            {activities.length === 0 && (
                <Grid xs={12}>
                    <Typography color='text.secondary'>
                        No activities found. Add one above!
                    </Typography>
                </Grid>
            )}
        </Grid>
    )
}

export default ActivityList