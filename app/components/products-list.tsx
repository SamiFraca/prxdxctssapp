"use client";

import React, { useEffect } from "react";
import { useProductContext } from "../context/ProductsContext";
import Link from "next/link";

export type ProductListProps = {
  id: number;
  name: string;
  category: string;
  price: number;
  available: boolean;
  isVisible: boolean;
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
    <div className="w-full px-4 flex flex-col flex-wrap overflow-auto">
      <ul className="flex w-full gap-12 px-4 mt-4">
        <li className="w-1/5">Id</li>
        <li className="w-1/5">Name</li>
        <li className="w-1/5">Category</li>
        <li className="w-1/5">Price</li>
        <li className="w-1/5">Available</li>
      </ul>
      <div className="w-full px-4 mt-4">
        {products.map((product) => (
          <ul
            key={product.id}
            className={`flex w-full  gap-12 items-center py-2 ${
              product.isVisible ? "" : "hidden"
            }`}
          >
            <li className="md:w-1/5 md:text-base">{product.id}</li>
            <li className="md:w-1/5 md:text-base">
              <Link
                key={product.id}
                href={{
                  pathname: `/products/${product.id}`,
                  query: {
                    name: product.name,
                    category: product.category,
                  },
                }}
              >
                {product.name}
              </Link>
            </li>
            <li className="md:w-1/5 md:text-base">{product.category}</li>
            <li className="md:w-1/5 md:text-base">{product.price}$</li>
            <li
              className={`md:w-1/5 text-base ${
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
