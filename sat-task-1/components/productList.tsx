import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductList({ products }: { products: any[] }) {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: "repeat(auto-fit, minMax(300px, 1fr))" }}
    >
      {products.map((product) => (
        <Link
          key={product["post_id"]}
          href={product["permalink"]}
          target="_blank"
        >
          <div className="flex flex-col bg-slate-900 rounded-lg p-4 gap-4 overflow-clip h-full">
            <div className="w-full h-48 rounded bg-slate-800">
              <img
                className="w-full h-full object-contain"
                src={product["thumbnail"]}
                alt={product["post_title"]}
              />
            </div>
            <div className="flex">
              <p
                dangerouslySetInnerHTML={{ __html: product["currency_symbol"] }}
              ></p>
              <p>{product["price"]}</p>
            </div>
            <h2 key={product["post_id"]}>{product["post_title"]}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: product["attributes_html"] }}
            ></div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductList;
