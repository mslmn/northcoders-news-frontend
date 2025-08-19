import { useState } from "react";
import { updateArticleVotes } from "../utils/api";

const ArticleVotes = ({ article, onVoteUpdate }) => {
  const [voteError, setVoteError] = useState(null);

  const applyVote = (delta) => {
    const prev = article.votes;
    // optimistic
    onVoteUpdate({ ...article, votes: prev + delta });
    setVoteError(null);

    updateArticleVotes(article.article_id, delta)
      .then((updated) => onVoteUpdate(updated))
      .catch((error) => {
        onVoteUpdate({ ...article, votes: prev }); // revert
        setVoteError(error?.msg || "Failed to update vote. Please try again.");
      });
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <button onClick={() => applyVote(1)} className="btn btn-outline btn-success btn-sm">
          👍 <strong>{article.votes}</strong> votes
        </button>
        <button onClick={() => applyVote(-1)} className="btn btn-outline btn-error btn-sm">
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
