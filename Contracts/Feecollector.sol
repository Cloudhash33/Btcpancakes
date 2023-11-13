
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FeeCollector {
    address public owner;
    uint256 public feeBalance;

    constructor() {
        owner = msg.sender;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {
        feeBalance += msg.value;
    }

    // Function to withdraw the fees
    function withdrawFees(address payable recipient, uint256 amount) external {
        require(msg.sender == owner, "Only owner can withdraw fees");
        require(amount <= feeBalance, "Insufficient balance");

        feeBalance -= amount;
        recipient.transfer(amount);
    }
}
