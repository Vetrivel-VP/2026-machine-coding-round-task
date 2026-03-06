import React from "react";
import { slides } from "./utils/helpers";
import { Carousel } from "./components";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <Carousel slides={slides} />
    </div>
  );
};

export default App;
