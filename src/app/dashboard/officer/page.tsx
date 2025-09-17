"use client";
import Link from "next/link";
import { issues } from "@/lib/mockData";

export default function OfficerDashboardPage() {
  const queue = issues.filter(i => i.status !== "resolved");
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Officer Dashboard</h1>
          <p className="text-sm text-muted-foreground">Acknowledge, assign, and update issues.</p>
        </div>
        <Link href="/map" className="rounded-md border px-4 py-2">Open Map</Link>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">{queue.length}</div>
          <div className="text-xs text-muted-foreground">In Queue</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">{issues.filter(i=>i.status==="in_progress").length}</div>
          <div className="text-xs text-muted-foreground">In Progress</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">{issues.filter(i=>i.status==="resolved").length}</div>
          <div className="text-xs text-muted-foreground">Resolved</div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Assignment Queue</h2>
        <div className="grid gap-3">
          {queue.map((i) => (
            <div key={i.id} className="rounded-lg border p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium">{i.title}</div>
                  <div className="text-xs text-muted-foreground capitalize">{i.category} • {new Date(i.createdAt).toLocaleString()}</div>
                </div>
                <span className={`text-xs capitalize rounded px-2 py-0.5 border ${i.status === "resolved" ? "border-green-600 text-green-700 dark:text-green-400" : i.status === "in_progress" ? "border-amber-600 text-amber-700 dark:text-amber-400" : "border-red-600 text-red-700 dark:text-red-400"}`}>{i.status.replace("_"," ")}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <Link href={`/issues/${i.id}`} className="rounded-md border px-3 py-2 text-sm">View</Link>
                <button className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">Acknowledge</button>
                <button className="rounded-md border px-3 py-2 text-sm">Assign</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}