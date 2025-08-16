import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";
import ArticleCardSkeleton from "./ArticleCardSkeleton";

let HOME_CACHE = null; // simple module-level seed

const Home = () => {
  const [articles, setArticles] = useState(HOME_CACHE || []);
  const [loading, setLoading] = useState(!HOME_CACHE);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (HOME_CACHE) return; // already have data; no flash
    setError(null);
    setLoading(true);
    getAllArticles({ sort_by: "created_at", order: "desc" })
      .then((list) => {
        const top = list.slice(0, 6);
        HOME_CACHE = top;
        setArticles(top);
      })
      .catch((e) => setError(e?.msg || "Failed to fetch featured articles"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="pt-24 pb-24 md:pb-28">
      <section className="max-w-6xl mx-auto px-4">
        <div className="hero bg-base-200 rounded-2xl shadow-sm">
          <div className="hero-content text-center py-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold">Your daily dose of Northcoders</h1>
              <p className="py-4 text-base md:text-lg opacity-80">
                Read the latest from the community. Filter by topics, sort by votes or comments, and
                dive into discussions.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/articles" className="btn btn-primary">
                  Browse Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mt-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl md:text-2xl font-semibold">Featured</h2>
          <Link to="/articles" className="btn btn-sm btn-ghost">
            View all
          </Link>
        </div>

        {loading ? (
          <div className="grid-auto-cards gap-7 items-stretch">
            {Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="alert alert-error mt-2">
            <span>{error}</span>
          </div>
        ) : (
          <div className="grid-auto-cards gap-7 items-stretch">
            {articles.map((a) => (
              <ArticleCard key={a.article_id} article={a} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
