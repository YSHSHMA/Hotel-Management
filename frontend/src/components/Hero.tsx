
import { Search, MapPin, Calendar, Users, Star } from "lucide-react";
import AdvancedSearch from "./AdvancedSearch";

interface HeroProps {
  onSearch: (searchData: any) => void;
}

const Hero = ({ onSearch }: HeroProps) => {
  return (
    <section className="relative isolate w-full overflow-hidden bg-emerald-950">
      {/* Background image */}
      <img
        src="/image/hotel-banner.png"
        alt="Luxury hotel swimming pool"
        className="absolute inset-0 z-[-1] h-full w-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/65 via-black/35 to-black/15" />

      {/* Hero content */}
      <div className="relative z-10 px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-5 py-2 backdrop-blur-sm">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="font-medium text-white">
              Trusted by 1,00,000+ travelers
            </span>
          </div>

          <h1 className="mb-5 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl">
            Book Smart.
            <br />
            Stay <span className="text-emerald-400">Comfortable.</span>
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-white sm:text-lg md:text-xl">
            Find the perfect room, manage reservations effortlessly,
            and enjoy a seamless hotel experience.
          </p>

          <div className="mb-10 flex flex-wrap justify-center gap-x-6 gap-y-4 text-white">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              <span className="text-sm">Smart Search</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span className="text-sm">Global Destinations</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">Flexible Booking</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Search card */}
        <div className="mx-auto w-full max-w-[1400px] rounded-2xl bg-white p-4 shadow-2xl sm:p-6 lg:p-8">
          <AdvancedSearch onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
};

export default Hero;