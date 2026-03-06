import React from "react";
import TypeAhead from "./type-ahead";

const TypeAheadDemo = () => {
  const techStacks = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "Tailwind CSS",
    "Bootstrap",
    "Redux",
    "Zustand",
    "Prisma",
    "PostgreSQL",
    "MongoDB",
    "Firebase",
    "GraphQL",
    "REST API",
    "Docker",
    "Kubernetes",
    "AWS",
    "Vercel",
    "Netlify",
    "Jest",
    "Cypress",
  ];

  const handleSelect = (item) => {
    console.log("Selected Item : ", item);
  };
  return (
    <div className="flex flex-col gap-12 items-center justify-center p-6">
      <h1 className="text-2xl">Type Ahead Component</h1>

      <TypeAhead
        data={techStacks}
        placeholder="Search tech stacks..."
        onSelect={handleSelect}
      />
    </div>
  );
};

export default TypeAheadDemo;
