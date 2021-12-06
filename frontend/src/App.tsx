import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './pages/Auth';

import SideMenu from './pages/SideMenu';
import LoginPage from './pages/LoginPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import SignupPage from './pages/SignupPage';
import Api from './Api';
import DashboardPage from './pages/DashboardPage';
import ExercisesPage from './pages/ExercisesPage';

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
        console.log("App use effect");
        const _user = await Api.user.me();
        console.log("App 26: ", _user?.fName);
        auth.setUser(_user);
      }
      catch (error: any) {
        console.log(error?.response?.data);
      }
    })();
  }, [])

  console.log("App - user: ", auth.user);

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
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/signup/" element={<SignupPage />} />
        <Route path="/privacy/" element={<PrivacyPolicyPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;