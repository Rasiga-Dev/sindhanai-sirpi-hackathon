import { useEffect, useState } from "react";

const ImageSlider = () => {
  const images = [
    "slider1.jpg",
    "kanimozhli lightson1.jpg",
    "keethajevan lightson.jpg",
    "radhakrishnan lightson.jpg",
    "ilambagavath lightson.jpg",
    "ambalavanan lightson.jpg",
    "group pic1.jpg",
    "group pic.jpg",
    "group pic1.jpg",
    "group pic.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // 6 seconds per image

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative bg-white p-0 rounded-3xl shadow-2xl overflow-hidden">
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="w-full h-[700px] object-cover rounded-3xl transition-all duration-1000 ease-in-out"
      />

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === current ? "bg-white" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default ImageSlider;
