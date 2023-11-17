const express = require('express');
const axios = require('axios');
const { ethers } = require('ethers');
const app = express();
app.use(express.json());

const THORSWAP_API_URL = 'https://api.thorswap.com';
const BSC_NODE_URL = 'https://bsc-dataseed.binance.org/';
const PANCAKESWAP_ROUTER_ADDRESS = '...'; // PancakeSwap Router address
const routerABI = require('./routerABI.json'); // PancakeSwap Router ABI

// Setup provider and wallet
const provider = new ethers.providers.JsonRpcProvider(BSC_NODE_URL);
const wallet = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);

// Create PancakeSwap Router contract instance
const routerContract = new ethers.Contract(PANCAKESWAP_ROUTER_ADDRESS, routerABI, wallet);

// Endpoint for swapping BTC to a specific token
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

        // Step 2: Swap BSC token to desired token on PancakeSwap
        const amountIn = ethers.utils.parseUnits('1', 'ether'); // Example amount
        const amountOutMin = 0; // Set minimum amount of tokens to receive
        const path = ['BNB_ADDRESS', tokenAddress]; // Swap path (BNB to desired token)
        const to = 'RECIPIENT_ADDRESS'; // Address receiving the output tokens
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20-minute deadline

        const tx = await routerContract.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            to,
            deadline
        );

        const receipt = await tx.wait();
        res.json({ success: true, txHash: receipt.transactionHash });
    } catch (error) {
        console.error('Error in swap:', error);
        res.status(500).send('Error occurred during the swap');
    }
});

// New endpoint to swap a Token to BTC
app.post('/swapTokentoBTC', async (req, res) => {
    const { tokenAmount, tokenAddress } = req.body;

    try {
        // Step 1: Swap Token to BSC (BNB) on PancakeSwap
        const amountIn = ethers.utils.parseUnits(tokenAmount.toString(), 'ether');
        const amountOutMin = 0; // Set minimum amount of BNB to receive
        const path = [tokenAddress, 'BNB_ADDRESS']; // Swap path (token to BNB)
        const to = 'YOUR_WALLET_ADDRESS'; // Address receiving BNB
        const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

        const swapTx = await routerContract.swapExactTokensForTokens(
            amountIn,
            amountOutMin,
            path,
            to,
            deadline
        );

        await swapTx.wait(); // Wait for the swap to be mined

        // Step 2: Swap BSC (BNB) to BTC using ThorSwap
        const bnbAmount = ethers.utils.formatUnits(swapTx.value, 'ether');
        const thorSwapResponse = await axios.post(`${THORSWAP_API_URL}/swap`, {
            fromChain: 'BSC',
            toChain: 'BTC',
            amount: bnbAmount,
            // Other necessary details
        });

        res.json({ success: true, txHash: thorSwapResponse.data.txHash });
    } catch (error) {
        console.error('Error in swap:', error);
        res.status(500).send('Error occurred during the swap');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
