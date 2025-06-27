import { useState } from "react";
import { updateArticleVotes } from "../utils/api";

const ArticleVotes = ({ article, onVoteUpdate }) => {
  const [voteError, setVoteError] = useState(null);

  const handleUpvote = () => {
    // Optimistic
    const newVotes = article.votes + 1;
    onVoteUpdate({ ...article, votes: newVotes });
    setVoteError(null);

    updateArticleVotes(article.article_id, 1)
      .then((updatedArticle) => {
        onVoteUpdate(updatedArticle);
      })
      .catch((err) => {
        onVoteUpdate({ ...article, votes: article.votes });
        setVoteError("Failed to upvote. Please try again.");
      });
  };

  const handleDownvote = () => {
    // Optimistic
    const newVotes = article.votes - 1;
    onVoteUpdate({ ...article, votes: newVotes });
    setVoteError(null);

    updateArticleVotes(article.article_id, -1)
      .then((updatedArticle) => {
        onVoteUpdate(updatedArticle);
      })
      .catch((err) => {
        onVoteUpdate({ ...article, votes: article.votes });
        setVoteError("Failed to downvote. Please try again.");
      });
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <button onClick={handleUpvote} className="btn btn-outline btn-success btn-sm">
          👍 <strong>{article.votes}</strong> votes
        </button>
        <button onClick={handleDownvote} className="btn btn-outline btn-error btn-sm">
          👎
        </button>
      </div>

      {voteError && (
        <div className="alert alert-error mt-2">
          <span className="text-sm">{voteError}</span>
        </div>
      )}
    </div>
  );
};

export default ArticleVotes;
