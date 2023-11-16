const express = require('express');
const axios = require('axios');
const { ethers } = require('ethers');
const app = express();
app.use(express.json());

const THORSWAP_API_URL = 'https://api.thorswap.com'; // ThorSwap API URL
const BSC_NODE_URL = 'https://bsc-dataseed.binance.org/'; // BSC Node URL
const PANCAKESWAP_ROUTER_ADDRESS = '...'; // PancakeSwap Router address
const routerABI = require('./routerABI.json'); // PancakeSwap Router ABI

// Setup provider and wallet
const provider = new ethers.providers.JsonRpcProvider(BSC_NODE_URL);
const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider); // Be cautious with private key management

// Create PancakeSwap Router contract instance
const routerContract = new ethers.Contract(PANCAKESWAP_ROUTER_ADDRESS, routerABI, wallet);

app.post('/swapBTCtoToken', async (req, res) => {
    const { btcAmount, tokenAddress } = req.body;

    try {
        // Step 1: Swap BTC to BSC using ThorSwap
        const thorSwapResponse = await axios.post(`${THORSWAP_API_URL}/swap`, {
            fromChain: 'BTC',
            toChain: 'BSC',
            amount: btcAmount,
            // Other necessary details
        });

        // Wait for the transaction to complete and get BSC tokens (e.g., BNB)
        // This may involve waiting for confirmations or using an event listener

        // Step 2: Swap BSC token to desired token on PancakeSwap
        // Setup swap parameters (example with BNB to another token)
        const amountIn = ethers.utils.parseUnits('1', 'ether'); // Example amount
        const amountOutMin = 0; // Set minimum amount of tokens to receive
        const path = ['BNB_ADDRESS', tokenAddress]; // Swap path (BNB to desired token)
        const to = 'RECIPIENT_ADDRESS'; // Address receiving the output tokens
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20-minute deadline

        // Perform the swap on PancakeSwap
        const tx = await routerContract.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            to,
            deadline
        );

        const receipt = await tx.wait(); // Wait for the transaction to be mined
        res.json({ success: true, txHash: receipt.transactionHash });
    } catch (error) {
        console.error('Error in swap:', error);
        res.status(500).send('Error occurred during the swap');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
