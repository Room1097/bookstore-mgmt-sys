"use client";
import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { z } from "zod";
import { Description } from "@radix-ui/react-dialog";
import CreateBookForm from "./CreateBookForm";
const bookSchema = z.object({
   name: z.string().min(1,{message:"Book name is required"}),


})
const CreateBook = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type==="createBook";
  const handleClose = ()=>{
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
       <DialogHeader>
        <DialogTitle className=" text-center">
            Fill in the Book details
        </DialogTitle>
       </DialogHeader>
        <CreateBookForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateBook;
