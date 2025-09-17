"use client";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Mon", issues: 12 },
  { name: "Tue", issues: 18 },
  { name: "Wed", issues: 25 },
  { name: "Thu", issues: 20 },
  { name: "Fri", issues: 30 },
  { name: "Sat", issues: 28 },
  { name: "Sun", issues: 22 },
];

export default function StatsHero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Crowdsourced Civic Issue Reporting</h1>
          <p className="mt-4 text-muted-foreground">
            NagrikSeva empowers citizens to report civic issues, track resolutions, and collaborate with authorities.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="/report" className="rounded-md bg-primary px-4 py-2 text-primary-foreground">Report an Issue</a>
            <a href="/map" className="rounded-md border px-4 py-2">Explore Map</a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold">1.2k+</div>
              <div className="text-xs text-muted-foreground">Reports</div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold">78%</div>
              <div className="text-xs text-muted-foreground">Resolved</div>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold">24h</div>
              <div className="text-xs text-muted-foreground">Median Response</div>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="rounded-xl border p-4">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="issues" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="currentColor" tickLine={false} axisLine={false}/>
                <YAxis stroke="currentColor" tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", color: "var(--color-foreground)" }} />
                <Area type="monotone" dataKey="issues" stroke="#3b82f6" fillOpacity={1} fill="url(#issues)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-center text-sm text-muted-foreground">Weekly issue reports</p>
        </motion.div>
      </div>
    </section>
  );
}