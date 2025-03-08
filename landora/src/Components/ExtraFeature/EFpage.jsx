import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Container, TextField, Button, Paper, Typography, Box, Grid, CircularProgress } from '@mui/material';
import colors from '../colors';

const EFpage = () => {
    const [prompt, setPrompt] = useState('jacusi with plants and blue tiles');
    const [imageUrl, setImageUrl] = useState('https://cdn.decorpad.com/photos/2018/08/06/m_hot-tub-with-fountain.jpg');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (prompt.trim()) {
            setLoading(true);
            setImageUrl('');
            try {
                const response = await axios.post('http://localhost:4000/generate-image', { prompt });
                setImageUrl(response.data.imageUrl);
            } catch (error) {
                console.error('Error generating image:', error);
            }
            setLoading(false);
        }
    };

    return (
        <Box>
            <Navbar />
            <Container maxWidth="md" sx={{ py: 5 }}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 2, color:colors.efpagetext1, bgcolor: colors.efpagebg }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        LANDORA Designs For You!
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Enter a prompt..."
                            sx={{ bgcolor: 'white', borderRadius: 1 }}
                        />
                        <Button variant="contained" color="primary" onClick={handleGenerate} disabled={loading} sx={{ height: '56px' }}>
                            {loading ? <CircularProgress size={24} /> : 'Generate'}
                        </Button>
                    </Box>
                    <Grid container spacing={2} sx={{ mt: 3 }}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" align="center">Prompt</Typography>
                            <Paper sx={{ p: 2, minHeight: 200, bgcolor: '#f9f9f9', borderRadius: 2 }}>
                                {prompt || "Your prompt will appear here..."}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" align="center">Generated Image</Typography>
                            <Paper sx={{ p: 2, minHeight: 200, bgcolor: '#f9f9f9', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {loading ? <CircularProgress /> : imageUrl ? <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%', borderRadius: '8px' }} /> : "No image generated yet."}
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
};

export default EFpage;
