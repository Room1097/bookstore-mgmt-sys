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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { bookDataType } from "../Stock/Stock";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  bookId: z.string().min(2).max(50),
  quantity: z.coerce.number().positive(),
});

const SellBook = () => {
  const { isOpen, onClose, type } = useModal();
  const isModalOpen = isOpen && type==="sellBook";
  const handleClose = ()=>{
    onClose()
  }

  const [bookData, setBookData] = useState<bookDataType[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/book")
      .then((response) => response.json())
      .then((data) => setBookData(data));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookId: "",
      quantity: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    fetch("http://localhost:3001/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId: values.bookId,
        quantity: values.quantity,
      }),
    }).then((res) => {
      res.json();
    });
    onClose();
    window.location.reload();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
       <DialogHeader>
        <DialogTitle className=" text-center">
            Fill in the Book details
        </DialogTitle>
       </DialogHeader>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="bookId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Name</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Book" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bookData?.map((item: bookDataType, index: number) => (
                      <SelectItem key={index} value={item._id}>
                        <div className="capitalize">{item.title}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input placeholder="" type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SellBook;
