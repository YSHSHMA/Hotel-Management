
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Hero from "../components/Hero";

const destinations = [
  { image: "/image/hotel1.jpeg", name: "Suite Rooms" },
  { image: "/image/hotel2.jpeg", name: "Deluxe Suites" },
  { image: "/image/hotel3.jpeg", name: "Family Rooms" },
  { image: "/image/hotel4.jpeg", name: "Business Center" },
  { image: "/image/hotel5.jpeg", name: "Ocean View" },
];

const Home = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSearch = (searchData: any) => {
    console.log("Search initiated with:", searchData);
  };

  const moveSlider = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.querySelector<HTMLElement>("[data-destination-card]");
    if (!card) return;

    const gap = 20;
    const step = card.getBoundingClientRect().width + gap;
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (maxScroll <= 0) return;

    let nextScroll = slider.scrollLeft +
      (direction === "right" ? step : -step);

    if (direction === "right" && slider.scrollLeft >= maxScroll - 5) {
      nextScroll = 0;
    } else if (direction === "left" && slider.scrollLeft <= 5) {
      nextScroll = maxScroll;
    }

    slider.scrollTo({ left: nextScroll, behavior: "smooth" });
  };

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      moveSlider("right");
    }, 3000);

    return () => window.clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const updateActiveIndex = () => {
      const card = slider.querySelector<HTMLElement>(
        "[data-destination-card]"
      );
      if (!card) return;

      const step = card.getBoundingClientRect().width + 20;
      setActiveIndex(Math.round(slider.scrollLeft / step));
    };

    slider.addEventListener("scroll", updateActiveIndex, {
      passive: true,
    });

    return () => slider.removeEventListener("scroll", updateActiveIndex);
  }, []);

  return (
    <>
      <Hero onSearch={handleSearch} />

      <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Centered heading */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Top Latest Destinations
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
              Explore breathtaking locations and create unforgettable
              travel experiences.
            </p>
          </div>

          {/* Destination slider */}
          <div
            ref={sliderRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {destinations.map((destination) => (
              <article
                key={destination.image}
                data-destination-card
                className="w-[calc((100%-60px)/4)] min-w-[calc((100%-60px)/4)] snap-start overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md max-md:w-[calc((100%-20px)/2)] max-md:min-w-[calc((100%-20px)/2)] max-sm:w-[85%] max-sm:min-w-[85%]"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-36 w-full object-cover sm:h-44 md:h-48"
                />

                <div className="flex items-center gap-2 p-3 sm:p-4">
                  <MapPin
                    size={17}
                    className="shrink-0 text-emerald-700"
                  />
                  <h3 className="truncate text-sm font-semibold text-gray-800 sm:text-base">
                    {destination.name}
                  </h3>
                </div>
              </article>
            ))}
          </div>

          {/* Green navigation buttons below images */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => moveSlider("left")}
              aria-label="Previous destinations"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-800 text-white shadow-md transition hover:bg-emerald-950"
            >
              <ChevronLeft size={24} />
            </button>

            <span className="min-w-12 text-center text-sm font-medium text-gray-500">
              {Math.min(activeIndex + 1, destinations.length)} / {destinations.length}
            </span>

            <button
              type="button"
              onClick={() => moveSlider("right")}
              aria-label="Next destinations"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-800 text-white shadow-md transition hover:bg-emerald-950"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;