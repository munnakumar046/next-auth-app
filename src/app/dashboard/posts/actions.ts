"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

export async function createPost(data: any) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  try {
    const newPost = await prisma.post.create({
      data: {
        ...data,
        published: true,
        authorId: session?.user.id as string,
      },
    });
    return { success: true, data: newPost };
  } catch (error: any) {
    return {
      success: false,
      error: "Failed to create post: " + error?.message,
    };
  }
}
