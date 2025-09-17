export type Issue = {
  id: string;
  title: string;
  status: "open" | "in_progress" | "resolved";
  position: [number, number];
  category: "pothole" | "garbage" | "streetlight" | "water" | "other";
  description: string;
  createdAt: string;
};

export const issues: Issue[] = [
  {
    id: "iss-1001",
    title: "Pothole near Connaught Place",
    status: "open",
    position: [28.6315, 77.2167],
    category: "pothole",
    description: "Large pothole causing traffic disruption near Block A, CP.",
    createdAt: "2025-09-12T10:00:00Z",
  },
  {
    id: "iss-1002",
    title: "Overflowing garbage bin",
    status: "in_progress",
    position: [28.6448, 77.2167],
    category: "garbage",
    description: "Garbage not collected for 3 days in Karol Bagh lane.",
    createdAt: "2025-09-10T08:30:00Z",
  },
  {
    id: "iss-1003",
    title: "Streetlight not working",
    status: "resolved",
    position: [28.5866, 77.2090],
    category: "streetlight",
    description: "Dark stretch outside the park in Hauz Khas.",
    createdAt: "2025-09-08T21:15:00Z",
  },
];