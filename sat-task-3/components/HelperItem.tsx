import { useState } from "react";
import HelperForm from "./HelperForm";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { API_ENDPOINT } from "@/lib/utils";

function HelperItem({ helper, refresh }: { helper: any; refresh: Function }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const editHandler = (data: any) => {
    fetch(API_ENDPOINT, {
      method: "PATCH",
      body: JSON.stringify({ ...data, id: helper.id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        refresh();
        setIsEdit(false);
      })
      .catch((err) => console.log(err));
  };

  const deleteHandler = () => {
    fetch(API_ENDPOINT, {
      method: "DELETE",
      body: JSON.stringify({ id: helper.id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        refresh();
        setIsDelete(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{helper["name"]}</CardTitle>
        <CardDescription>{helper["description"]}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-2">
          <p className="text-right font-semibold">Cost</p>
          <p className="col-start-2 -col-end-1">{helper["cost"]}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-right font-semibold">Address</p>
          <p className="col-start-2 -col-end-1">{helper["address"]}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-right font-semibold">Phone</p>
          <p className="col-start-2 -col-end-1">{helper["phone"]}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-right font-semibold">Zipcode</p>
          <p className="col-start-2 -col-end-1">{helper["zipcode"]}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-right font-semibold">Available</p>
          <p className="col-start-2 -col-end-1">
            {helper["available"] ? "Yes" : "No"}
          </p>
        </div>
        <div className="flex gap-2">
          <p className="text-right font-semibold">Helper type</p>
          <p className="col-start-2 -col-end-1">{helper["helper_type"]}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Dialog onOpenChange={setIsEdit} open={isEdit}>
          <DialogTrigger asChild>
            <Button>Edit</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Helper</DialogTitle>
            </DialogHeader>
            <HelperForm action={editHandler} initialData={helper} />
          </DialogContent>
        </Dialog>
        <Dialog onOpenChange={setIsDelete} open={isDelete}>
          <DialogTrigger asChild>
            <Button>Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Helper</DialogTitle>
            </DialogHeader>
            Are you sure you want to delete helper {helper.name}?
            <DialogFooter>
              <Button onClick={deleteHandler}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}

export default HelperItem;
