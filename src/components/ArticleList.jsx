import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getAllArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";
import ArticleCardSkeleton from "./ArticleCardSkeleton";
import ArticlesFilterSidebar from "./ArticlesFilterSidebar";

let LAST_LIST = null;

const ArticleList = () => {
  const [articles, setArticles] = useState(LAST_LIST || []);
  const [loading, setLoading] = useState(!LAST_LIST);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const topic = searchParams.get("topic") || "";
  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setError(null);
    setLoading(articles.length === 0);

    getAllArticles({ topic, sort_by, order })
      .then((list) => {
        setArticles(list);
        LAST_LIST = list;
      })
      .catch((e) => setError(e?.msg || "Failed to fetch articles"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [topic, sort_by, order]);

  const resultText = `${articles.length} article${articles.length !== 1 ? "s" : ""}${
    topic ? ` in “${topic}”` : ""
  }`;

  return (
    <div className="drawer lg:drawer-open pt-20">
      <input id="filters-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl md:text-3xl font-bold">Articles</h1>
            <label htmlFor="filters-drawer" className="btn btn-outline btn-sm lg:hidden">
              Filters
            </label>
          </div>
          <p className="text-sm opacity-70 mb-4">{resultText}</p>

          {loading ? (
            <div className="grid-auto-cards gap-7 items-stretch">
              {Array.from({ length: 9 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="alert alert-error mt-2">
              <span>{error}</span>
            </div>
          ) : articles.length === 0 ? (
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body items-center text-center">
                <h3 className="card-title">No results</h3>
                <p className="opacity-70">Try changing topic, sort, or order.</p>
                <Link to="/articles" className="btn btn-sm btn-ghost mt-2">
                  Reset filters
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid-auto-cards gap-7 items-stretch">
              {articles.map((a) => (
                <ArticleCard key={a.article_id} article={a} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="filters-drawer" className="drawer-overlay" />
        <ArticlesFilterSidebar />
      </div>
    </div>
  );
};

export default ArticleList;
