import { getAllArticles } from "../utils/api";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    getAllArticles()
      .then((articlesData) => {
        setArticles(articlesData);
      })
      .catch((err) => {
        setError(err.msg);
      });
  };

  if (!articles || articles.length === 0) {
    return <p>No articles found</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="card-container">
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </div>
  );
};

export default ArticleList;
