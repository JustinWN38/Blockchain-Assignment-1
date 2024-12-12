// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MediaSubscription {

    IERC20 public token;
    address public owner;
    uint256 public subscriptionFee;
    mapping(address => bool) public isSubscribed;
    event Subscribed(address indexed user, uint256 amount);
    event FeeUpdated(uint256 newFee);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor(IERC20 _token, uint256 _subscriptionFee) {
        token = _token;
        owner = msg.sender;
        subscriptionFee = _subscriptionFee;
    }

    function subscribe() external {
        require(!isSubscribed[msg.sender], "Already subscribed");
        // Transfer the subscription fee from the user to the owner
        require(token.transferFrom(msg.sender, owner, subscriptionFee), "Token transfer failed");
        isSubscribed[msg.sender] = true;
        emit Subscribed(msg.sender, subscriptionFee);
    }

    function updateFee(uint256 _newFee) external onlyOwner {
        subscriptionFee = _newFee;
        emit FeeUpdated(_newFee);
    }

}