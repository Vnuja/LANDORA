// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Box, Typography, Button } from '@mui/material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faSackDollar, faHammer, faSignOutAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';

const drawerWidth = 240;

// URL for the background image  
const sidebarBackground = 'https://wallpapers.com/images/hd/blank-white-vertical-grains-mcf32g28ary3jdej.jpg'; // Replace with your image URL

const menuItems = [
  { text: 'Main Dashboard', icon: <FontAwesomeIcon icon={faTachometerAlt} />, path: '/admindashboard/dashboard' },
  { text: 'Maintenance Requests', icon: <FontAwesomeIcon icon={faUsers} />, path: '/maintanance-management/Requests' },
  { text: 'Vendor Management', icon: <FontAwesomeIcon icon={faBuilding} />, path: '/maintanance-management/Vendor' },
  { text: 'Maintenance Costs', icon: <FontAwesomeIcon icon={faSackDollar} />, path: '/maintanance-management/Costs' },
  { text: 'Schedules preventive maintenance', icon: <FontAwesomeIcon icon={faHammer} />, path: '/maintanance-management/Schedules' },
];

function MaintananceDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const [currentTab, setCurrentTab] = useState('');


  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find(item => item.path === currentPath);
    if (currentItem) {
      setCurrentTab(currentItem.text);
    }
  }, [location.pathname]);

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundImage: `url(${sidebarBackground})`, // Use the URL for the image
            backgroundSize: 'cover', // Adjust as needed
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={() => handleMenuClick(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: 'black' }} /> {/* Change text color to black */}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: 'linear-gradient(to left, #131313, #ff932f)',
          minHeight: '100vh',
          overflow: 'hidden', // Prevent scrolling
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to left, #babd02, #ff932f)', padding: '10px 20px', color: 'white', height: '100px' }}>
          <Typography variant="h5">{currentTab}</Typography>
          <div>
            <Button variant="outlined" onClick={handleLogout} sx={{ marginLeft: 2, color: 'black', borderColor: 'black' }}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Button>
          </div>
        </Box>
        <Outlet />{/* Render nested routes */}
      </Box>
    </Box>
  );
}

export default MaintananceDashboard;
