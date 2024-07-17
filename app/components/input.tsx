import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  additionalClassName?: string; 
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, additionalClassName, ...rest } = props;

  const combinedClassName = `border border-gray-300 border-opacity-70 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent ${
    additionalClassName || ""
  }`;

  return (
    <input
      ref={ref}
      className={combinedClassName.trim()} 
      {...rest} 
    />
  );
});

Input.displayName = "Input";

export default Input;
