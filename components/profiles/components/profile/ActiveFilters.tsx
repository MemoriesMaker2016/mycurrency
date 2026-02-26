"use client";

type Props = {
  filterDate: string;
  filterStatus: string;
  filterOrderType: string;
  onClear: () => void;
};

export default function ActiveFilters({
  filterDate,
  filterStatus,
  filterOrderType,
  onClear,
}: Props) {
  const hasFilters = filterDate || filterStatus || filterOrderType;
  if (!hasFilters) return null;

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {filterDate && (
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
          Date: {filterDate}
        </span>
      )}
      {filterStatus && (
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
          Status: {filterStatus}
        </span>
      )}
      {filterOrderType && (
        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
          Order Type: {filterOrderType}
        </span>
      )}
      <button className="text-red-600 underline text-sm" onClick={onClear}>
        Clear Filters
      </button>
    </div>
  );
}