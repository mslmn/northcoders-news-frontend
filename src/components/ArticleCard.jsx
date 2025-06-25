import { formatDate } from "../utils/dateUtils";
import { useNavigate } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`articles/${article.article_id}`);
  };

  return (
    <article
      className="card glass card-border bg-base-100 w-96 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="card-body">
        <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
          <img src={article.article_img_url} alt={article.title} />
        </div>
        <div>
          <h2 className="card-title text-lg mb-3">{article.title}</h2>
          <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
            <span>👤 {article.author}</span>
            <span>💬 {article.comment_count}</span>
            <span>👍 {article.votes}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">{formatDate(article.created_at)}</span>
            <span className="badge badge-outline badge-secondary">{article.topic}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
