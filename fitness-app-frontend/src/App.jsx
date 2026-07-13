import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useContext, useEffect } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { setCredentials } from './store/authSlice';
import ActivityForm from './component/ActivityForm';
import ActivityList from './component/ActivityList';
import ActivityDetail from './component/ActivityDetail';

const ActivitiesPage = () => {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <ActivityForm onActivityAdded={() => window.location.reload()}/>
      <ActivityList/>
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
    <>
      <Router>
        {!token ? (
          <Button variant="contained"
          onClick={() => logIn()}>LOGIN</Button>
        ) : (
          <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <Routes>
              <Route path="/activities" element={<ActivitiesPage/>}/>
              <Route path="/activities/:id" element={<ActivityDetail/>}/>
              <Route path="/" element={<Navigate to="/activities" replace/>}/>
            </Routes>
          </Box>
        )}
      </Router>
    </>
  )
}

export default App