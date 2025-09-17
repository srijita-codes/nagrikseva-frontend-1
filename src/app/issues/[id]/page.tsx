"use client";
import { useParams, useRouter } from "next/navigation";
import IssueMap from "@/components/map/IssueMap";
import { issues } from "@/lib/mockData";

export default function IssueDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const issue = issues.find((i) => i.id === id);

  if (!issue) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-sm">Issue not found.</p>
        <button onClick={() => router.push("/map")} className="mt-4 rounded-md border px-3 py-2 text-sm">Back to map</button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{issue.title}</h1>
          <p className="text-sm text-muted-foreground capitalize">{issue.category} • {new Date(issue.createdAt).toLocaleString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs capitalize rounded px-2 py-0.5 border ${issue.status === "resolved" ? "border-green-600 text-green-700 dark:text-green-400" : issue.status === "in_progress" ? "border-amber-600 text-amber-700 dark:text-amber-400" : "border-red-600 text-red-700 dark:text-red-400"}`}>{issue.status.replace("_"," ")}</span>
          <a href="/report" className="rounded-md border px-3 py-2 text-sm">Report similar</a>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <img src={`https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=1200&auto=format&fit=crop`} alt="Issue" className="h-64 w-full rounded-lg object-cover" />
          <div className="rounded-lg border p-4">
            <h2 className="font-medium">Description</h2>
            <p className="mt-2 text-sm text-muted-foreground">{issue.description}</p>
          </div>
          <div className="rounded-lg border p-4">
            <h2 className="font-medium">Activity</h2>
            <ul className="mt-2 space-y-2 text-sm">
              <li>• Reported by citizen</li>
              <li>• Acknowledged by ward officer</li>
              <li>• {issue.status === "resolved" ? "Resolved" : issue.status === "in_progress" ? "Work in progress" : "Pending assignment"}</li>
            </ul>
          </div>
        </div>
        <aside className="space-y-4">
          <div>
            <h2 className="mb-2 font-medium">Location</h2>
            <IssueMap issues={[{ id: issue.id, title: issue.title, status: issue.status, position: issue.position }]} center={issue.position} zoom={15} />
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">Actions</h3>
            <div className="mt-3 grid gap-2">
              <button className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">Upvote</button>
              <button className="rounded-md border px-3 py-2 text-sm">Subscribe</button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}