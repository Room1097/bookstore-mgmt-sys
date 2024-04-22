"use client";
import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookDataType } from "../Stock/Stock";
import clsx from "clsx";

const formSchema = z.object({
  bookID: z.string().min(2).max(50),
  quantity: z.coerce.number(),
  supplier: z.string().min(1),
});

type options = {
  value: string;
  label: string;
};

const BuyBookForm =  () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    fetch("http://localhost:3001/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       bookId: values.bookID,
       quantity: values.quantity,
       supplier: values.supplier
      }),
    }).then((res) => {
      res.json();
    });
    window.location.reload()
  }

  const [bookData, setBookData] = useState<bookDataType[]>([]);

   useEffect(() => {
    try {
      fetch("http://localhost:3001/book")
        .then((response) => response.json())
        .then((data) => setBookData(data));
        
        console.log(bookData)
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="bookID"
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
                    {bookData.map((item: bookDataType, index: number) => (
                      <SelectItem key={index} value={item._id}>
                        <div className="capitalize">
                          {item.title}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between item-center">
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Books Purchased</FormLabel>
              <FormControl>
                <Input placeholder="Enter a Valid Qty." type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supplier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplier Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter a Valid Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default BuyBookForm;
