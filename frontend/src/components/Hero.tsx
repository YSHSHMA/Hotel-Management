import { Search, MapPin, Calendar, Users, Star } from "lucide-react";
import AdvancedSearch from "./AdvancedSearch";

const Hero = ({ onSearch }: { onSearch: (searchData: any) => void }) => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0B3D2E 0%, #145A41 50%, #1F7A59 100%)",
      }}
    >
      {/* Background Pattern */}
            <div className="absolute inset-0 bg-[rgba(255,255,255,0.09)]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 via-indigo-500/15 to-transparent" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full blur-xl animate-bounce-gentle" />
      <div
        className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full blur-xl animate-bounce-gentle"
        style={{ animationDelay: "1s" }}
      />

      <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white/90 font-medium">
              Trusted by 1,00,000+ travelers
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Book Smart. Stay Comfortable
            {/* <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Dream Stay
            </span> */}
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
          Find the perfect room, manage reservations effortlessly, and enjoy a seamless hotel experience.
          
            <br className="hidden md:block" />
            {/* From check-in to check-out, we've got everything covered. */}
          </p>

          {/* Feature Icons */}
          <div className="flex justify-center items-center space-x-8 mb-12">
            <div className="flex items-center text-white/80">
              <Search className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Findings</span>
            </div>
            <div className="flex items-center text-white/80">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Get Destinations</span>
            </div>
            <div className="flex items-center text-white/80">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Unbelievable Experience</span>
            </div>
            <div className="flex items-center text-white/80">
              <Users className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">24/7 Calling Support</span>
            </div>
          </div>
        </div>

        {/* Advanced Search Component */}
        <div className="max-w-8xl mx-auto">
          <AdvancedSearch onSearch={onSearch} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
