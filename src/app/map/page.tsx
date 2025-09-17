"use client";
import IssueMap from "@/components/map/IssueMap";
import { issues } from "@/lib/mockData";

export default function MapPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">City Issues Map</h1>
          <p className="text-sm text-muted-foreground">Explore reported issues and tap markers to view details.</p>
        </div>
        <a href="/report" className="rounded-md bg-primary px-4 py-2 text-primary-foreground">Report Issue</a>
      </header>
      <IssueMap issues={issues} />
      <section className="grid gap-4 sm:grid-cols-3">
        {issues.map((i) => (
          <a key={i.id} href={`/issues/${i.id}`} className="rounded-lg border p-4 hover:bg-accent/50">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{i.title}</h3>
              <span className={`text-xs capitalize rounded px-2 py-0.5 border ${i.status === "resolved" ? "border-green-600 text-green-700 dark:text-green-400" : i.status === "in_progress" ? "border-amber-600 text-amber-700 dark:text-amber-400" : "border-red-600 text-red-700 dark:text-red-400"}`}>{i.status.replace("_"," ")}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{i.category} • {new Date(i.createdAt).toLocaleString()}</p>
          </a>
        ))}
      </section>
    </main>
  );
}