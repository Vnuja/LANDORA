const{Router} = require('express');
const router = Router();

router.post('/prompt-post', async (req, res) => {
    const { message } = req.body;

    try {
        const {prompt} = req.body;
        const response = await run(prompt)
        return res.json({ response });
        
    } catch (error) {
        console.error('❌ Gemini API Error:', error);
        res.status(500).json({ error: 'Error communicating with Gemini AI' });
    }
});