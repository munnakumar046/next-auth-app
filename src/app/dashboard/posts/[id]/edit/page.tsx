"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import { updatePost, getPost } from "../../actions";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  content: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});

export default function UpdateBlogPost() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    async function fetchPostData() {
      try {
        const result = await getPost(postId);

        if (result.success && result.data) {
          form.reset({
            title: result.data.title,
            content: result.data.content ?? "",
          });
        } else {
          console.error("getPost error:", result.error);
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to fetch post data:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPostData();
  }, [postId, form]);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const post = await updatePost(postId, data);
      console.log("Updated Post:", post);
      router.push("/dashboard/posts");
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  }

  if (loading) {
    return (
      <div className="px-5 pt-6">
        <p className="text-muted-foreground">Loading post...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="px-5 pt-6">
        <p className="text-destructive">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="px-5 pt-6">
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>Update Blog</CardTitle>
          <CardDescription>Edit your Post details</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Blog Post Title
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Blog title"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-description">
                      Content
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="form-rhf-demo-description"
                        placeholder="Write your blog content here"
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value?.length || 0}/100 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <FieldDescription>
                      Keep your content engaging, break it into clear sections,
                      and remember to proofread before submitting.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="submit" form="form-rhf-demo">
              Update
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/posts")}
            >
              Cancel
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
