import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";

const Metamask = ({ setMetamaskConnected, setAddress }) => {
  const [account, setAccount] = useState();
  const { sdk, connected, chainId } = useSDK();
  const [buttonText, setButtonText] = useState("Connect");

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
      setAddress(accounts?.[0]);
      setMetamaskConnected(true);
      setButtonText("Metamask Connected");
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  return (
    <div className="App">
      <button
        className={buttonText == "Connect" ? "" : "connected"}
        onClick={connect}
        disabled={buttonText == "Metamask Connected"}
      >
        {buttonText}
      </button>
      {connected && (
        <div>
          <>
            {chainId && `Connected chain: ${chainId}`}
            <p></p>
            {account && `Connected account: ${account}`}
          </>
        </div>
      )}
    </div>
  );
};

export default Metamask;
