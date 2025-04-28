import React from "react";
import MyZapUtils from "./MyZapUtils";
import MyZaps from "./MyZaps";

const Main = () => {
  return (
    <div className="flex flex-col mx-6 mt-14 gap-4">
      <MyZapUtils />
      <MyZaps />
    </div>
  );
};

export default Main;
