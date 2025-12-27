const SkeletonBlock = ({ className = "" }) => (
  <div className={`rounded bg-(--color-skeleton) ${className}`} />
);

const CountryDetailsSkeleton = () => {
  return (
    <main className="flex w-full max-w-7xl animate-pulse flex-col gap-16 px-6 pt-16 pb-20 xl:px-0">
      {/* Back button */}
      <SkeletonBlock className="h-10 w-32" />

      <div className="flex flex-col gap-10 lg:flex-row lg:gap-24">
        {/* Flag */}
        <SkeletonBlock className="h-64 w-full lg:w-1/2" />

        {/* Details */}
        <div className="flex w-full flex-col gap-8 lg:w-1/2">
          <SkeletonBlock className="h-8 w-1/2" />

          <div className="flex flex-col gap-6 md:flex-row md:gap-20">
            <div className="space-y-3">
              <SkeletonBlock className="h-4 w-48" />
              <SkeletonBlock className="h-4 w-40" />
              <SkeletonBlock className="h-4 w-44" />
            </div>

            <div className="space-y-3">
              <SkeletonBlock className="h-4 w-36" />
              <SkeletonBlock className="h-4 w-48" />
            </div>
          </div>

          {/* Border countries */}
          <div className="flex gap-3">
            <SkeletonBlock className="h-8 w-24" />
            <SkeletonBlock className="h-8 w-24" />
            <SkeletonBlock className="h-8 w-24" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CountryDetailsSkeleton;
