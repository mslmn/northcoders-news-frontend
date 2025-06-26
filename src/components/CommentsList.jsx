import { getCommentsByArticleId } from "../utils/api";
import { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

const CommentsList = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (articleId) {
      loadComments();
    }
  }, [articleId]);

  const loadComments = () => {
    setLoading(true);
    getCommentsByArticleId(articleId)
      .then((commentsData) => {
        setComments(commentsData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.msg);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="ml-4">Loading comments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error max-w-md mx-auto mt-10">
        <span>Error loading comments: {error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <span className="text-2xl">💬</span>
        <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
      </div>

      {!comments || comments.length === 0 ? (
        <div className="card border-2 border-dashed border-base-300">
          <div className="card-body text-center py-12">
            <p className="text-gray-500">No comments found for this article.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard key={comment.comment_id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
