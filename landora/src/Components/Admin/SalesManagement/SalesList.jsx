// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Box, Typography, Button } from '@mui/material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faDollarSign, faSackDollar, faHammer, faSignOutAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';


const drawerWidth = 260;

// Sidebar Background with overlay
const sidebarBackground = `
  linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)),
  url('https://wallpapers.com/images/hd/blank-white-vertical-grains-mcf32g28ary3jdej.jpg')
`;

const menuItems = [
  { text: 'Main Dashboard', icon: faTachometerAlt, path: '/admindashboard/dashboard' },
  { text: 'Sales Management', icon: faSackDollar, path: '/sales-management/SalesList' },
  { text: 'Financial Transactions', icon: faUsers, path: '/sales-management/FinancialTransactions' },
  { text: 'Contracts & Agreements', icon: faBuilding, path: '/sales-management/ContractsAndAgreements' },
  { text: 'Payments & Receipts', icon: faSackDollar, path: '/sales-management/PaymentsAndReceipts' },
  { text: 'Transaction Status', icon: faHammer, path: '/sales-management/TransactionStatus' },
];

function SalesDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const [currentTab, setCurrentTab] = useState('');

  useEffect(() => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
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
      
      {/* Sidebar Navigation */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundImage: sidebarBackground, // Apply background with overlay
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: '#333', // Darker text for better readability
            paddingTop: '20px'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem 
              button 
              key={index} 
              onClick={() => handleMenuClick(item.path)}
              sx={{
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' }, // Hover effect
                padding: '12px 20px',
              }}
            >
              <ListItemIcon>
                <FontAwesomeIcon icon={item.icon} style={{ color: '#ff932f' }} /> {/* Orange icons */}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#f4f4f4', // Light background
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Header Bar */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            background: 'linear-gradient(to left, #babd02, #ff932f)', 
            padding: '15px 30px', 
            color: 'white', 
            height: '80px' 
          }}
        >
          <Typography variant="h5">{currentTab}</Typography>

          <Button 
            variant="contained" 
            onClick={handleLogout} 
            sx={{
              backgroundColor: '#ff3b3b',
              color: 'white',
              '&:hover': { backgroundColor: '#d32f2f' },
              padding: '8px 16px'
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
            Logout
          </Button>
        </Box>

        <Outlet /> {/* Render nested routes */}
      </Box>
    </Box>
  );
}

export default SalesDashboard;
