import { useSDK } from "@metamask/sdk-react";
import { useState, useEffect } from "react";

const Metamask = ({ setMetamaskConnected, setAddress }) => {
  const [account, setAccount] = useState(null);
  const [buttonText, setButtonText] = useState("Connect");
  const [statusMessage, setStatusMessage] = useState(""); // For user feedback
  const { sdk, connected, chainId } = useSDK();

  const connect = async () => {
    try {
      setStatusMessage("Connecting to MetaMask...");
      const accounts = await sdk?.connect();
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        setAddress(accounts[0]); // Pass the connected account to the parent
        setMetamaskConnected(true); // Notify parent of successful connection
        setButtonText("Metamask Connected");
        setStatusMessage("Successfully connected!");
      } else {
        setStatusMessage("No accounts found.");
      }
    } catch (err) {
      console.error("Failed to connect to MetaMask:", err);
      setStatusMessage("Failed to connect. Please try again.");
    }
  };

  useEffect(() => {
    if (connected && account) {
      setStatusMessage("Already connected!");
      setButtonText("Metamask Connected");
    }
  }, [connected, account]);

  return (
    <div className="metamask-container">
      <button
        className={buttonText === "Connect" ? "connect-button" : "connected-button"}
        onClick={connect}
        disabled={buttonText === "Metamask Connected"}
      >
        {buttonText}
      </button>
      <div className="connection-status">
        {statusMessage && <p>{statusMessage}</p>}
        {connected && (
          <div>
            <p>Connected chain: {chainId || "Unknown"}</p>
            <p>Connected account: {account || "None"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Metamask;
