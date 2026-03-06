import React from "react";
import StarRatings from "./components/star-ratings";
import { ToastDemo, TypeAheadDemo } from "./components";

const App = () => {
  const [ratings, setRatings] = React.useState(3.5);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-24 items-center justify-center p-5">
      {/* <StarRatings value={ratings} onChange={setRatings} /> */}
      <ToastDemo />

      <TypeAheadDemo />
    </div>
  );
};

export default App;
