import { useState } from "react";
import { ethers, JsonRpcSigner } from "ethers";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import contractAddress from "../contracts/address.json";
import contractABI from "../contracts/MultiToken.json";

const animatedComponents = makeAnimated();

const SelectWorkshop = ({
  address,
  setLoading,
  setStatus,
  setTransactionHash,
}) => {
  const [attended, setAttended] = useState([]);
  const [candidateAdd, setCandidateAdd] = useState("");
  const [loading, setLoadingState] = useState(false);

  const options = [
    { value: "1", label: "AR VR Workshop" },
    { value: "2", label: "Web3 Workshop" },
    { value: "3", label: "Unity Workshop" },
    { value: "4", label: "React Workshop" },
    { value: "5", label: "NodeJS Workshop" },
  ];

  const sendNFTs = async (ids, amounts, receiverMsg) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = new JsonRpcSigner(provider, address);

    const contract = new ethers.Contract(
      contractAddress.MultiToken,
      contractABI.abi,
      signer
    );

    try {
      setStatus("Waiting for receiver to sign...");
      await window.ethereum.request({
        method: "personal_sign",
        params: [receiverMsg, address],
      });

      setStatus("Sending NFTs...");
      const transaction = await contract.mintBatch(
        candidateAdd,
        ids,
        amounts,
        "0x00"
      );

      const txHash = transaction.hash;
      console.log("Transaction Hash:", txHash);

      const receipt = await transaction.wait();
      setTransactionHash(txHash);
      setStatus("NFTs sent successfully!");
      setLoading(false);
      setAttended([]);
      setCandidateAdd("");
      console.log("Transaction Receipt:", receipt);
    } catch (error) {
      console.error("Error occurred while sending NFTs:", error);
      setStatus(
        error.code === 4001
          ? "Receiver refused to accept"
          : "Transaction failed. Please try again."
      );
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingState(true);

    if (!ethers.isAddress(candidateAdd)) {
      setStatus("Invalid Ethereum address");
      setLoading(false);
      setLoadingState(false);
      return;
    }

    const labels = attended.map((w) => w.label).toString();
    const receiverMsg = `You are receiving NFTs for ${labels} for attending them. Do you confirm?`;
    const ids = attended.map((w) => w.value);
    const amounts = Array(ids.length).fill(1);

    sendNFTs(ids, amounts, receiverMsg);
  };

  return (
    <>
      <form className="frm" onSubmit={handleSubmit}>
        <h4>Select attended workshops</h4>
        <input
          type="text"
          placeholder="Enter candidate address"
          value={candidateAdd}
          onChange={(e) => setCandidateAdd(e.target.value)}
          required
        />
        <Select
          placeholder="Select attended workshops"
          options={options}
          isMulti
          value={attended}
          onChange={(selected) => setAttended(selected)}
          components={animatedComponents}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: "#1a1a1a",
              color: "white",
              borderColor: state.isFocused ? "#646cff" : "transparent",
              textAlign: "left",
              paddingLeft: "10px",
              ":hover": {
                borderColor: "#646cff",
              },
            }),
            option: (styles) => ({
              ...styles,
              backgroundColor: "#1a1a1a",
              borderBottom: "1px solid #646cff",
              ":hover": {
                backgroundColor: "#22255b",
              },
            }),
            menu: (styles) => ({
              ...styles,
              backgroundColor: "#1a1a1a",
            }),
            multiValue: (styles) => ({
              ...styles,
              backgroundColor: "#1a1a1a",
              border: "1px solid orange",
            }),
            multiValueLabel: (styles) => ({
              ...styles,
              color: "orange",
            }),
          }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send certificates"}
        </button>
      </form>
    </>
  );
};

export default SelectWorkshop;
cd