"use client";
import React from "react";
import { ProductListProps } from "../components/products-list";

type ProductContextType = {
  products: ProductListProps[];
  setProducts: React.Dispatch<React.SetStateAction<ProductListProps[]>>;
};

export const ProductsContext = React.createContext<ProductContextType>({
  products: [],
  setProducts: () => {},
});

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = React.useState<ProductListProps[]>([]);
  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductContext = () => React.useContext(ProductsContext);
