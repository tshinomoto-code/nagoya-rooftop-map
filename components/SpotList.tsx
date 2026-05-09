import { Spot } from "@/types/spot";
import SpotCard from "./SpotCard";

interface Props {
  spots: Spot[];
}

export default function SpotList({ spots }: Props) {
  if (spots.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        該当するスポットがありません
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {spots.map((spot) => (
        <SpotCard key={spot.id} spot={spot} />
      ))}
    </div>
  );
}
