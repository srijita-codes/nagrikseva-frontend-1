"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import IssueMapPicker from "../map/IssueMapPicker";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const schema = z.object({
  title: z.string().min(3, "Title too short"),
  category: z.enum(["pothole","garbage","streetlight","water","other"]),
  description: z.string().min(10, "Please add more details"),
  location: z.tuple([z.number(), z.number()]),
  files: z.any().optional(),
});

export type IssueFormValues = z.infer<typeof schema>;

const steps = ["Details", "Location", "Photos", "Review"] as const;

export default function ReportIssueForm() {
  const [step, setStep] = useState(0);
  const form = useForm<IssueFormValues>({ resolver: zodResolver(schema), defaultValues: { category: "pothole", location: [28.6139, 77.2090] } });

  const next = async () => {
    const valid = await form.trigger(step === 0 ? ["title","category","description"] : step === 1 ? ["location"] : []);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = (values: IssueFormValues) => {
    // Mock submit
    toast.success("Issue submitted!", {
      description: "Thanks for reporting. We'll keep you updated.",
    });
    console.log("Submitted issue:", values);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Report an Issue</h1>
        <div className="text-sm text-muted-foreground">Step {step + 1} of {steps.length} - {steps[step]}</div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {steps.map((s, i) => (
          <div key={s} className={`h-2 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="details" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input className="mt-1 w-full rounded-md border bg-background px-3 py-2" {...form.register("title")} placeholder="Short summary" />
              {form.formState.errors.title && <p className="mt-1 text-sm text-red-600">{form.formState.errors.title.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium">Category</label>
              <select className="mt-1 w-full rounded-md border bg-background px-3 py-2" {...form.register("category")}>
                <option value="pothole">Pothole</option>
                <option value="garbage">Garbage</option>
                <option value="streetlight">Streetlight</option>
                <option value="water">Water</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea rows={5} className="mt-1 w-full rounded-md border bg-background px-3 py-2" {...form.register("description")} placeholder="Add details, landmarks, etc." />
              {form.formState.errors.description && <p className="mt-1 text-sm text-red-600">{form.formState.errors.description.message}</p>}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="location" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="space-y-4">
            <label className="block text-sm font-medium">Pin Location</label>
            <IssueMapPicker value={form.getValues("location") as any} onChange={(latlng) => form.setValue("location", latlng)} />
            <p className="text-sm text-muted-foreground">Click on the map to set the exact location.</p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="photos" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="space-y-4">
            <label className="block text-sm font-medium">Upload Photos/Videos</label>
            <input type="file" accept="image/*,video/*" multiple className="mt-1 w-full rounded-md border bg-background px-3 py-2" {...form.register("files")} />
            <p className="text-sm text-muted-foreground">Attach evidence to help authorities assess the issue.</p>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="review" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="space-y-3">
            <h2 className="text-lg font-medium">Review</h2>
            <pre className="overflow-auto rounded-md border bg-muted/30 p-3 text-sm">{JSON.stringify(form.getValues(), null, 2)}</pre>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between gap-2">
        <button type="button" onClick={prev} disabled={step===0} className="rounded-md border px-4 py-2 disabled:opacity-50">Back</button>
        {step < steps.length - 1 ? (
          <button type="button" onClick={next} className="rounded-md bg-primary px-4 py-2 text-primary-foreground">Next</button>
        ) : (
          <button type="submit" className="rounded-md bg-primary px-4 py-2 text-primary-foreground">Submit</button>
        )}
      </div>
    </form>
  );
}