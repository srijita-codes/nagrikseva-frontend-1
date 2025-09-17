"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });

export default function IssueMapPicker({ value, onChange }:{ value?: [number, number]; onChange: (latlng: [number, number]) => void; }) {
  const [pos, setPos] = useState<[number, number]>(value || [28.6139, 77.2090]);

  useEffect(() => {
    if (value) setPos(value);
  }, [value]);

  const handleClick = (e: any) => {
    const latlng: [number, number] = [e.latlng.lat, e.latlng.lng];
    setPos(latlng);
    onChange(latlng);
  };

  return (
    <div className="h-72 w-full overflow-hidden rounded-md border">
      <MapContainer center={pos} zoom={13} className="h-full w-full" whenCreated={(map) => map.on("click", handleClick)}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap contributors' />
        <Marker position={pos} icon={L.icon({ iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png", shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png", iconSize: [25,41], iconAnchor: [12,41] })} />
      </MapContainer>
    </div>
  );
}