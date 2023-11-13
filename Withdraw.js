const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const web3 = new Web3(process.env.INFURA_URL);
const contractABI = require('../path/to/your/contractABI.json');
const contractAddress = 'YOUR_CONTRACT_ADDRESS';

router.post('/withdrawFees', async (req, res) => {
    const { recipient, amount } = req.body;

    const feeCollectorContract = new web3.eth.Contract(contractABI, contractAddress);

    try {
        // Ensure the caller is authorized to perform the withdrawal

        // Call the withdrawFees method of the FeeCollector contract
        await feeCollectorContract.methods.withdrawFees(recipient, amount).send({
            from: 'YOUR_ACCOUNT_ADDRESS',
            // Additional transaction parameters
        });

        res.json({ message: 'Fees withdrawn successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error during fee withdrawal');
    }
});

module.exports = router;
