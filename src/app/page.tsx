"use client";
import StatsHero from "@/components/StatsHero";

export default function Home() {
  return (
    <main>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-15" />
        <StatsHero />
      </div>
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="mb-4 text-2xl font-semibold">How it works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">1. Report</h3>
            <p className="text-sm text-muted-foreground">Describe the issue, add photos, and pin the location.</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">2. Track</h3>
            <p className="text-sm text-muted-foreground">Follow progress as officials acknowledge and update status.</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium">3. Resolve</h3>
            <p className="text-sm text-muted-foreground">Celebrate when issues are fixed and provide feedback.</p>
          </div>
        </div>
      </section>
    </main>
  );
}