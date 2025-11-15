export const SkeletonCard = () => (
  <div className="animate-pulse bg-background-secondary rounded-lg p-6">
    <div className="h-48 bg-gray-700 rounded-lg mb-4" />
    <div className="h-6 bg-gray-700 rounded w-3/4 mb-3" />
    <div className="h-4 bg-gray-700 rounded w-full mb-2" />
    <div className="h-4 bg-gray-700 rounded w-5/6" />
  </div>
);

export const SkeletonText = ({ lines = 3 }: { lines?: number }) => (
  <div className="animate-pulse space-y-3">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-4 bg-gray-700 rounded"
        style={{ width: i === lines - 1 ? '80%' : '100%' }}
      />
    ))}
  </div>
);

export const SkeletonGrid = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);
