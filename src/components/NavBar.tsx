"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/hooks/useLang";

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
  const { lang, setLang, t } = useLang();

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLang(value);
  };

  const labelForHref = (href: string) => {
    switch (href) {
      case "/":
        return t("nav.home");
      case "/report":
        return t("nav.report");
      case "/map":
        return t("nav.map");
      case "/dashboard/citizen":
        return t("nav.citizen");
      case "/dashboard/officer":
        return t("nav.officer");
      case "/dashboard/admin":
        return t("nav.admin");
      default:
        return href;
    }
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
              {labelForHref(l.href)}
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
          <Link href="/login" className="rounded-md border px-3 py-2 text-sm hover:bg-accent">{t("nav.login")}</Link>
          <Link href="/signup" className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-90">{t("nav.signup")}</Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}