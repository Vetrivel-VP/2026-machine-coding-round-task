import React from "react";
import CommentForm from "./comment-form";

const CommentItem = ({ comment, onReply, onDelete, depth = 0 }) => {
  const [isReplying, setIsReplying] = React.useState(false);

  return (
    <div
      className={`bg-white shadow-md rounded-xl p-4 transition hover:shadow-lg`}
      style={{ marginLeft: depth * 20 }}
    >
      <div className="flex items-start placeholder-gray-300 gap-3">
        <div className="h-10 w-10 rounded-full bg-indigo-500 text-white flex items-center justify-center text-lg font-bold">
          {comment.author.charAt(0)}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-semibold text-neutral-500">
              {comment.author}
            </h4>

            <span>
              {new Date(comment.timestamp).toLocaleDateString("en-US", {
                dateStyle: "medium",
              })}
            </span>
          </div>

          <p className="text-neutral-600 mt-1">{comment.content}</p>

          <div className="flex gap-4 mt-3 text-sm">
            <button
              onClick={() => setIsReplying((prev) => !prev)}
              type="button"
              className="text-indigo-600 cursor-pointer hover:text-indigo-800 font-medium"
            >
              Reply
            </button>

            <button
              type="button"
              onClick={() => onDelete(comment.id)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          </div>

          {isReplying && (
            <div className="mt3">
              <CommentForm
                onSubmit={(text) => {
                  onReply(text, comment.id);
                  setIsReplying(false);
                }}
                small
              />
            </div>
          )}

          {comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
