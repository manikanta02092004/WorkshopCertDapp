// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// Define an async function to handle deployment
async function deploy() {
  // Obtain the MultiToken contract
  const MultiToken = await hre.ethers.getContractFactory("MultiToken");
  // Deploy the MultiToken contract
  const multiToken = await MultiToken.deploy();

  // wait for the transaction to mine
  await multiToken.waitForDeployment();

  // Log the deployed contract's address
  console.log("multiToken token deployed at:", multiToken.target);
}

deploy()
  .then(() => console.log("Deployment complete"))
  .catch((error) => console.error("Error deploying contract:", error));
