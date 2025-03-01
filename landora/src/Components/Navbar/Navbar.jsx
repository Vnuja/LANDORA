import React, { useContext } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext'; // Adjust the path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = authState;

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{ backgroundColor: '#131313' }}>
        <Toolbar>
          {/* Navbar Items */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: 'white' }}>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/sale">For Sales</Button>
            <Button color="inherit" component={Link} to="/rent">Rental</Button>
            <Button color="inherit" component={Link} to="/About">About Us</Button>
            <Button color="inherit" component={Link} to="/Contact">Contact Us</Button>
           {/* <Button color="inherit" component={Link} to="/appointment">Appointments</Button>*/}
          </Typography>

          {/* Right Side Items */}
          <IconButton
            size="large"
            aria-label="show cart items"
            color="white"
            component={Link} to="/cart"
          >
            <ShoppingCartIcon sx={{ color: 'white' }}/>
          </IconButton>

          {/* Profile Icon */}
          {user && (
            <IconButton
              size="large"
              aria-label="user profile"
              color="white"
              component={Link} to={`/userprofile/${user.userId}`} // Adjust to your profile route
            >
              <FontAwesomeIcon icon={faUserCircle} size="lg" />
            </IconButton>
          )}

          {user ? (
            <>
              <Typography variant="body1" sx={{ mx: 2, color: 'white' }}>
                Hello, {user.name}
              </Typography>
              <Button color="inherit" onClick={handleLogout} sx={{ mx: 2, color: 'white' }}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login" sx={{ mx: 2, color: 'white' }}>Sign In</Button>
              <Button color="inherit" component={Link} to="/signup" sx={{ mx: 2, color: 'white' }}>Sign Up</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
