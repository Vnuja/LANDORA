/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Grid, Typography, Link, Divider } from '@mui/material';
import footerLogo from '../Images/Landora.png'; // Adjust the path according to your project structure
import colors from '../colors'; // Adjust the path according to your project structure

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor:colors.footerbg ,
        color: colors.footertext,
        paddingY: 3,
        py: 4,
        px: 3,
        mt: 'auto',
      }}
    >
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {/* Logo Section */}
        <Grid item xs={12} sm={3} display="flex" justifyContent="center">
          <img src={footerLogo} alt="Logo" style={{ height: '80px', objectFit: 'contain' }} />
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Link href="/about" variant="body2" sx={{ color:colors.footertext, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                About
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link href="/support" variant="body2" sx={{ color:colors.footertext, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Support
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link href="/gallery" variant="body2" sx={{ color:colors.footertext, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Gallery
              </Link>
            </Grid>
          </Grid>
        </Grid>

        {/* Legal Section */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Legal
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Link href="/privacypolicy" variant="body2" sx={{ color:colors.footertext, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Privacy Policy
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link href="/termsofuse" variant="body2" sx={{ color:colors.footertext, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Terms of Use
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link href="/refunds" variant="body2" sx={{ color:colors.footertext , textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                Sales and Refunds
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ backgroundColor: '#444', my: 3 }} />

      {/* Social Media Links */}
      <Box textAlign="center" mb={2} sx={{height: '5px'}}>
        <Link href="https://instagram.com" target="_blank" variant="body2" sx={{ mx: 1, color:colors.footertext, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Instagram
        </Link>
        |
        <Link href="https://facebook.com" target="_blank" variant="body2" sx={{ mx: 1, color:colors.footertext, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Facebook
        </Link>
        |
        <Link href="https://twitter.com" target="_blank" variant="body2" sx={{ mx: 1, color:colors.footertext, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Twitter
        </Link>
      </Box>

      {/* Copyright */}
      <Box textAlign="center">
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} Landora. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
