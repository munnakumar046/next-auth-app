"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

// create post
export async function createPost(data: { title: string; content?: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        published: true,
        authorId: session.user.id,
      },
    });

    revalidatePath("/dashboard/posts");
    return { success: true, data: newPost };
  } catch (error: any) {
    return {
      success: false,
      error: "Failed to create post: " + error?.message,
    };
  }
}

// get single post
export async function getPost(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return { success: false, error: "Post not found" };
    }

    return { success: true, data: post };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to fetch post.",
    };
  }
}

// update post
export async function updatePost(
  postId: string,
  data: { title: string; content?: string },
) {
  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title: data.title,
        content: data.content,
      },
    });

    revalidatePath("/dashboard/posts");
    return { success: true, data: updatedPost };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to update post.",
    };
  }
}

// delete post
export async function deletePost(postId: string) {
  try {
    await prisma.post.delete({
      where: { id: postId },
    });

    revalidatePath("/dashboard/posts");
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to delete post.",
    };
  }
}
