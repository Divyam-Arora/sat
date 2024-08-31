"use client";

import HelperForm from "@/components/HelperForm";
import { API_ENDPOINT } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

function AddHelper() {
  const router = useRouter();
  const addNewHandler = (data: any) => {
    fetch(API_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => router.replace("/"))
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 border-b-2 border-slate-300 pb-2">
        Add Helper
      </h1>
      <div className="max-w-96 mx-auto">
        <HelperForm action={addNewHandler} />
      </div>
    </div>
  );
}

export default AddHelper;
