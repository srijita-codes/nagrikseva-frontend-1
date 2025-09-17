"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/report", label: "Report" },
  { href: "/map", label: "Map" },
  { href: "/dashboard/citizen", label: "Citizen" },
  { href: "/dashboard/officer", label: "Officer" },
  { href: "/dashboard/admin", label: "Admin" },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold">
          NagrikSeva
        </Link>
        <nav className="hidden gap-4 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent ${pathname === l.href ? "bg-accent" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="rounded-md border px-3 py-2 text-sm hover:bg-accent">Login</Link>
          <Link href="/signup" className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90">Sign Up</Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}