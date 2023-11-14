// thorswapapi.js
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const THORSWAP_API_URL = 'https://api.thorswap.com'; // Replace with the actual ThorSwap API URL

app.post('/swap', async (req, res) => {
    const swapDetails = req.body;

    try {
        // Make a request to the ThorSwap API
        const response = await axios.post(`${THORSWAP_API_URL}/swap`, swapDetails);
        res.json({ success: true, txHash: response.data.txHash });
    } catch (error) {
        console.error('Error in ThorSwap API call:', error);
        res.status(500).send('Error occurred during the swap');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
