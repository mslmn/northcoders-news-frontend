import { useEffect, useState } from "react";

const ArticleCard = ({ article }) => {
  return (
    <article className="article-card">
      <div>
        <img src={article.article_img_url} alt={article.title} />
      </div>
      <div>
        <h2>{article.title}</h2>
        <div>
          <span>👤 {article.author}</span>
          <span>💬 {article.comment_count}</span>
          <span>👍 {article.votes}</span>
        </div>

        <div>
          <span>{article.created_at}</span>
          <span>{article.topic}</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
