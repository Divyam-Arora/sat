"use client";

import HelperItem from "@/components/HelperItem";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_ENDPOINT } from "@/lib/utils";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [helpers, setHelpers] = useState([]);

  const getHelpers = useCallback(() => {
    fetch(API_ENDPOINT, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setHelpers(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getHelpers();
  }, [getHelpers]);
  return (
    <div className="p-4">
      <div className="flex gap-4 items-center justify-between mb-4 pb-2 border-b-2 border-slate-300">
        <h1 className="text-2xl">Helpers</h1>
        <Link href={"/add"}>
          <Button>Add</Button>
        </Link>
      </div>
      <ul
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minMax(300px, 1fr))",
        }}
      >
        {helpers.map((helper) => (
          <li key={helper["id"]}>
            <HelperItem helper={helper} refresh={getHelpers} />
          </li>
        ))}
      </ul>
    </div>
  );
}
