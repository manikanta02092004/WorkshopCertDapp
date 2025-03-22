import Metamask from "../components/Metamask";
import { useState } from "react";
import { BallTriangle } from "react-loader-spinner";

import "./App.css";
import SelectWorkshop from "../components/SelectWorkshop";

function App() {
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  return (
    <>
      <h1>WISH Learnings</h1>
      <Metamask
        setMetamaskConnected={setMetamaskConnected}
        setAddress={setAddress}
      />
      {loading ? (
        <>
          <BallTriangle
            height={50}
            width={50}
            radius={5}
            color="orange"
            ariaLabel="ball-triangle-loading"
            wrapperClass="loader"
            wrapperStyle=""
            visible={true}
          />
          <p className="orange">{status}</p>
        </>
      ) : (
        metamaskConnected &&
        (transactionHash === "" ? (
          <SelectWorkshop
            address={address}
            setLoading={setLoading}
            setStatus={setStatus}
            setTransactionHash={setTransactionHash}
          />
        ) : (
          <h4 className="green">Transaction Hash: {transactionHash}</h4>
        ))
      )}
    </>
  );
}

export default App;
