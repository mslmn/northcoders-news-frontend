const CommentCardSkeleton = () => {
  return (
    <article className="card bg-base-100 shadow-sm">
      <div className="card-body gap-3">
        <div className="flex items-start gap-3">
          <div className="skeleton w-8 h-8 rounded-full" />
          <div className="flex-1">
            <div className="skeleton h-4 w-32 mb-2" />
            <div className="skeleton h-3 w-20" />
          </div>
        </div>
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
      </div>
    </article>
  );
};

export default CommentCardSkeleton;
