const ArticleDetailSkeleton = () => {
  return (
    <section className="max-w-5xl mx-auto px-4">
      <div className="card bg-base-100 shadow-md ring-1 ring-base-300/40">
        <div className="w-full rounded-t-2xl overflow-hidden">
          <div className="skeleton w-full" style={{ aspectRatio: "16 / 9" }} />
        </div>
        <div className="card-body p-6 sm:p-8 space-y-3">
          <div className="skeleton h-8 w-2/3" />
          <div className="flex gap-3">
            <div className="skeleton h-4 w-24" />
            <div className="skeleton h-4 w-20" />
            <div className="skeleton h-4 w-28" />
          </div>
          <div className="divider my-4 before:bg-base-300 after:bg-base-300" />
          <div className="space-y-2">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-11/12" />
            <div className="skeleton h-4 w-10/12" />
            <div className="skeleton h-4 w-9/12" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetailSkeleton;
