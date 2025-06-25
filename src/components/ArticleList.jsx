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
      <div className="pt-20 min-h-screen">
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
    <section className="container mx-auto px-4 pt-20 pb-8">
      <div className="card-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => {
          return (
            <ArticleCard
              className="h-full flex flex-col justify-between"
              key={article.article_id}
              article={article}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ArticleList;
