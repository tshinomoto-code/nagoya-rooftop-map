"use client";

import { useEffect, useRef } from "react";
import { Spot } from "@/types/spot";
import { useRouter } from "next/navigation";

interface Props {
  spots: Spot[];
  highlightId?: string;
}

export default function MapView({ spots, highlightId }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const initMap = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      // Fix default icon path issue with Next.js
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!).setView([35.1706, 136.8816], 13);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const highlightIcon = L.divIcon({
        className: "",
        html: `<div style="width:32px;height:32px;background:#0284c7;border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      const defaultIcon = L.divIcon({
        className: "",
        html: `<div style="width:26px;height:26px;background:#6366f1;border:2px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 4px rgba(0,0,0,0.3)"></div>`,
        iconSize: [26, 26],
        iconAnchor: [13, 26],
      });

      spots.forEach((spot) => {
        const isHighlight = spot.id === highlightId;
        const marker = L.marker([spot.lat, spot.lng], {
          icon: isHighlight ? highlightIcon : defaultIcon,
        }).addTo(map);

        marker.bindPopup(
          `<div style="min-width:160px">
            <div style="font-weight:600;margin-bottom:4px">${spot.name}</div>
            <div style="font-size:12px;color:#6b7280;margin-bottom:6px">${spot.area} · ${spot.fee}</div>
            <a href="/spots/${spot.id}" style="font-size:12px;color:#0284c7;text-decoration:underline">詳細を見る →</a>
          </div>`,
          { maxWidth: 220 }
        );

        marker.on("click", () => {
          router.prefetch(`/spots/${spot.id}`);
        });
      });
    };

    initMap();

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mapRef} className="w-full h-full rounded-xl" />;
}
