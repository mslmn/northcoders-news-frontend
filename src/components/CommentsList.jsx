import { useEffect, useMemo, useState } from "react";
import { getCommentsByArticleId, deleteCommentById } from "../utils/api";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

const CommentsList = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCommentsByArticleId(articleId)
      .then((list) => setComments(list))
      .catch((e) => setError(e?.msg || "Failed to load comments"))
      .finally(() => setLoading(false));
  }, [articleId]);

  const sorted = useMemo(() => {
    const arr = [...comments];
    arr.sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.created_at) - new Date(b.created_at)
        : new Date(b.created_at) - new Date(a.created_at)
    );
    return arr;
  }, [comments, sortOrder]);

  const onConfirmDelete = (comment) => {
    setError(null);
    setDeletingId(comment.comment_id);
    const previous = comments;
    setComments((prev) => prev.filter((c) => c.comment_id !== comment.comment_id));
    deleteCommentById(comment.comment_id)
      .catch((e) => {
        setComments(previous); // revert
        setError(e?.msg || "Failed to delete comment");
      })
      .finally(() => setDeletingId(null));
  };

  const onAdded = (created) => setComments((prev) => [created, ...prev]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Comments <span className="opacity-70 text-sm">({comments.length})</span>
        </h3>
        <div className="join">
          <button
            className={`btn btn-xs sm:btn-sm join-item ${sortOrder === "desc" ? "btn-active" : ""}`}
            onClick={() => setSortOrder("desc")}
          >
            Newest
          </button>
          <button
            className={`btn btn-xs sm:btn-sm join-item ${sortOrder === "asc" ? "btn-active" : ""}`}
            onClick={() => setSortOrder("asc")}
          >
            Oldest
          </button>
        </div>
      </div>

      <div className="divider my-2 before:bg-base-300 after:bg-base-300" />

      {error && (
        <div className="alert alert-warning">
          <span>{error}</span>
        </div>
      )}

      <CommentForm articleId={articleId} onAdded={onAdded} />

      {loading ? (
        // comment form skeleton
        <div className="space-y-3">
          <div className="skeleton h-5 w-1/2" />
          <div className="skeleton h-4 w-4/5" />
          <div className="skeleton h-4 w-3/5" />
          <div className="skeleton h-5 w-2/3 mt-2" />
          <div className="skeleton h-4 w-4/6" />
          <div className="skeleton h-4 w-3/6" />
        </div>
      ) : sorted.length === 0 ? (
        <div className="card bg-base-200/40 ring-1 ring-base-300/40">
          <div className="card-body items-center text-center">
            <div className="text-3xl">💬</div>
            <h4 className="card-title">Be the first to comment</h4>
            <p className="opacity-70 text-sm">Join the conversation below.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((c) => (
            <CommentCard
              key={c.comment_id}
              comment={c}
              deleting={deletingId === c.comment_id}
              onConfirmDelete={onConfirmDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
