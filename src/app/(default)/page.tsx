import { Button } from "@/components/ui/button";
import dbConnect from "@/lib/mongodb";

import Posts from "@/models/Posts";

export default async function Home() {
  await dbConnect();

  const posts = await Posts.find();
  console.log(posts);
  return (
    <div>
      <h1>Home Page</h1>
      <Button>Click me</Button>
    </div>
  );
}
