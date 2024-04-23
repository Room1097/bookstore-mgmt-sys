'use client'

import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { useModal } from "@/hooks/use-modal-store"

const SellBookButton = () => {
    const {onOpen} = useModal()
  return (
    <div>
        <Button variant="default" onClick={()=>onOpen("sellBook")}>
        <Plus className = "h-5 w-5"/>
      </Button>
    </div>
  )
}

export default SellBookButton