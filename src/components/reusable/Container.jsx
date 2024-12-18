import React from "react";

const Container = ({ children }) => {
  return <div className="w-full h-[calc(100vh - 100px)] bg-gray-900">{children}</div>;
};

export default Container;
