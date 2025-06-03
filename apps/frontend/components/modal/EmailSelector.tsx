import React, { useState } from "react";
import { SelectedActionMetadata } from "./SolanaSelector";
import { BoxBtn } from "../buttons/BoxBtn";

const EmailSelector = ({ setMetadata }: SelectedActionMetadata) => {
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  return (
    <div className="flex flex-col justify-start items-start gap-3">
      <div className="flex flex-col gap-1 w-3/4">
        <label htmlFor="email">To</label>
        <input
          id="email"
          type="text"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="p-2 rounded-md border-2 border-gray-200"
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="Body">Email-Body</label>
        <input
          id="Body"
          type="text"
          placeholder="Enter email"
          onChange={(e) => setBody(e.target.value)}
          value={body}
          className="p-2 rounded-md border-2 border-gray-200"
        />
      </div>
      <BoxBtn
        name="Submit"
        onClick={() => {
          setMetadata({ email, body });
        }}
        className="text-sm text-white bg-purple-600 hover:bg-purple-500 hover:shadow-2xl hover:shadow-purple-500"
      />
    </div>
  );
};

export default EmailSelector;
