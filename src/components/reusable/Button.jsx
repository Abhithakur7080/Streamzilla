import React from "react";

const Button = ({ children, type = "button", className = "", ...props }) => {
  return (
    <button
      type={type}
      className={`${className} hover:scale-100 duration-200 ease-in`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
