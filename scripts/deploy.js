async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const MyContract = await ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy();
  
  await myContract.deployed();  // Wait until the contract is fully deployed
  
  console.log("MyContract deployed to:", myContract.address);
  
  return myContract;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
