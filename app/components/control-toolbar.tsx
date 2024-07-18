"use client";
import React, { useState, useEffect } from "react";
import Input from "./input";
import { useProductContext } from "../context/ProductsContext";
import { DropdownMenu } from "./dropdown";
import Image from "next/image";
import ArrowIcon from "@/public/up-arrow-svgrepo-com.svg";

export const ControlToolbar = () => {
  const { setProducts, products } = useProductContext();
  const [nameFilter, setNameFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [sortByFilter, setSortByFilter] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    applyFilters();
  }, [nameFilter, availabilityFilter, sortByFilter, sortDirection]);

  const handleNameFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value.toLowerCase());
  };

  const handleAvailabilityFilter = (selectedOption: string) => {
    setAvailabilityFilter(selectedOption);
  };

  const handleSortByFilter = (selectedOption: string) => {
    setSortByFilter(selectedOption);
  };

  const applyFilters = () => {
    let filteredProducts = products;

    if (nameFilter) {
      filteredProducts = filteredProducts.map((product) => ({
        ...product,
        isVisible: product.name.toLowerCase().includes(nameFilter),
      }));
    } else {
      filteredProducts = filteredProducts.map((product) => ({
        ...product,
        isVisible: true,
      }));
    }

    if (availabilityFilter !== "All") {
      const available = availabilityFilter === "Available";
      filteredProducts = filteredProducts.map((product) => ({
        ...product,
        isVisible: product.isVisible && available === product.available,
      }));
    }
    if (sortByFilter !== null) {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (sortByFilter === "Name") {
          return sortDirection === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sortByFilter === "Price") {
          return sortDirection === "asc"
            ? a.price - b.price
            : b.price - a.price;
        } else if (sortByFilter === "Id") {
          return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
        }
        return 0;
      });
    }

    setProducts(filteredProducts);
  };

  return (
    <div className="flex flex-col lg:flex-row  gap-4 lg:items-center w-full my-4 lg:justify-center justify-start items-start ">
      <Input type="text" placeholder="Name" additionalClassName="ml-8" onChange={handleNameFilter} />
      <div className="flex gap-4 lg:grow justify-end px-4 lg:w-full ml-4">
        <DropdownMenu
          options={["All", "Available", "Not Available"]}
          onSelect={handleAvailabilityFilter}
        />
        <DropdownMenu
          options={["Id", "Name", "Price"]}
          onSelect={handleSortByFilter}
          placeholder="Sort By"
        />
        <button
          onClick={() =>
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
          }
          aria-label="Sort direction"
          title="Change sort direction"
        >
          <Image
            src={ArrowIcon}
            className={`rotate-${
              sortDirection === "asc" ? 0 : 180
            } transition-transform`}
            alt={sortDirection}
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
};
