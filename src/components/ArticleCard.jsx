import { Link } from "react-router-dom";
import { formatDate } from "../utils/dateUtils";

const ArticleCard = ({ article }) => {
  return (
    <article className="relative rounded-2xl bg-base-100 ring-1 ring-base-300/70 shadow-md hover:shadow-lg hover:ring-base-300 transition">
      <Link
        to={`/articles/${article.article_id}`}
        state={{ articlePrefetch: article }}
        className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-200"
        aria-label={`Open article: ${article.title}`}
      >
        <div className="p-5 flex flex-col gap-3 h-full">
          <figure
            className="relative w-full overflow-hidden rounded-xl bg-base-200"
            style={{ aspectRatio: "16 / 10" }}
          >
            <img
              src={article.article_img_url}
              alt={article.title}
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </figure>

          <h2 className="text-lg md:text-xl font-semibold leading-snug line-clamp-2">
            {article.title}
          </h2>

          <div className="text-sm opacity-80 flex flex-wrap gap-x-4 gap-y-1">
            <span>👤 {article.author}</span>
            <span>💬 {article.comment_count}</span>
            <span>👍 {article.votes}</span>
          </div>

          <div className="mt-auto pt-3 border-t border-base-300/60 flex items-center justify-between">
            <span className="text-xs opacity-70">{formatDate(article.created_at)}</span>
            <span className="badge badge-outline badge-secondary capitalize">{article.topic}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ArticleCard;
