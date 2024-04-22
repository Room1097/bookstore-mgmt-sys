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
import BuyBookForm from "./BuyBookForm";

const BuyBook = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type==="buyBook";
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
        <BuyBookForm />
      </DialogContent>
    </Dialog>
  );
};

export default BuyBook;
