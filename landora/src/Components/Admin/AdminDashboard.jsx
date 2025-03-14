// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, CssBaseline, Box, Typography, Button } from '@mui/material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faSackDollar, faHammer, faSignOutAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';
import EFpage from '../ExtraFeature/EFpage';

const drawerWidth = 210;

// Background image for sidebar
const sidebarBackground = 'url(https://wallpapers.com/images/hd/blank-white-vertical-grains-mcf32g28ary3jdej.jpg)';

const menuItems = [
  { text: 'Dashboard', icon: faTachometerAlt, path: '/admindashboard/dashboard' },
  { text: 'User Management', icon: faUsers, path: '/admindashboard/user-management' },
  { text: 'Property Management', icon: faBuilding, path: '/property-management/list' },
  { text: 'Sales Management', icon: faSackDollar, path: '/sales-management/SalesList' },
  { text: 'Maintenance Management', icon: faHammer, path: '/maintanance-management/Requests' },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const [currentTab, setCurrentTab] = useState('');
  const [showEFPage, setShowEFPage] = useState(false);

  useEffect(() => {
    const currentItem = menuItems.find((item) => item.path === location.pathname);
    setCurrentTab(currentItem ? currentItem.text : 'Dashboard');
  }, [location.pathname]);

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    if (logout) {
      logout();
      navigate('/login');
    }
  };

  const toggleView = () => {
    setShowEFPage((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#333',
            paddingTop: '20px',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton key={index} onClick={() => handleMenuClick(item.path)}>
              <ListItemIcon sx={{ color: '#ff932f' }}>
                <FontAwesomeIcon icon={item.icon} />
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: 'black' }} />
            </ListItemButton>
          ))}
        </List>
        <Button variant="contained" sx={{ m: 2, bgcolor:" #ffc400", color:" #000000" }} onClick={toggleView}>
          {showEFPage ? 'Show Dashboard' : 'LANDORA'}
        </Button>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to left, #babd02, #ff932f)', padding: 2, color: 'white', height: '100px' }}>
          <Typography variant="h5">{currentTab}</Typography>
          <Button variant="outlined" onClick={handleLogout} sx={{ color: 'black', borderColor: 'black' }}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Button>
        </Box>

        {/* Content Rendering */}
        {showEFPage ? <EFpage /> : <Outlet />}
      </Box>
    </Box>
  );
}

export default AdminDashboard;
