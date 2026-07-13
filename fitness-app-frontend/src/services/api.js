import axios from "axios";

const API_URL = 'http://localhost:8080/api/';

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    const userId = localStorage.getItem('userId');
    if(userId){
        config.headers['X-User-ID'] = userId;
    }
    return config;
});

export const getActivities = () => api.get('activities');
export const addActivity = (activity) => api.post('activities', {
    activityType: activity.type,
    duration: Number(activity.duration),
    caloriesBurned: Number(activity.caloriesBurned)
});
export const getActivityById = (id) => api.get(`activities/${id}`);
export const getUserRecommendations = (userId) => api.get(`recommendations/user/${userId}`);