"use client";

import {
  RiMenuLine,
  RiMoonLine,
  RiSunLine,
} from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import React from "react";

const navLinks = [
  { label: "Products", href: "#" },
  { label: "Solutions", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Blog", href: "#" },
];

export default function HeaderBlock() {
  const { resolvedTheme, setTheme } = useTheme();
  // Avoid a hydration mismatch: the resolved theme is only known on the
  // client, so render the server/first-paint state until mounted.
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";
  return (
    <section className="flex min-h-svh w-full flex-col bg-background text-foreground">
      <header className="relative flex h-16 w-full items-center border-b border-border px-6">
        <a href="/" className="flex shrink-0 items-center gap-2.5">
          <div className="grid grid-cols-2 gap-0.5" aria-hidden="true">
            <div className="size-2.5 bg-primary" />
            <div className="size-2.5 bg-primary" />
            <div className="size-2.5 bg-primary" />
            <div className="size-2.5 bg-primary" />
          </div>
          <span className="text-base font-bold tracking-tight">Acme</span>
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button
              key={link.label}
              render={<a href={link.href} />}
              nativeButton={false}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Button>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <Button
            render={<a href="../login " />}
            nativeButton={false}
            variant="ghost"
            size="sm"
            className="hidden hover:text-foreground bg-primary text-secondary  sm:inline-flex"
          >
            Sign In
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDark}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="rounded-2xl"
          >
            {isDark ? (
              <RiSunLine className="size-4" />
            ) : (
              <RiMoonLine className="size-4" />
            )}
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" className="md:hidden" />
              }
              aria-label="Open menu"
            >
              <RiMenuLine aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xs">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2.5">
                  <div className="grid grid-cols-2 gap-0.5" aria-hidden="true">
                    <div className="size-2 bg-primary" />
                    <div className="size-2 bg-primary" />
                    <div className="size-2 bg-primary" />
                    <div className="size-2 bg-primary" />
                  </div>
                  Acme
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col px-2">
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.label}
                    render={<a href={link.href} />}
                    nativeButton={false}
                    className="px-2 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </nav>
              <SheetFooter>
                <Button
                  render={<a href="/login" />}
                  nativeButton={false}
                  variant="ghost"
                  className="w-full bg-primary text-secondary"
                >
                  Sign In
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="flex-1 px-6 py-10">
        <div className="mx-auto w-full max-w-4xl">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-9 w-2/3 max-w-md" />
            <Skeleton className="h-4 w-full max-w-xl" />
            <Skeleton className="h-4 w-4/5 max-w-lg" />
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
