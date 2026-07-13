import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex gap-4">
        <div className="space-y-10">
          {/* <MarqueeDemo />
          <MarqueeGrayscaleDemo /> */}
        </div>
        <Button>
          <Link href="/signup">Sign Up</Link>
        </Button>

        <Button>
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </main>
  );
}
