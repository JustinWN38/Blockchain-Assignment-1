async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    
    // Deploy ERC20 Mock token
    const Token = await ethers.getContractFactory("ERC20Mock");
    const token = await Token.deploy();
    await token.deployed();

    // Deploy MediaSubscription contract
    const subscriptionFee = ethers.utils.parseEther("1");
    const MediaSubscription = await ethers.getContractFactory("MediaSubscription");
    const mediaSubscription = await MediaSubscription.deploy(token.address, subscriptionFee);
    await mediaSubscription.deployed();

    console.log("MediaSubscription deployed to:", mediaSubscription.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
