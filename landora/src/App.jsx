/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Home Components
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import AboutUs from './Components/Home/AboutUs';
import Contact from './Components/Home/ContactUs';
import Register from './Components/Login/Register';
import UserProfile from './Components/pages/UserProfile';
import PrivacyPolicy from './Components/pages/PrivacyPolicy';
import TermsOfUse from './Components/pages/TermsOfUse';

// Admin Components
import AdminDashboard from './Components/Admin/AdminDashboard';
import Dashboard from './Components/Admin/Dashboard';
import UserDetails from './Components/Admin/Users/UserDetails';
import AddUser from './Components/Admin/Users/AddUser';
import UpdateUser from './Components/Admin/Users/UpdateUser';

import { AuthProvider } from './Components/Auth/AuthContext';  // Import AuthProvider
import MakePayment from './Components/pages/MakePayment';

function App() {
  return (
    <AuthProvider>  {/* Wrap the entire app with AuthProvider */}
      <Router>
        <Routes>
          {/* Home Page as the default route */}
          <Route path="/" element={<Home />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/userprofile' element={<UserProfile />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/userprofile/:userId" element={<UserProfile />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/makepayment/:id" element={<MakePayment />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsofuse" element={<TermsOfUse />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admindashboard" element={<AdminDashboard />}>
            <Route path="dashboard" element={<Dashboard />} />
            {/* User Management */}

            <Route path="user-management" element={<UserDetails />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="update-user/:id" element={<UpdateUser />} />

          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function NotFound() {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default App;
