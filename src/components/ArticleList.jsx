import { getAllArticles } from "../utils/api";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    setLoading(true);
    getAllArticles()
      .then((articlesData) => {
        setArticles(articlesData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.msg);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-base-200">
        <div className="flex flex-col items-center justify-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!articles || articles.length === 0) {
    return <p>No articles found</p>;
  }

  return (
    <section className="card-container relative">
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </section>
  );
};

export default ArticleList;
