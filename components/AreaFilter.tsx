"use client";

import { Area } from "@/types/spot";

const AREAS: (Area | "すべて")[] = ["すべて", "名駅", "栄", "金山", "吹上", "港", "東山", "その他"];

interface Props {
  selected: Area | "すべて";
  onChange: (area: Area | "すべて") => void;
}

export default function AreaFilter({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {AREAS.map((area) => (
        <button
          key={area}
          onClick={() => onChange(area)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            selected === area
              ? "bg-sky-600 text-white"
              : "bg-white text-gray-600 border border-gray-300 hover:border-sky-400 hover:text-sky-600"
          }`}
        >
          {area}
        </button>
      ))}
    </div>
  );
}
