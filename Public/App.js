async function connectWallet() {
    if (window.ethereum) { // For MetaMask
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected to MetaMask.');
        } catch (error) {
            console.error('User denied account access to MetaMask:', error);
        }
    } else if (window.walletconnect) { // For WalletConnect
        // Implement WalletConnect logic
    } else {
        console.log('No Ethereum wallet found. Install MetaMask or use WalletConnect.');
    }

    // Example: POST request to your backend
    fetch('/thorswap/swapBTCtoBSC', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('status').innerText = 'Swap successful: ' + JSON.stringify(data);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('status').innerText = 'Error during swap';
    });
}
