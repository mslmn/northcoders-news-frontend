import { formatDate } from "../utils/dateUtils";

const CommentCard = ({ comment }) => {
  return (
    <section className="card bg-base-100 border border-base-200">
      <div className="card-body p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-base">{comment.author}</span>
            <span className="text-sm text-gray-500">{formatDate(comment.created_at)}</span>
          </div>

          <div className="text-sm text-gray-500">👍 {comment.votes} votes</div>
        </div>

        <div className="text-base leading-relaxed">{comment.body}</div>
      </div>
    </section>
  );
};

export default CommentCard;
