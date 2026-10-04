export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section className="mx-4 my-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mx-10 md:gap-10 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse text-center">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md bg-gray-200" />
          <div className="mt-3 space-y-2">
            <div className="mx-auto h-4 w-3/4 rounded bg-gray-200" />
            <div className="mx-auto h-4 w-1/3 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </section>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="mt-32 animate-pulse">
      <div className="mx-4 h-5 w-28 rounded bg-gray-200 md:mx-10" />
      <div className="mt-10 grid gap-8 px-4 md:grid-cols-2 md:px-10">
        <div className="aspect-[4/5] w-full rounded-xl bg-gray-200" />

        <div className="space-y-5">
          <div className="h-8 w-2/3 rounded bg-gray-200" />
          <div className="h-6 w-1/4 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
          <div className="h-4 w-4/6 rounded bg-gray-200" />

          <div className="flex gap-3 pt-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-10 w-10 rounded-full bg-gray-200" />
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <div className="h-12 w-32 rounded bg-gray-200" />
            <div className="h-12 w-32 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function RelatedProductsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="mt-10 animate-pulse sm:mt-12 md:mt-16">
      <div className="mx-auto mb-8 h-7 w-48 rounded bg-gray-200" />

      <div className="mx-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mx-10 md:grid-cols-4">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="text-center">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md bg-gray-200" />
            <div className="mt-3 space-y-2">
              <div className="mx-auto h-4 w-3/4 rounded bg-gray-200" />
              <div className="mx-auto h-4 w-1/3 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CategoriesSkeleton({ count = 5 }: { count?: number }) {
  const colors = [
    "bg-red-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
  ];

  return (
    <div className="mt-6 grid grid-cols-1 gap-3 animate-pulse sm:mt-8 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`flex min-h-56 items-start px-5 py-8 sm:min-h-72 sm:px-8 sm:py-10 md:min-h-80 ${colors[index % colors.length]} rounded-md`}
        >
          <div className="h-6 w-24 rounded bg-gray-400" />
        </div>
      ))}
    </div>
  );
}
