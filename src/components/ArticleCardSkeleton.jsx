const ArticleCardSkeleton = () => (
  <article className="rounded-2xl bg-base-100 ring-1 ring-base-300/70 shadow-md">
    <div className="p-5">
      <div className="skeleton w-full rounded-xl mb-4" style={{ aspectRatio: "16 / 10" }} />
      <div className="skeleton h-4 w-3/4 mb-2" />
      <div className="skeleton h-4 w-1/2 mb-4" />
      <div className="flex justify-between items-center">
        <div className="skeleton h-3 w-28" />
        <div className="skeleton h-5 w-16 rounded" />
      </div>
    </div>
  </article>
);

export default ArticleCardSkeleton;
