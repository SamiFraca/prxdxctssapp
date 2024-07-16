"use client";

import React, { useContext, useEffect } from "react";
import { useProductContext } from "../context/ProductsContext";

export type ProductListProps = {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
};

export const ProductList = () => {
  const { setProducts, products } = useProductContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products.json");
        const data: ProductListProps[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  return (
    <div className="w-full px-4">
      <ul className="flex w-full gap-12 px-4 mt-4">
        <li className="w-1/5">Id</li>
        <li className="w-1/5">Name</li>
        <li className="w-1/5">Category</li>
        <li className="w-1/5">Price</li>
        <li className="w-1/5">Available</li>
      </ul>
      <div className="w-full px-4 mt-4">
        {products.map((product) => (
          <ul key={product.id} className="flex w-full gap-12 items-center py-2">
            <li className="w-1/5 text-base">{product.id}</li>
            <li className="w-1/5 text-base">{product.name}</li>
            <li className="w-1/5 text-base">{product.category}</li>
            <li className="w-1/5 text-base">{product.price}$</li>
            <li
              className={`w-1/5 text-base ${
                product.available ? "text-green-500" : "text-red-500"
              }`}
            >
              {product.available ? "Available" : "Not available"}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};