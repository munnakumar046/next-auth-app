import prisma from "@/lib/prisma";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function PostPage() {
  const posts = await prisma.post.findMany({});

  return (
    <div className="px-6 py-8">
      <div className="flex justify-between items-center px-4 py-2 border rounded mb-4">
        <Button className="font-bold">Post Page</Button>
        <Link href="/dashboard/posts/create">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" /> Create
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow className="text-primary">
              <TableHead className="w-1/6">ID</TableHead>
              <TableHead className="w-1/6">Title</TableHead>
              <TableHead className="w-1/6">Content</TableHead>
              <TableHead className="w-1/6">Status</TableHead>
              <TableHead className="w-1/6">Author</TableHead>
              <TableHead className="w-1/6">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {posts.reverse().map((post) => (
              <TableRow key={post.id}>
                <TableCell className="w-1/6  max-width: 150px truncate">
                  {post.id}
                </TableCell>
                <TableCell className="w-1/6  max-width: 150px truncate">
                  {post.title}
                </TableCell>
                <TableCell className="w-1/6  max-width: 150px truncate">
                  {post.content ?? "No content"}
                </TableCell>
                <TableCell className="w-1/6  max-width: 150px truncate">
                  {post.published ? "✅ Published" : "❌ Draft"}
                </TableCell>
                <TableCell className="w-1/6  max-width: 150px truncate">
                  {post.authorId}
                </TableCell>
                <TableCell className="w-1/6 truncate">
                  <Link href={`/dashboard/posts/${post.id}/edit`}>
                    <Button>Edit</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
