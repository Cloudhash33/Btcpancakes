async function connectWallet(swapDirection, amount) {
    // Check for MetaMask
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Connected to MetaMask.');
        } catch (error) {
            console.error('User denied account access to MetaMask:', error);
            return; // Exit the function if user denies access
        }
    } 
    // Check for WalletConnect
    else if (window.walletconnect) {
        // Implement WalletConnect logic
        // This typically involves creating a new WalletConnect instance
        // and triggering the QR code modal for connection
        // Example:
        // const walletConnect = new WalletConnect({ bridge: "https://bridge.walletconnect.org" });
        // if (!walletConnect.connected) {
        //     await walletConnect.createSession();
        // }
    } 
    else {
        console.log('No Ethereum wallet found. Install MetaMask or use WalletConnect.');
        return; // Exit the function if no wallet is detected
    }

    // Determine the endpoint based on the swap direction
    let endpoint = '';
    if (swapDirection === 'btcToBsc') {
        endpoint = '/thorswap/swapBTCtoBSC';
    } else if (swapDirection === 'bscToBtc') {
        endpoint = '/thorswap/swapBSCtoBTC';
    } else {
        console.error('Invalid swap direction');
        return; // Exit the function for invalid swap direction
    }

    // POST request to your backend
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('status').innerText = `Swap successful: ${JSON.stringify(data)}`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('status').innerText = 'Error during swap';
    });
}
