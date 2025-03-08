/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import Navbar from '../Navbar/Navbar'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import colors from '../colors'; // Import the colors object
import EFpage from '../ExtraFeature/EFpage'; // Ensure the path is correct
import footerLogo from '../Images/Landora.png'; // Adjust the path for footer logo

function Home() {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100); // Delay for initial fade-in effect
    return () => clearTimeout(timer);
  }, []);

  const handleShopNowClick = () => {
    navigate('/jewellery'); // Navigate to /jewellery
  };

  return (
    <div style={{
      height: '100vh',
      margin: 0,
      overflow: 'hidden',
      opacity: fadeIn ? 1 : 0,
      transition: 'opacity 2s ease-out',
    }}>
      <Navbar /> {/* Include the Navbar component */}

      <Box

        sx={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundPosition: 'left center, right center',
          backgroundRepeat: 'no-repeat, no-repeat',
          backgroundSize: '51% 100%, 51% 100%',
          background: colors.homebg, // Use the color from colors object
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 2s ease-out',
        }}
      ><img
          src={footerLogo}
          alt="Logo"
          style={{
            height: '75vh',
            objectFit: 'contain',
            paddingBottom: 70,
            animation: 'fadeIn 3s ease-out',
          }}
        />
        {/* Main Title 
        
        <Typography
          variant="h2"
          sx={{
            position: 'absolute',
            color: colors.hometext1,
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: '6rem',
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
            marginBottom: '200px',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: fadeIn ? 'translateY(0)' : 'translateY(-50px)',
            opacity: fadeIn ? 1 : 0,
            transition: 'transform 2s ease-out, opacity 2s ease-out',
          }}
        >
          <span style={{ position: 'relative', left: '-0.1em' }}>LANDORA</span>
        </Typography>
        {/* Subtitle */}{/*
        <Typography
          variant="h5"
          sx={{
            position: 'absolute',
            color: colors.hometext2,
            fontWeight: 400, // Apply the font weight
            fontStyle: 'normal', // Apply the font style
            marginTop: '45px',
            marginBottom: '100px',
            textAlign: 'center',
            fontSize: '3rem',
            opacity: fadeIn ? 1 : 0,
            transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'transform 2s ease-out, opacity 2s ease-out',
          }}
        >
          Connecting Land Owners and Buyers        </Typography> */}

        
      </Box>
    </div>
  );
}

export default Home;
