
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Hero from "../components/Hero";

const destinations = [
  {
    image: "/image/hotel1.jpeg",
    name: "Suite Rooms",
    description:
      "Relax in a spacious suite with a comfortable lounge and thoughtfully chosen details.",
    rating: 4.9,
  },
  {
    image: "/image/hotel2.jpeg",
    name: "Deluxe Suites",
    description:
      "Enjoy an elevated stay with elegant interiors, extra space, and premium comforts.",
    rating: 4.8,
  },
  {
    image: "/image/hotel3.jpeg",
    name: "Family Rooms",
    description:
      "Room for everyone to unwind, with flexible space for a more comfortable family trip.",
    rating: 4.8,
  },
  {
    image: "/image/hotel4.jpeg",
    name: "Business Center",
    description:
      "Stay productive with a convenient workspace and amenities for business travel.",
    rating: 4.7,
  },
  {
    image: "/image/hotel5.jpeg",
    name: "Ocean View",
    description:
      "Wake up to calming coastal views and enjoy a restful escape by the water.",
    rating: 4.9,
  },
  {
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80",
    name: "Mountain Retreat",
    description:
      "Take in fresh mountain air and unwind in a peaceful setting surrounded by nature.",
    rating: 4.8,
  },
  {
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
    name: "Poolside Escape",
    description:
      "Spend a relaxing day by the pool and enjoy a little extra time to recharge.",
    rating: 4.9,
  },
  {
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1000&q=80",
    name: "Garden Retreat",
    description:
      "Find a quiet corner to relax, surrounded by welcoming spaces and greenery.",
    rating: 4.7,
  },
  {
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
    name: "Heritage Stay",
    description:
      "Enjoy character-filled interiors and a stay inspired by local history.",
    rating: 4.8,
  },
  {
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=80",
    name: "City Lights",
    description:
      "Make the most of a stylish city base close to dining, shopping, and attractions.",
    rating: 4.7,
  },
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

                <div className="space-y-2 p-3 sm:p-4">
                  <h3 className="truncate text-sm font-semibold text-gray-800 sm:text-base">
                    {destination.name}
                  </h3>
                  <p className="min-h-10 text-sm leading-5 text-gray-600">
                    {destination.description}
                  </p>
                </div>

                <div className="space-y-2 p-3 sm:p-4">
                  <div
                    aria-label={`Sample guest rating ${destination.rating} out of 5`}
                    className="flex items-center gap-1"
                    role="img"
                  >
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        aria-hidden="true"
                        className={`h-4 w-4 ${
                          index < Math.round(destination.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs font-semibold text-gray-700">
                      {destination.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-500">
                      sample rating
                    </span>
                  </div>
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