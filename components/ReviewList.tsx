import { Review } from "@/types/spot";

interface Props {
  reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-amber-400" : "text-gray-200"}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function ReviewList({ reviews }: Props) {
  if (reviews.length === 0) {
    return <p className="text-gray-500 text-sm">口コミはまだありません。</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-sm font-semibold">
                {review.author.charAt(0)}
              </div>
              <span className="font-medium text-sm text-gray-800">{review.author}</span>
            </div>
            <span className="text-xs text-gray-400">{review.date}</span>
          </div>
          <StarRating rating={review.rating} />
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">{review.body}</p>
        </div>
      ))}
    </div>
  );
}
