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
    <section>
      <article>
        <div>
          <img src={article.article_img_url} alt={article.title} />
        </div>

        <div>
          <h1 className="bg">{article.title}</h1>

          <div>
            <span>
              👤 By <strong>{article.author}</strong>
            </span>
            <span>🗓️ {formatDate(article.created_at)}</span>
            <span>
              📁 <p className="badge ">{article.topic}</p>
            </span>
          </div>

          <div>
            <span>
              👍 <strong>{article.votes}</strong> votes
            </span>
            <span>
              💬 <strong>{article.comment_count || 0}</strong> comments
            </span>
          </div>
          <div className="divider mx-auto w-11/12 md:w-3/4 lg:w-2/3"></div>
          <div>{article.body}</div>
        </div>
      </article>
    </section>
  );
};

export default ArticleDetail;
