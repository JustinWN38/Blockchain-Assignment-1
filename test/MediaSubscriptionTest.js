const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MediaSubscription", function () {
    let mediaSubscription, mockToken, owner, user;

    beforeEach(async function () {
        // Deploy the mock token
        const Token = await ethers.getContractFactory("ERC20Mock");
        mockToken = await Token.deploy("Mock Token", "MTK", 18, ethers.utils.parseEther("1000"));
        await mockToken.deployed();

        // Deploy the MediaSubscription contract with the mock token
        const MediaSubscription = await ethers.getContractFactory("MediaSubscription");
        mediaSubscription = await MediaSubscription.deploy(mockToken.address, ethers.utils.parseEther("10"));
        await mediaSubscription.deployed();

        // Get the test accounts
        [owner, user] = await ethers.getSigners();
    });

    it("should allow a user to subscribe", async function () {
        // Transfer tokens to the user
        await mockToken.transfer(user.address, ethers.utils.parseEther("50"));

        // User approves the MediaSubscription contract to spend their tokens
        await mockToken.connect(user).approve(mediaSubscription.address, ethers.utils.parseEther("10"));

        // User subscribes
        await mediaSubscription.connect(user).subscribe();
        
        // Check that the user is marked as subscribed
        expect(await mediaSubscription.isSubscribed(user.address)).to.be.true;
    });
});