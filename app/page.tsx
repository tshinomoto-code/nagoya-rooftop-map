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

      {/* About */}
      <section className="bg-sky-50 border-b border-sky-100 px-4 py-10 sm:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <h2 className="text-lg font-bold text-sky-900">青空ルネサンスについて</h2>
          <p className="text-sm text-sky-800 leading-relaxed">
            すこしでも、青空に近い場所に行けるMAPをまとめました。
            <br /><br />
            「青空ルネサンス」は、名古屋市内のビル屋上などの未利用地を活用し、街に賑わいを作り出す屋上利活用プロジェクトです。
            「名古屋を『屋上の街』にする」という目標を掲げ、普段は立ち入ることのできない屋上を小さな公園（ポケットパーク）として開放し、都市風景を変えていく活動を行っています。
          </p>
          <a
            href="https://www.instagram.com/aozora_rooftop/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram @aozora_rooftop
          </a>
        </div>
      </section>

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
