import React from "react";
import { initialComments } from "../utils/helpers";
import CommentItem from "./comment-item";

const CommentSection = () => {
  const [comments, setComments] = React.useState(initialComments);

  //   add comment
  const addComment = (text, parentId = null) => {
    const newComment = {
      id: Date.now(),
      author: "You",
      content: text,
      timestamp: new Date(),
      replies: [],
    };

    if (!parentId) {
      setComments([newComment, ...comments]);
    } else {
      const addReplyRecursive = (items) =>
        items.map((item) => {
          if (item.id === parentId) {
            return {
              ...item,
              replies: [...item.replies, newComment],
            };
          }

          return {
            ...item,
            replies: addReplyRecursive(item.replies),
          };
        });

      setComments(addReplyRecursive(comments));
    }
  };

  //   delete comment
  const removeComment = (id) => {
    const deleteRecursive = (items) =>
      items
        .filter((item) => item.id !== id)
        .map((item) => ({
          ...item,
          replies: deleteRecursive(item.replies),
        }));

    setComments(deleteRecursive(comments));
  };
  return (
    <div className="max-w-3xl w-full mx-auto p-6">
      <h2 className="text-2xl font-semibold text-neutral-800">Comments</h2>

      <div className="mt-6 space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={addComment}
            onDelete={removeComment}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
