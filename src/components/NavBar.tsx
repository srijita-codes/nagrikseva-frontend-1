"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";

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
  const [lang, setLang] = useState<string>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved) setLang(saved);
  }, []);

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLang(value);
    localStorage.setItem("lang", value);
  };

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
          <select
            aria-label="Language"
            value={lang}
            onChange={handleLangChange}
            className="hidden rounded-md border bg-background px-2 py-2 text-sm md:block"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
          <Link href="/login" className="rounded-md border px-3 py-2 text-sm hover:bg-accent">Login</Link>
          <Link href="/signup" className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90">Sign Up</Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}