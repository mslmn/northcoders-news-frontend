import { useEffect, useState } from "react";

const ArticleCard = ({ article }) => {
  return (
    <article className="card glass card-border bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        <div className="">
          <img src={article.article_img_url} alt={article.title} />
        </div>
        <div>
          <h2 className="card-title">{article.title}</h2>
          <div>
            <span>👤 {article.author}</span>
            <span>💬 {article.comment_count}</span>
            <span>👍 {article.votes}</span>
          </div>

          <div className="justify-end">
            <span>{article.created_at}</span>
            <span className="badge badge-outline badge-secondary">{article.topic}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
