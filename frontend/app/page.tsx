import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Button className="active:scale-95">Hello World!!</Button>
      <h1>Initial Setup</h1>
    </div>
  );
}
