"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

const isPlaceholder = (src: string) =>
  !src || src === "/images/spots/placeholder.jpg";

export default function SpotImage({ src, alt, fill = true, className, priority }: Props) {
  const [failed, setFailed] = useState(isPlaceholder(src));

  if (failed) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center p-4">
        <span className="text-gray-400 text-sm font-medium text-center leading-snug select-none">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      unoptimized
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
