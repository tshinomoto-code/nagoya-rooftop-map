import Link from "next/link";
import { Spot } from "@/types/spot";
import SpotImage from "./SpotImage";

const AREA_COLORS: Record<string, string> = {
  名駅: "bg-violet-100 text-violet-700",
  栄: "bg-emerald-100 text-emerald-700",
  金山: "bg-orange-100 text-orange-700",
  吹上: "bg-rose-100 text-rose-700",
  港: "bg-blue-100 text-blue-700",
  東山: "bg-teal-100 text-teal-700",
  その他: "bg-amber-100 text-amber-700",
};

interface Props {
  spot: Spot;
}

export default function SpotCard({ spot }: Props) {
  const avgRating =
    spot.reviews.length > 0
      ? spot.reviews.reduce((s, r) => s + r.rating, 0) / spot.reviews.length
      : null;

  const isFree = spot.fee === "無料";

  return (
    <Link href={`/spots/${spot.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="relative h-44 bg-gray-100">
          <SpotImage
            src={spot.photos[0] ?? ""}
            alt={spot.name}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span
            className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${AREA_COLORS[spot.area]}`}
          >
            {spot.area}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 leading-snug mb-1 group-hover:text-sky-600 transition-colors">
            {spot.name}
          </h3>
          <p className="text-xs text-gray-500 mb-2">{spot.address}</p>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span
              className={`px-2 py-0.5 rounded font-medium ${
                isFree
                  ? "bg-green-50 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {spot.fee}
            </span>
            {avgRating !== null && (
              <span className="flex items-center gap-0.5">
                <span className="text-amber-400">★</span>
                <span>{avgRating.toFixed(1)}</span>
                <span className="text-gray-400">({spot.reviews.length})</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
