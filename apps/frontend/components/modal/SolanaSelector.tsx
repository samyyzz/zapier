import React, { useState } from "react";
import { BoxBtn } from "../buttons/BoxBtn";

export interface SelectedActionMetadata {
  setMetadata: (params: any) => void;
}
const SolanaSelector = ({ setMetadata }: SelectedActionMetadata) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <div className="flex flex-col justify-start items-start gap-3">
      <div className="flex flex-col gap-1 w-3/4">
        <label htmlFor="Address">Wallet Address</label>
        <input
          id="Address"
          type="text"
          placeholder="Enter your solana wallet address"
          onChange={(e) => setAddress(e.target.value)}
          className="p-2 rounded-md border-2 border-gray-200"
          value={address}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="Amount">Amount</label>
        <input
          id="Amount"
          type="text"
          placeholder="Amount (eg. 1.5 SOL)"
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 rounded-md border-2 border-gray-200"
          value={amount}
        />
      </div>
      <BoxBtn
        name="Submit"
        onClick={() => {
          console.log("clicked");
          setMetadata({ address, amount });
        }}
        className="text-sm text-white bg-purple-600 hover:bg-purple-500 hover:shadow-2xl hover:shadow-purple-500"
      />
    </div>
  );
};

export default SolanaSelector;
