"use client";
import {
  RiArrowDownSLine,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiTwitterXLine,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const columns = [
  {
    title: "Product",
    links: ["Features", "Integrations", "Pricing", "Changelog", "Roadmap"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: [
      "Documentation",
      "Guides",
      "Help Center",
      "API Status",
      "Community",
    ],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "Cookies", "Licenses"],
  },
];

const socials = [
  { label: "X", icon: RiTwitterXLine },
  { label: "GitHub", icon: RiGithubFill },
  { label: "LinkedIn", icon: RiLinkedinBoxFill },
];

export default function FooterBlock() {
  return (
    <section className="flex w-full items-center justify-center bg-muted/30 px-6 py-16 text-foreground">
      <footer className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-none bg-primary text-sm font-bold text-primary-foreground">
                A
              </span>
              <span className="text-lg font-semibold tracking-tight">Acme</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The composable platform teams use to ship polished products
              faster, from first prototype to global scale.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  aria-label={social.label}
                  className="rounded-none"
                >
                  <social.icon className="size-4" />
                </Button>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="flex  sm:flex-row sm:items-center sm:justify-center items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
            Acme, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}
