// utils/index.js

// Example utility function for common operations
function calculateFee(amount) {
    const FEE_PERCENTAGE = 0.1; // 0.1%
    return amount * (FEE_PERCENTAGE / 100);
}

module.exports = {
    calculateFee,
};
