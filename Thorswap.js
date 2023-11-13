npm install thorswap-sdk

const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3(process.env.INFURA_URL);
const contractABI = require('../path/to/your/contractABI.json');
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

router.post('/swapBTCtoBNB', async (req, res) => {
    const { amount } = req.body;
    const feePercentage = 0.001; // 0.1%
    const feeAmount = amount * feePercentage;
    const amountAfterFee = amount - feeAmount;

    // Assuming ThorSwap SDK or API interaction
    // Perform swap logic here

    // Send fee to FeeCollector contract
    const feeCollectorContract = new web3.eth.Contract(contractABI, contractAddress);
    feeCollectorContract.methods.receive().send({
        from: 'YOUR_ACCOUNT_ADDRESS',
        value: web3.utils.toWei(feeAmount.toString(), 'ether'),
        // Additional transaction parameters
    });

    res.json({ message: 'Swap initiated', amountAfterFee });
});

module.exports = router;
