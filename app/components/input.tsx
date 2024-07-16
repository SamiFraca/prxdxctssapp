import React from "react";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      className="border border-gray-300 border-opacity-70 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
      {...props}
    />
  );
});
Input.displayName = "Input";
export default Input;
