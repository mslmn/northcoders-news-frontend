import { getArticleById } from "../utils/api";
import { formatDate } from "../utils/dateUtils";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import CommentsList from "./CommentsList";
import ArticleVotes from "./ArticleVotes";
import ArticleDetailSkeleton from "./ArticleDetailSkeleton";

const ArticleDetail = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const seed = location.state?.articlePrefetch;
  const matchesSeed = seed && String(seed.article_id) === String(articleId);

  const [article, setArticle] = useState(matchesSeed ? seed : null);
  const [loading, setLoading] = useState(!matchesSeed);
  const [error, setError] = useState(null);

  useEffect(() => {
    const maybeSeed = location.state?.articlePrefetch;
    if (maybeSeed && String(maybeSeed.article_id) === String(articleId)) {
      setArticle(maybeSeed);
      setLoading(false);
    } else {
      setLoading(!article);
    }

    setError(null);
    getArticleById(articleId)
      .then((data) => setArticle(data))
      .catch((e) => setError(e?.msg || "Failed to load article."))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [articleId]);

  const onVoteUpdate = (updated) => setArticle(updated);
  const back = () => (window.history.length > 1 ? navigate(-1) : navigate("/articles"));

  if (!article && loading) {
    return (
      <main className="pt-24 min-h-screen">
        <ArticleDetailSkeleton />
      </main>
    );
  }

  if (error && !article) {
    return (
      <main className="pt-24 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-4">
          <button
            onClick={back}
            className="btn btn-md normal-case gap-2 bg-base-100 ring-1 ring-base-300/40 shadow-sm hover:ring-base-300 hover:shadow-md text-base px-4"
            aria-label="Go back"
          >
            ← Back
          </button>
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 min-h-screen">
      <section className="max-w-5xl mx-auto px-4">
        <button
          onClick={back}
          className="btn btn-md normal-case gap-2 bg-base-100 ring-1 ring-base-300/40 shadow-sm hover:ring-base-300 hover:shadow-md text-base px-4 mb-4"
          aria-label="Go back to previous page"
        >
          ← Back
        </button>

        <div className="card bg-base-100 shadow-md ring-1 ring-base-300/40">
          <figure
            className="w-full overflow-hidden rounded-t-2xl"
            style={{ aspectRatio: "16 / 9" }}
          >
            <img
              src={article.article_img_url}
              alt={article.title}
              className="w-full h-full object-cover object-center"
            />
          </figure>

          <div className="card-body p-6 sm:p-8">
            <h1 className="card-title text-3xl font-bold">{article.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm opacity-80">
              <span>
                👤 <strong>{article.author}</strong>
              </span>
              <span>🗓️ {formatDate(article.created_at)}</span>
              <span className="badge badge-outline badge-secondary">📁 {article.topic}</span>
            </div>

            <div className="flex gap-4 mt-2">
              <ArticleVotes article={article} onVoteUpdate={onVoteUpdate} />
            </div>

            <div className="divider my-4 before:bg-base-300 after:bg-base-300" />

            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-base leading-relaxed">{article.body}</div>
            </div>

            {error && (
              <div className="alert alert-warning mt-4">
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 mt-8 pb-16">
        <div className="card bg-base-100 shadow-md ring-1 ring-base-300/40">
          <div className="card-body p-6 sm:p-8">
            <CommentsList articleId={articleId} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ArticleDetail;
