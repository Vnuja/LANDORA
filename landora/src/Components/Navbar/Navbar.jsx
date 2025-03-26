import React, { useContext } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
//import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext'; // Adjust the path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import colors from '../colors';
import navpng from '../Images/navpng.png'; // Adjust the path for footer logo

function Navbar() {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = authState;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: colors.navbg, height: '85px' }}>
        <Toolbar >
          {/* Navbar Items */}
          <img src={navpng} alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
          <Typography fontSize={20} sx={{ flexGrow: 1, color:colors.navleft, marginTop: '18px' }}>
          <Button color="inherit" sx={{ fontSize: 14 }} component={Link} to="/" ></Button>
          <Button color="inherit" sx={{ fontSize: 17 }} component={Link} to="/" >LANDORA</Button>
          <Button color="inherit" sx={{ fontSize: 14 }} component={Link} to="/" ></Button>
          <Button color="inherit" sx={{ fontSize: 14 }} component={Link} to="/sale">For Sales</Button>
          <Button color="inherit" sx={{ fontSize: 14 }} component={Link} to="/rent">Rental</Button>
          <Button color="inherit" sx={{ fontSize: 14 }} component={Link} to="/About">About Us</Button>
          <Button color="inherit" sx={{ fontSize: 14 }} component={Link} to="/Contact">Contact Us</Button>
          <Button color="inherit" sx={{ fontSize: 14 }} component={Link} to="/efpage">AI Designer</Button>
           {/* <Button color="inherit" component={Link} to="/appointment">Appointments</Button>*/}
          </Typography>

          {/* Profile Icon */}
          {user && (
            <IconButton
              size="large"
              aria-label="user profile"
              color={colors.navicon}
              component={Link} to={`/userprofile/${user.userId}`} // Adjust to your profile route
            >
              <FontAwesomeIcon icon={faUserCircle} size="lg" style={{ color: colors.navicon, marginTop: '18px' }} />
            </IconButton>
          )}

          {user ? (
            <>
              <Typography variant="body1" sx={{ mx: 2, color: colors.navright, fontSize: 16, marginTop: '18px' }}>
                Hello, {user.name}
              </Typography>
              <Button color="inherit" onClick={handleLogout} sx={{ mx: 2, color: colors.danger, fontSize: 16 }}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login" sx={{ mx: 2, color: colors.navright, fontSize: 16, marginTop: '18px' }}>Login</Button>
              |
              <Button color="inherit" component={Link} to="/signup" sx={{ mx: 2, color: colors.navright, fontSize: 16, marginTop: '18px' }}>Register</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
