"use client";
import Link from "next/link";
import { issues } from "@/lib/mockData";

export default function CitizenDashboardPage() {
  const myIssues = issues; // Mock: all issues as "my" issues
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Citizen Dashboard</h1>
          <p className="text-sm text-muted-foreground">Track your reports and create new ones.</p>
        </div>
        <Link href="/report" className="rounded-md bg-primary px-4 py-2 text-primary-foreground">New Report</Link>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">{myIssues.length}</div>
          <div className="text-xs text-muted-foreground">Total Reports</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">{myIssues.filter(i=>i.status!=="resolved").length}</div>
          <div className="text-xs text-muted-foreground">Active</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">{myIssues.filter(i=>i.status==="resolved").length}</div>
          <div className="text-xs text-muted-foreground">Resolved</div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">My Recent Reports</h2>
        <div className="grid gap-3">
          {myIssues.map((i) => (
            <Link key={i.id} href={`/issues/${i.id}`} className="rounded-lg border p-4 hover:bg-accent/50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{i.title}</div>
                  <div className="text-xs text-muted-foreground capitalize">{i.category} • {new Date(i.createdAt).toLocaleString()}</div>
                </div>
                <span className={`text-xs capitalize rounded px-2 py-0.5 border ${i.status === "resolved" ? "border-green-600 text-green-700 dark:text-green-400" : i.status === "in_progress" ? "border-amber-600 text-amber-700 dark:text-amber-400" : "border-red-600 text-red-700 dark:text-red-400"}`}>{i.status.replace("_"," ")}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}