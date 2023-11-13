// Example utility function for common operations

/**
 * Calculates the fee for a given amount
 * @param {Number} amount - The amount for which to calculate the fee
 * @returns {Number} - The calculated fee
 */
function calculateFee(amount) {
    const FEE_PERCENTAGE = 0.1; // 0.1%
    return amount * (FEE_PERCENTAGE / 100);
}

module.exports = {
    calculateFee,
};
const { calculateFee } = require('../utils');

// In your route
const fee = calculateFee(amount);

