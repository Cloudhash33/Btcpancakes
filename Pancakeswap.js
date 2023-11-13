npm install web3
const express = require('express');
const router = express.Router();
const Web3 = require('web3');

// Configure Web3 with a BSC node
const web3 = new Web3('https://bsc-dataseed.binance.org/');

router.post('/swapBNBtoToken', async (req, res) => {
    const { amount, tokenAddress } = req.body; // amount in BNB, address of the token to swap to

    try {
        // Logic to interact with PancakeSwap Router Contract for the swap
        // Note: This is complex and involves interacting with a smart contract,
        // creating and signing transactions, etc.

        res.json({ success: true, message: 'Swap executed' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred during the swap');
    }
});

module.exports = router;
