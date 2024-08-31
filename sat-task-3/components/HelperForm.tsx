"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Checkbox } from "./ui/checkbox";

function HelperForm({
  initialData,
  action,
}: {
  initialData?: any;
  action: Function;
}) {
  //   const [available, setAvailable] = useState(initialData["available"]);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: { [key: string]: any } = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    );
    data["cost"] = +data["cost"];
    data["available"] = data["available"] == "on" ? true : false;
    data["helper_type"] = +data["helper_type"];
    // console.log(data);
    action(data);
  };
  return (
    <form onSubmit={(e) => submitHandler(e)} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="helper-name">Name</Label>
        <Input
          required
          name="name"
          placeholder="Enter name"
          defaultValue={initialData?.["name"]}
          id="helper-name"
          type="text"
        />
      </div>
      <div>
        <Label htmlFor="helper-description">Description</Label>
        <Textarea
          name="description"
          placeholder="Enter description"
          defaultValue={initialData?.["description"]}
          id="helper-description"
        />
      </div>
      <div>
        <Label htmlFor="helper-cost">Cost</Label>
        <Input
          required
          name="cost"
          placeholder="Enter cost"
          defaultValue={initialData?.["cost"]}
          id="helper-cost"
          type="number"
        />
      </div>
      <div>
        <Label htmlFor="helper-address">Address</Label>
        <Input
          required
          name="address"
          placeholder="Enter address"
          defaultValue={initialData?.["address"]}
          id="helper-address"
          type="text"
        />
      </div>
      <div>
        <Label htmlFor="helper-phone">Phone</Label>
        <Input
          required
          name="phone"
          placeholder="Enter phone"
          defaultValue={initialData?.["phone"]}
          id="helper-phone"
          type="tel"
          maxLength={9999999999}
        />
      </div>
      <div>
        <Label htmlFor="helper-zipcode">Zipcode</Label>
        <Input
          required
          name="zipcode"
          placeholder="Enter zipcode"
          defaultValue={initialData?.["zipcode"]}
          id="helper-zipcode"
          type="number"
          max={999999}
          min={100000}
        />
      </div>

      <div>
        <Label htmlFor="helper-helper-type">Helper type</Label>
        <Input
          required
          name="helper_type"
          placeholder="Enter helper type"
          defaultValue={initialData?.["helper_type"]}
          id="helper-type"
          type="number"
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="helper-available"
          name="available"
          defaultChecked={initialData?.["available"]}
        />
        <Label htmlFor="helper-available">Available</Label>
      </div>
      <div className="flex justify-end">
        <Button>Submit</Button>
      </div>
    </form>
  );
}

export default HelperForm;
