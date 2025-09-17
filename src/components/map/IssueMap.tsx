"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useRouter } from "next/navigation";

// Fallback Leaflet marker icons via CDN (avoids Next asset loader config)
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
(L.Marker.prototype as any).options.icon = DefaultIcon;

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false });

export type Issue = {
  id: string;
  title: string;
  status: "open" | "in_progress" | "resolved";
  position: [number, number];
};

export default function IssueMap({ issues = [] as Issue[], center = [28.6139, 77.2090] as [number, number], zoom = 12 }:{ issues?: Issue[]; center?: [number, number]; zoom?: number; }) {
  const router = useRouter();
  const coloredIcon = useMemo(() => (status: Issue["status"]) => {
    const color = status === "resolved" ? "#16a34a" : status === "in_progress" ? "#f59e0b" : "#ef4444";
    const svg = encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='25' height='41' viewBox='0 0 25 41'>\
        <path fill='${color}' d='M12.5 0C5.6 0 0 5.6 0 12.5c0 9.4 12.5 28.5 12.5 28.5S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z'/>\
        <circle cx='12.5' cy='12.5' r='5.5' fill='white'/></svg>`
    );
    return L.icon({ iconUrl: `data:image/svg+xml,${svg}`, iconSize: [25, 41], iconAnchor: [12, 41] });
  }, []);

  return (
    <div className="h-[60vh] w-full overflow-hidden rounded-lg border">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {issues.map((issue) => (
          <Marker key={issue.id} position={issue.position} icon={coloredIcon(issue.status)} eventHandlers={{ click: () => router.push(`/issues/${issue.id}`) }}>
            <Popup>
              <div className="space-y-1">
                <div className="font-medium">{issue.title}</div>
                <div className="text-xs text-muted-foreground capitalize">Status: {issue.status.replace("_"," ")}</div>
                <button onClick={() => router.push(`/issues/${issue.id}`)} className="mt-1 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">View</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}