npm install thorswap-sdk

const express = require('express');
const router = express.Router();
const ThorSwapSDK = require('thorswap-sdk'); // assuming such an import is needed

// Assuming the SDK provides a method to initialize it with necessary parameters
const thorSwap = new ThorSwapSDK({ /* configuration parameters */ });

router.post('/swapBTCtoBNB', async (req, res) => {
    const { amount } = req.body; // amount in BTC
    const fee = amount * 0.001; // 0.1% fee
    const amountAfterFee = amount - fee;

    try {
        // Assuming the SDK provides a method to perform the swap
        const swapResult = await thorSwap.swapBTCtoBNB(amountAfterFee);
        
        // Additional logic to handle the swap result and fees
        // ...

        res.json({ success: true, swapResult });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred during the swap');
    }
});

module.exports = router;
