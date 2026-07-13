import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen bg-neutral-950 text-white">
      <div className="flex gap-4">
        <Button className="bg-white text-black font-medium px-6 py-2 rounded-md hover:bg-gray-200">
          <Link href="/signup">Sign Up</Link>
        </Button>

        <Button className="border border-white text-white font-medium px-6 py-2 rounded-md hover:bg-neutral-800">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </main>
  );
}
