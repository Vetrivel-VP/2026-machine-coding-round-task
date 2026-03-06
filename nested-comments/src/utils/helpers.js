export const initialComments = [
  {
    id: 1,
    author: "Ravi",
    content: "This is a top level comment.",
    timestamp: new Date(),
    replies: [
      {
        id: 2,
        author: "Arun",
        content: "This is a nested reply.",
        timestamp: new Date(),
        replies: [],
      },
    ],
  },
];
