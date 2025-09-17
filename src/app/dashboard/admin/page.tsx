"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { issues } from "@/lib/mockData";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]; // Tailwind palette

export default function AdminDashboardPage() {
  const byCategory = Object.entries(issues.reduce<Record<string, number>>((acc, i) => {
    acc[i.category] = (acc[i.category] || 0) + 1;
    return acc;
  }, {})).map(([name, value]) => ({ name, value }));

  const byStatus = Object.entries(issues.reduce<Record<string, number>>((acc, i) => {
    acc[i.status] = (acc[i.status] || 0) + 1;
    return acc;
  }, {})).map(([name, value]) => ({ name, value }));

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">City-wide metrics and performance insights.</p>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border p-4">
          <h2 className="mb-2 font-medium">Reports by Category</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCategory}>
                <XAxis dataKey="name" stroke="currentColor" tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", color: "var(--color-foreground)" }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border p-4">
          <h2 className="mb-2 font-medium">Reports by Status</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byStatus} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={4}>
                  {byStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", color: "var(--color-foreground)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </main>
  );
}