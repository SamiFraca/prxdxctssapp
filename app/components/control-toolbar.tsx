"use client";
import Input from "./input";
import { useProductContext } from "../context/ProductsContext";

export const ControlToolbar = () => {
  const { setProducts, products } = useProductContext();

  const handleNameFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    
  };
  return (
    <div className="flex flex-col gap-4">
      <Input type="text" placeholder="Name" onChange={handleNameFilter} />
    </div>
  );
};
