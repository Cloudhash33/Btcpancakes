const Web3 = require('web3');

class BlockchainService {
    constructor() {
        this.web3 = new Web3(process.env.INFURA_URL); // or any Ethereum node URL
    }

    async getBalance(address) {
        return await this.web3.eth.getBalance(address);
    }

    // Add more functions as needed, such as for sending transactions, interacting with smart contracts, etc.
}

module.exports = new BlockchainService();
