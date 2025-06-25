import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    // app/page.tsx
    <div className="space-y-4 text-center">
      <h1 className="text-3xl font-bold text-gray-800">Tailwind + shadcn/ui Test</h1>
      <Button>Shadcn Button</Button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Tailwind Button
      </button>
    </div>
  );
}
