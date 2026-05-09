import { notFound } from "next/navigation";
import Link from "next/link";
import spotsData from "@/data/spots.json";
import { Spot } from "@/types/spot";
import PhotoGallery from "@/components/PhotoGallery";
import ReviewList from "@/components/ReviewList";

const spots = spotsData as Spot[];

export function generateStaticParams() {
  return spots.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const spot = spots.find((s) => s.id === id);
  if (!spot) return {};
  return {
    title: `${spot.name} | 屋上MAP（名古屋編）edited by 青空ルネサンス`,
    description: spot.description,
  };
}

const AREA_COLORS: Record<string, string> = {
  名駅: "bg-violet-100 text-violet-700",
  栄: "bg-emerald-100 text-emerald-700",
  その他: "bg-amber-100 text-amber-700",
};

export default async function SpotDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const spot = spots.find((s) => s.id === id);
  if (!spot) notFound();

  const avgRating =
    spot.reviews.length > 0
      ? spot.reviews.reduce((s, r) => s + r.rating, 0) / spot.reviews.length
      : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="text-sm text-sky-600 hover:underline flex items-center gap-1"
          >
            ← 一覧に戻る
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Photos */}
        <PhotoGallery photos={spot.photos} name={spot.name} />

        {/* Header */}
        <div>
          <div className="flex items-start gap-3 flex-wrap">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${AREA_COLORS[spot.area]}`}
            >
              {spot.area}
            </span>
            <span className="text-xs bg-green-50 text-green-700 font-semibold px-2.5 py-0.5 rounded-full">
              {spot.fee}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-3 leading-snug">
            {spot.name}
          </h1>
          {avgRating !== null && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-amber-400 text-lg">★</span>
              <span className="font-semibold">{avgRating.toFixed(1)}</span>
              <span className="text-gray-400 text-sm">
                （{spot.reviews.length}件の口コミ）
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100">
          <InfoRow label="住所" value={spot.address} />
          <InfoRow label="営業時間" value={spot.hours} />
          <InfoRow label="定休日" value={spot.closed} />
          <InfoRow label="料金" value={spot.fee} />
        </div>

        {/* Description */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">スポット紹介</h2>
          <p className="text-gray-700 leading-relaxed">{spot.description}</p>
        </section>

        {/* Tips */}
        {spot.tips && (
          <section className="bg-sky-50 border border-sky-100 rounded-xl p-4">
            <h2 className="text-sm font-semibold text-sky-800 mb-1">💡 訪問のヒント</h2>
            <p className="text-sm text-sky-700 leading-relaxed">{spot.tips}</p>
          </section>
        )}

        {/* Reviews */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            口コミ
            <span className="ml-2 text-sm font-normal text-gray-400">
              {spot.reviews.length}件
            </span>
          </h2>
          <ReviewList reviews={spot.reviews} />
        </section>
      </main>

      <footer className="text-center text-xs text-gray-400 py-8">
        © 2025 名古屋屋上マップ
      </footer>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex px-4 py-3 text-sm gap-4">
      <span className="text-gray-400 w-20 shrink-0">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}
