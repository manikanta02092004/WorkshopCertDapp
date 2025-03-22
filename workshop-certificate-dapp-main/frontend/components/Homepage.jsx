import { ethers } from "ethers";
import { useState } from "react";

import contractAddress from "../contracts/contract-address.json";
import contractABI from "../contracts/MultiToken.json";

const Homepage = () => {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState(""); // Status message for user feedback

  const handleClick = () => {
    if (ethers.utils.isAddress(address)) {
      mintCertificate();
    } else {
      setStatus("Invalid Ethereum address.");
    }
  };

  const mintCertificate = async () => {
    try {
      setStatus("Connecting to blockchain...");

      // Load provider and signer
      const provider = new ethers.providers.WebSocketProvider(
        "wss://eth-sepolia.g.alchemy.com/v2/sj00u9Wp2Jl5XEJSy9euqCiexoVwgbIR"
      );
      const wallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY); // Use environment variable
      const signer = wallet.connect(provider);

      // Load contract
      const contract = new ethers.Contract(
        contractAddress.MultiToken,
        contractABI.abi,
        signer
      );

      // Mint the certificate
      setStatus("Minting certificate...");
      const transaction = await contract.mint(address, 1, 1, "0x00");

      // Wait for confirmation
      await transaction.wait();

      // Success
      setStatus(`Certificate minted successfully! Transaction Hash: ${transaction.hash}`);
      console.log("Transaction Receipt:", transaction);
    } catch (error) {
      console.error("Error during minting:", error);
      setStatus("Error during minting: " + error.message);
    }
  };

  return (
    <>
      <h1>Souls Workshop</h1>
      <input
        type="text"
        placeholder="Enter recipient address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleClick}>Mint Certificate</button>
      <p>{status}</p>
    </>
  );
};

export default Homepage;
