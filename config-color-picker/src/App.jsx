import React from "react";
import { slides } from "./utils/helpers";
import { CircularProgressBar, ColorPicker, ProgressBar } from "./components";

const App = () => {
  const [progress, setProgress] = React.useState(5);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-24 items-center justify-center p-5">
      {/* <ColorPicker /> */}
      <ProgressBar value={progress} />
      <CircularProgressBar size={80} value={progress} />

      <input
        type="range"
        min={"0"}
        max={"100"}
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
      />
    </div>
  );
};

export default App;
