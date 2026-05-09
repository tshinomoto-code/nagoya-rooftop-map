"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useMemo } from "react";
import spotsData from "@/data/spots.json";
import { Spot, Area } from "@/types/spot";
import AreaFilter from "@/components/AreaFilter";
import SpotList from "@/components/SpotList";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

const spots = spotsData as Spot[];

export default function HomePage() {
  const [selectedArea, setSelectedArea] = useState<Area | "すべて">("すべて");

  const filtered = useMemo(
    () =>
      selectedArea === "すべて"
        ? spots
        : spots.filter((s) => s.area === selectedArea),
    [selectedArea]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="w-full">
        <div className="relative w-full h-[420px]">
          <Image
            src="/images/hero.jpg"
            alt="屋上MAP（名古屋編）"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        <div className="bg-white px-4 py-5 sm:px-8 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900">
              屋上MAP（名古屋編）
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">edited by 青空ルネサンス</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
        {/* Map */}
        <div className="h-[400px] sm:h-[480px] rounded-xl overflow-hidden shadow-sm border border-gray-200">
          <MapView spots={filtered} />
        </div>

        {/* Filter + Count */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <AreaFilter selected={selectedArea} onChange={setSelectedArea} />
          <span className="text-sm text-gray-500 sm:ml-auto">
            {filtered.length} 件のスポット
          </span>
        </div>

        {/* List */}
        <SpotList spots={filtered} />
      </main>

      <footer className="text-center text-xs text-gray-400 py-8">
        © 2025 名古屋屋上マップ · 地図データ ©{" "}
        <a
          href="https://www.openstreetmap.org/copyright"
          className="underline hover:text-gray-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenStreetMap
        </a>{" "}
        contributors
      </footer>
    </div>
  );
}
