import { getArticleById } from "../utils/api";
import { formatDate } from "../utils/dateUtils";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentsList from "./CommentsList";
import ArticleVotes from "./ArticleVotes";

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArticleDetail();
  }, [articleId]);

  const loadArticleDetail = () => {
    setLoading(true);
    getArticleById(articleId)
      .then((articleData) => {
        setArticle(articleData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.msg);
        setLoading(false);
      });
  };

  const handleVoteUpdate = (updatedArticle) => {
    setArticle(updatedArticle);
  };

  const handleBackClick = () => {
    Navigate("/articles");
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="flex flex-col items-center justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
          <button onClick={handleBackClick} className="btn btn-primary">
            ← Back to Articles
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="alert alert-warning max-w-md mx-auto mt-10">
          <span>No article found</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="max-w-5xl mx-auto px-4 pt-24 pb-6">
        <button onClick={handleBackClick} className="btn btn-outline mb-6">
          ← Back to Articles
        </button>

        <div className="card bg-base-100 shadow-lg mb-8">
          <figure className="w-full aspect-w-16 aspect-h-9">
            <img
              src={article.article_img_url}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="card-body p-8">
            <h1 className="card-title text-3xl font-bold mb-4">{article.title}</h1>

            <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
              <div className="flex flex-wrap gap-4 text-sm">
                <span>
                  👤 By <strong>{article.author}</strong>
                </span>
                <span>🗓️ {formatDate(article.created_at)}</span>
                <div className="badge badge-outline badge-secondary">📁 {article.topic}</div>
              </div>
            </div>

            <div className="flex gap-4 mb-2 text-sm">
              <ArticleVotes article={article} onVoteUpdate={handleVoteUpdate} />
              {/* <span>
                👍 <strong>{article.votes}</strong> votes
              </span> */}
              {/* <span>
                💬 <strong>{article.comment_count}</strong> comments
              </span> */}
            </div>

            <div className="divider my-2 "></div>

            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-base leading-relaxed">{article.body}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="card bg-base-100 shadow-lg">
        <div className="card-body p-8">
          <CommentsList articleId={articleId} />
        </div>
      </section>
    </>
  );
};

export default ArticleDetail;
