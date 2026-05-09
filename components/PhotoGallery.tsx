"use client";

import { useState } from "react";
import SpotImage from "./SpotImage";

interface Props {
  photos: string[];
  name: string;
}

export default function PhotoGallery({ photos, name }: Props) {
  const [active, setActive] = useState(0);

  if (photos.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden bg-gray-100">
        <SpotImage
          src={photos[active]}
          alt={`${name} - 写真 ${active + 1}`}
          className="object-cover"
          priority
        />
      </div>
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                active === i ? "border-sky-500" : "border-transparent"
              }`}
            >
              <SpotImage
                src={photo}
                alt={`サムネイル ${i + 1}`}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
