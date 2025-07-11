interface SkeletonCardProps {
  height?: string;
  children?: React.ReactNode;
}

export default function SkeletonCard({ height = "h-32", children }: SkeletonCardProps) {
  return (
    <div className={`glass rounded-2xl p-6 shadow-xl animate-pulse ${height}`}>
      {children || (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      )}
    </div>
  );
}