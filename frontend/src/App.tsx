import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './pages/Auth';

import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import SignupPage from './pages/SignupPage';

function App() {
  // TODO load initialState/user from cookies
  // const [state, dispatch] = React.useReducer(reducer, initialState);
  const auth = useAuth();
  

  console.log("App - user: ", auth.user);
  // if (!auth.user)
  //   return <BrowserRouter>
  //     <Routes>
  //       <Route path="/*" element={<LoginPage />} />
  //       <Route path="/login/" element={<LoginPage />} />
  //       <Route path="/signup/" element={<SignupPage />} />
  //       <Route path="/privacy/" element={<PrivacyPolicyPage />} />
  //     </Routes>
  //   </BrowserRouter>

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<DashboardPage />} />
          <Route path="/login/" element={<LoginPage />} />
          <Route path="/signup/" element={<SignupPage />} />
          <Route path="/dashboard/" element={<DashboardPage />} />
          <Route path="/privacy/" element={<PrivacyPolicyPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;