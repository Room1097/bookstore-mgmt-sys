"use client";

import { useEffect, useState } from "react";
import CreateBook from "../CreateBook/CreateBook";
import BuyBook from "../BuyBook/BuyBook";
import SellBook from "../SellBook/SellBook";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateBook />
      <BuyBook />
      <SellBook />
    </>
  );
};
