import { getArticleById } from "../utils/api";
import { formatDate } from "../utils/dateUtils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  if (loading) {
    return (
      <div>
        <span className="loading loading-spinner loading-lg"></span>
        <p>Loading article...</p>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!article) {
    return <p>No articles found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 pt-23 pb-6">
      <section className="card bg-base-100 shadow-lg mb-8">
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
            <span>
              👍 <strong>{article.votes}</strong> votes
            </span>
            <span>
              💬 <strong>{article.comment_count || 0}</strong> comments
            </span>
          </div>

          <div className="divider my-2 "></div>

          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-base leading-relaxed">{article.body}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleDetail;
