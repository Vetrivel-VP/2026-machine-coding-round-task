import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ slides = [], autoPlay = true, interval = 3000 }) => {
  const [current, setCurrent] = React.useState(0);

  const timeourRef = React.useRef(null);
  //   const containerRef = React.useRef(null);

  const totalSlides = slides.length;

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  const next = () => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  };

  //   autoplay
  React.useEffect(() => {
    if (!autoPlay) return;
    timeourRef.current = setTimeout(next, interval);
    return () => clearTimeout(timeourRef.current);
  }, [current, autoPlay, interval]);

  //   keyboard support

  React.useEffect(() => {
    const handleKey = (e) => {
      console.log(e);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg bg-white"
      onMouseEnter={() => clearTimeout(timeourRef.current)}
      onMouseLeave={() =>
        autoPlay && (timeourRef.current = setTimeout(next, interval))
      }
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full h-105 flex items-center justify-center relative"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 text-center text-white px-6">
              <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
              <p className="text-lg opacity-90">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* prev // next */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md transition cursor-pointer"
      >
        <ChevronLeft />
      </button>

      <button
        type="button"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md transition cursor-pointer"
      >
        <ChevronRight />
      </button>

      {/* indicators */}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            type="button"
            key={i}
            className={`h-2.5 rounded-full transition-all duration-300 ${current === i ? "w-8 bg-white" : "w-2.5 bg-white/50"}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
