import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import footerLogo from '../Images/Landora.png'; // Adjust the path for footer logo
import { Container, Typography, Box, Grid } from '@mui/material';
import EFpage from '../ExtraFeature/EFpage'; // Ensure the path is correct

function AboutUs() {
  return (
    <div
      style={{
        background: 'linear-gradient(to left, #131313, #ff932f)',

        backgroundSize: 'cover', // Cover the entire page
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Prevent image repetition
        minHeight: '100vh', // Ensure full height
        animation: 'fadeIn 1.5s ease-in-out', // Add fade-in animation to the entire page
      }}
    >
      <Header />
      <Container maxWidth="md" sx={{ paddingY: 5 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            color: 'black',
            opacity: 0,
            animation: 'fadeInText 1.5s forwards',
            animationDelay: '0.5s',
          }}
        >
          About Us
        </Typography>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={10}>
            <Box sx={{ textAlign: 'left', paddingX: 2 }}>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  color: 'black',
                  opacity: 0,
                  animation: 'fadeInText 1.5s forwards',
                  animationDelay: '1s',
                }}
              >
                Welcome to Landora, your premier destination for land sales and rentals. We are committed to providing you with the best real estate opportunities, focusing on reliability, customer satisfaction, and innovation.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  color: 'black',
                  opacity: 0,
                  animation: 'fadeInText 1.5s forwards',
                  animationDelay: '1.2s',
                }}
              >
                Founded in 2025, Landora has quickly established itself as a trusted name in the real estate industry. Our passion for helping people find their perfect property inspired us to create a business that prioritizes your needs and preferences.
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  color: 'black',
                  opacity: 0,
                  animation: 'fadeInText 1.5s forwards',
                  animationDelay: '1.4s',
                }}
              >
                Whether you are looking to buy or rent, we are here to assist you every step of the way. If you have any questions or comments, please don't hesitate to{' '}
                <Link to="/Contact" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
                  contact us
                </Link>.
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', opacity: 0, animation: 'zoomIn 2s forwards', animationDelay: '2s' }}>
              <img
                src={footerLogo}
                alt="Logo"
                style={{
                  height: '20vh',
                  objectFit: 'contain',
                  paddingBottom: 70,
                }}
              />
              <Typography variant="body2" sx={{ color: 'black' }}>
                &copy; {new Date().getFullYear()} Landora.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
\      <Footer />
    </div>
  );
}

export default AboutUs;
