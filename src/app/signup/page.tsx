"use client";
import { useState } from "react";

export default function SignupPage() {
  const [role, setRole] = useState("citizen");
  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <form className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">First name</label>
            <input className="mt-1 w-full rounded-md border bg-background px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Last name</label>
            <input className="mt-1 w-full rounded-md border bg-background px-3 py-2" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" className="mt-1 w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input type="password" className="mt-1 w-full rounded-md border bg-background px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Select Role</label>
          <select value={role} onChange={(e)=>setRole(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2">
            <option value="citizen">Citizen</option>
            <option value="officer">Officer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="button" onClick={()=>location.assign(`/dashboard/${role}`)} className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground">Create account</button>
        <p className="text-center text-sm text-muted-foreground">Already registered? <a className="underline" href="/login">Login</a></p>
      </form>
    </main>
  );
}