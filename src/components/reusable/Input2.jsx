import React, { useId } from "react";

const Input2 = React.forwardRef(function Input2(
  { label, type = "text", placeholder, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={`px-3 py-2 bg-transparent text-black outline-none focus:bg-neutral-400 border border-slate-600 w-full ${className}`}
        {...props}
        ref={ref}
        id={id}
      />
    </div>
  );
});

export default Input2;
