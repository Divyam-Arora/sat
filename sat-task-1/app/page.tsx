"use client";

import FilterContainer from "@/components/filterContainer";
import ProductList from "@/components/productList";
import Image from "next/image";
import { useEffect, useState } from "react";
import products from "../data/products.json";

export default function Home() {
  const [activeFilters, setActiveFilters] = useState<[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const setFilters = (values: []) => {
    setActiveFilters(values);
  };

  useEffect(() => {
    if (!activeFilters.length) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => {
          for (let filter of activeFilters) {
            if (
              !product.taxonomies[filter[0]] ||
              !(product.taxonomies[filter[0]] as []).includes(filter[1])
            ) {
              return false;
            }
          }
          return true;
        })
      );
    }
  }, [activeFilters]);

  return (
    <main className="grid grid-cols-4 pt-4 gap-4">
      <FilterContainer action={setFilters} />
      <div className="col-start-2 -col-end-1">
        <ProductList products={filteredProducts} />
      </div>
    </main>
  );
}
