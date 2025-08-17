import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { formatDate } from "../utils/dateUtils";

const initialFrom = (name) => (name?.[0] || "?").toUpperCase();

const CommentCard = ({ comment, onConfirmDelete, deleting }) => {
  const { currentUser } = useUser();
  const canDelete = currentUser?.username === comment.author;
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <article className="card bg-base-100 shadow-sm ring-1 ring-base-300/40 rounded-xl hover:shadow-md transition-shadow">
      <div className="card-body gap-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-8 rounded-full">
                {comment.avatar_url ? (
                  <img src={comment.avatar_url} alt={`${comment.author} avatar`} />
                ) : (
                  <div className="bg-base-300 text-base-100 flex items-center justify-center w-full h-full text-xs">
                    {initialFrom(comment.author)}
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{comment.author}</span>
                {canDelete && <span className="badge badge-ghost">You</span>}
              </div>
              <div className="text-xs opacity-70">{formatDate(comment.created_at)}</div>
            </div>
          </div>

          {canDelete && (
            <div className="dropdown dropdown-end">
              <button className="btn btn-ghost btn-xs" aria-label="Comment actions">
                ⋯
              </button>
              <ul className="dropdown-content menu menu-sm bg-base-100 rounded-box shadow w-36 z-20">
                <li>
                  <button className="text-error" onClick={() => setConfirmOpen(true)}>
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{comment.body}</p>
        </div>

        <div className="flex items-center gap-3 text-xs opacity-70">
          <span>👍 {comment.votes}</span>
        </div>

        {canDelete && (
          <div className={`modal ${confirmOpen ? "modal-open" : ""}`}>
            <div className="modal-box">
              <h3 className="font-bold text-lg">Delete comment?</h3>
              <p className="py-2">This cannot be undone.</p>
              <div className="modal-action">
                <button className="btn btn-ghost" onClick={() => setConfirmOpen(false)}>
                  Cancel
                </button>
                <button
                  className="btn btn-error"
                  disabled={deleting}
                  onClick={() => {
                    onConfirmDelete?.(comment);
                    setConfirmOpen(false);
                  }}
                >
                  {deleting ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
            <button className="modal-backdrop" onClick={() => setConfirmOpen(false)}>
              close
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default CommentCard;
