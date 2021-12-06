import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './pages/Auth';

import LoginPage from './pages/LoginPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import SignupPage from './pages/SignupPage';
import Api from './Api';
import DashboardPage from './pages/DashboardPage';
import ExercisesPage from './pages/ExercisesPage';
import GoalsPage from './pages/GoalsPage';
import OneRepMaxPage from './pages/OneRepMaxPage';

function App() {
  // TODO load initialState/user from cookies
  // const [state, dispatch] = React.useReducer(reducer, initialState);
  return (<AuthProvider>
    <AppRoutes />
  </AuthProvider>
  )
}

function AppRoutes() {
  const auth = useAuth();
  React.useEffect(() => {
    (async () => {
      try {
        const _user = await Api.user.me();
        console.log("App 28: ", _user?.fName);
        auth.setUser(_user);
      }
      catch (error: any) {
        console.log(error?.response?.data);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!auth.user)
    return <BrowserRouter>
      <Routes>

        <Route path="/*" element={<LoginPage />} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/signup/" element={<SignupPage />} />
        <Route path="/privacy/" element={<PrivacyPolicyPage />} />

      </Routes>
    </BrowserRouter>

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/*" element={<DashboardPage />} />
        <Route path="/dashboard/" element={<DashboardPage />} />
        <Route path="/exercises/" element={<ExercisesPage />} />
        <Route path="/one-rep-max/" element={<OneRepMaxPage />} />
        <Route path="/goals/" element={<GoalsPage />} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/signup/" element={<SignupPage />} />
        <Route path="/privacy/" element={<PrivacyPolicyPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;