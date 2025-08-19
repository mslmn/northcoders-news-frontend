import { useState } from "react";
import { postComment } from "../utils/api";
import { useUser } from "../contexts/UserContext";

const CommentForm = ({ articleId, onAdded }) => {
  const { currentUser } = useUser();
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const disabled = !text.trim() || submitting;

  const submit = (e) => {
    e.preventDefault();
    if (disabled) return;
    setSubmitting(true);
    setError(null);

    postComment(articleId, { username: currentUser.username, body: text.trim() })
      .then((created) => {
        setText("");
        onAdded?.(created);
      })
      .catch((err) => setError(err?.msg || "Failed to add comment"))
      .finally(() => setSubmitting(false));
  };

  return (
    <form onSubmit={submit} className="card bg-base-100 ring-1 ring-base-300/40 shadow-sm">
      <div className="card-body gap-3">
        <h4 className="card-title text-base">Add a comment</h4>
        <textarea
          className="textarea textarea-bordered min-h-24"
          placeholder="Write something thoughtful…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={500}
        />
        {error && (
          <div className="alert alert-warning py-2">
            <span>{error}</span>
          </div>
        )}
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => setText("")}
            disabled={submitting || !text}
          >
            Clear
          </button>
          <button
            className={`btn btn-primary btn-sm ${submitting ? "loading" : ""}`}
            disabled={disabled}
          >
            {submitting ? "Posting…" : "Post comment"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
