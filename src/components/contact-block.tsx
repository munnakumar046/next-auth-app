"use client"

import { RiMailLine, RiMapPinLine, RiPhoneLine } from "@remixicon/react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toaster } from "@/components/ui/sonner"
import { Textarea } from "@/components/ui/textarea"

const TOPICS = ["General inquiry", "Sales", "Support", "Partnership", "Other"]

const details = [
  { icon: RiMailLine, label: "Email", value: "hello@acme.com" },
  { icon: RiPhoneLine, label: "Phone", value: "+1 (555) 012-3456" },
  {
    icon: RiMapPinLine,
    label: "Office",
    value: "100 Market St, San Francisco",
  },
]

export default function ContactBlock() {
  return (
    <section className="flex w-full items-center justify-center bg-background px-6 py-12 text-foreground">
      <Toaster />
      <div className="grid w-full max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get in touch
          </h2>
          <p className="mt-3 text-muted-foreground">
            Have a question or want to work together? Send us a message and
            we&apos;ll get back to you within one business day.
          </p>

          <ul className="mt-8 flex flex-col gap-5">
            {details.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="flex size-11 items-center justify-center border border-border bg-muted">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="font-medium">{value}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Card className="[--card-spacing:--spacing(6)]">
          <form
            className="flex flex-col gap-(--card-spacing)"
            onSubmit={(e) => {
              e.preventDefault()
              toast.success("Message sent. We'll be in touch shortly.")
            }}
          >
            <CardHeader>
              <CardTitle className="text-base">Send a message</CardTitle>
              <CardDescription className="text-sm">
                Fill out the form and we&apos;ll be in touch shortly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input id="name" type="text" placeholder="Jane Doe" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="topic">Topic</FieldLabel>
                  <Select name="topic">
                    <SelectTrigger id="topic" className="w-full">
                      <SelectValue placeholder="Select a topic…" />
                    </SelectTrigger>
                    <SelectContent>
                      {TOPICS.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="How can we help?"
                  />
                </Field>
              </FieldGroup>
            </CardContent>
            <CardFooter className="border-t-0 pt-0">
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </section>
  )
}
