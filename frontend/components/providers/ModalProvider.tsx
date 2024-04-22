"use client"

import { useEffect, useState } from "react"
import CreateBook from "../CreateBook/CreateBook";

export const ModalProvider = ()=>{
    const [isMounted,setIsMounted]=useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[]);
    if(!isMounted){
        return null;
    }
    return(
        <>
        <CreateBook/>
        </>
    )
}