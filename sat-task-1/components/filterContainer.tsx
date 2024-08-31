"use client";

import React, { ReactNode, useMemo, useRef, useState } from "react";
import products from "../data/products.json";

const GET_FILTERS = () => {
  let filters: { [key: string]: Set<string> } = {};
  products.forEach((product) => {
    Object.entries(product.taxonomies).map(([k, v]) => {
      if (filters[k]) {
        filters[k] = new Set([...filters[k], ...v]);
      } else {
        filters[k] = new Set(v);
      }
    });
  });
  return Object.entries(filters).map(([k, v]) => ({
    title: k,
    values: v,
  }));
};

type props = {
  // children?: ReactNode,
  action: Function;
};

function FilterContainer({ action }: props) {
  const [isOpen, setIsOpen] = useState(false);
  const filters = useMemo(() => GET_FILTERS(), []);
  const formRef = useRef<any>();

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    console.log([...data.entries()]);
    action(Array.from(data.entries()));
  };

  return (
    <div className="sticky top-0 h-screen overflow-y-auto bg-slate-800 rounded-lg p-4 flex flex-col gap-4">
      <h1>Filters</h1>
      <div className="flex justify-between">
        <button
          className="border border-white rounded px-4 py-1"
          onClick={() => {
            action([]);
            formRef.current.reset();
          }}
        >
          clear all
        </button>
        <button
          className="border border-white rounded px-4 py-1"
          type="button"
          onClick={() => setIsOpen((s) => !s)}
        >
          close/open all
        </button>
      </div>
      <form onChange={(e) => handleChange(e)} ref={formRef}>
        {filters.map((filter) => (
          <details key={filter.title} open={isOpen}>
            <summary>{filter.title.slice(3)}</summary>
            {Array.from(filter.values).map((value) => (
              <div key={value}>
                <input
                  id={filter.title + value}
                  type="checkbox"
                  name={filter.title}
                  value={value}
                />
                <label htmlFor={filter.title + value}>{value}</label>
              </div>
            ))}
          </details>
        ))}
      </form>
    </div>
  );
}

export default FilterContainer;
