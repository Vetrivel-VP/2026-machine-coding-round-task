import React from "react";
import { SendHorizonal } from "lucide-react";

const CommentForm = ({ onSubmit, small = false }) => {
  const [text, setText] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mt-4">
      <input
        type="text"
        placeholder="write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`flex-1 border border-gray-200 rounded-lg px-4 ${small ? "py-2 text-sm" : "py-3"} focus:outline-none focus:ring-2 focus:ring-indigo-400`}
      />

      <button type="submit">
        <SendHorizonal
          size={18}
          className="text-indigo-500 hover:text-indigo-800 cursor-pointer"
        />
      </button>
    </form>
  );
};

export default CommentForm;
