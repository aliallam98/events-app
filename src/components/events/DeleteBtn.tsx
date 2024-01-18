"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteEventById } from "@/lib/actions/event.actions";
import { Trash } from "lucide-react";
import { useTransition } from "react";

interface IProps {
  id: string;
}
const DeleteBtn = ({ id }: IProps) => {
  const [isPending, startTransition] = useTransition();
  const onDeleteHandler = async () => {
    await deleteEventById(id);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="p-1 bg-neutral-300/50 rounded-lg">
        <Trash  size={18} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center mb-2">
            Are You Sure That You Want To Delete This Event ?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => startTransition(onDeleteHandler)}>
            {isPending ? "Deleting" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBtn;
