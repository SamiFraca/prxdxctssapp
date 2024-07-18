// app/products/[id]/page.tsx
import React from "react";

interface ProductPageProps {
  params: {
    id: string;
  };
  searchParams: {
    name: string;
    category: string;
  };
}

const ProductPage = async ({ params, searchParams }: ProductPageProps) => {
  const { id } = params;
  const { name, category } = searchParams;
  console.log(searchParams);

  return (
    <div>
      <h1>Product Page</h1>
      <p>Product ID: {id}</p>
      <p>Product Name: {name}</p>
      <p>Product category: {category}</p>
    </div>
  );
};

export default ProductPage;
