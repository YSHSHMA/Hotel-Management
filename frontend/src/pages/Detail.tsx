import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryWithLoading } from "../hooks/useLoadingHooks";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import { Badge } from "../components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Globe,
  Clock,
  Car,
  Wifi,
  Waves,
  Dumbbell,
  Sparkles,
  Plane,
  Building2,
} from "lucide-react";

const Detail = () => {
  const { hotelId } = useParams();
  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { data: hotel } = useQueryWithLoading(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
      loadingMessage: "Loading hotel details...",
    }
  );

  const imageUrls = hotel?.imageUrls;

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery || !imageUrls || imageUrls.length < 2) {
      return;
    }

    const updateActiveImage = () => {
      const index = Math.round(gallery.scrollLeft / gallery.clientWidth);
      setActiveImageIndex(Math.min(index, imageUrls.length - 1));
    };

    gallery.addEventListener("scroll", updateActiveImage, { passive: true });
    updateActiveImage();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => gallery.removeEventListener("scroll", updateActiveImage);
    }

    const interval = window.setInterval(() => {
      const container = galleryContainerRef.current;
      if (
        container?.matches(":hover") ||
        container?.contains(document.activeElement) ||
        document.hidden
      ) {
        return;
      }

      const nextIndex =
        (Math.round(gallery.scrollLeft / gallery.clientWidth) + 1) %
        imageUrls.length;
      gallery.scrollTo({
        left: nextIndex * gallery.clientWidth,
        behavior: "smooth",
      });
    }, 4000);

    return () => {
      window.clearInterval(interval);
      gallery.removeEventListener("scroll", updateActiveImage);
    };
  }, [imageUrls]);

  const goToImage = (index: number) => {
    galleryRef.current?.scrollTo({
      left: index * (galleryRef.current?.clientWidth || 0),
      behavior: "smooth",
    });
    setActiveImageIndex(index);
  };

  if (!hotel) {
    return (
      <div className="text-center text-lg text-gray-500 py-10">
        No hotel found.
      </div>
    );
  }

  const amenities = hotel.amenities
    ? [
        { name: "Parking", available: hotel.amenities.parking },
        { name: "WiFi", available: hotel.amenities.wifi },
        { name: "Pool", available: hotel.amenities.pool },
        { name: "Gym", available: hotel.amenities.gym },
        { name: "Spa", available: hotel.amenities.spa },
        { name: "Restaurant", available: hotel.amenities.restaurant },
        { name: "Bar", available: hotel.amenities.bar },
        {
          name: "Airport shuttle",
          available: hotel.amenities.airportShuttle,
        },
        {
          name: "Business center",
          available: hotel.amenities.businessCenter,
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hotel.starRating }).map((_, i) => (
            <AiFillStar key={i} className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>

        {/* Location and Contact Info */}
        <div className="flex items-center gap-4 mt-2 text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>
              {hotel.city}, {hotel.country}
            </span>
          </div>
          {hotel.contact?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{hotel.contact.phone}</span>
            </div>
          )}
          {hotel.contact?.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <a
                href={hotel.contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Website
              </a>
            </div>
          )}
        </div>

        {hotel.location?.address && (
          <div className="flex items-start gap-2 mt-3 text-gray-600">
            <MapPin className="w-4 h-4 mt-1 shrink-0" />
            <address className="not-italic">
              <div>{hotel.location.address.street}</div>
              <div>
                {[
                  hotel.location.address.city,
                  hotel.location.address.state,
                  hotel.location.address.zipCode,
                  hotel.location.address.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </div>
            </address>
          </div>
        )}

        {/* Hotel Stats */}
        {((hotel.totalBookings && hotel.totalBookings > 0) ||
          (hotel.totalRevenue && hotel.totalRevenue > 0) ||
          hotel.isFeatured) && (
          <div className="flex gap-4 mt-4">
            {hotel.totalBookings && hotel.totalBookings > 0 && (
              <Badge variant="outline">{hotel.totalBookings} bookings</Badge>
            )}
            {hotel.totalRevenue && hotel.totalRevenue > 0 && (
              <Badge variant="outline">
                £{hotel.totalRevenue.toLocaleString()} revenue
              </Badge>
            )}
            {/* Rating Badge - Always show with appropriate message */}
            <Badge variant="outline" className="text-gray-600">
              {hotel.averageRating && hotel.averageRating > 0
                ? `${hotel.averageRating.toFixed(1)} avg rating`
                : "Rating feature not yet implemented"}
            </Badge>
            {hotel.isFeatured && (
              <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
            )}
          </div>
        )}

        {/* Hotel Types */}
        {hotel.type && hotel.type.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {hotel.type.map((type, index) => (
              <Badge
                key={index}
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                {type}
              </Badge>
            ))}
          </div>
        )}

        {/* Hotel Images */}
        <div ref={galleryContainerRef} className="relative mt-4">
          <div
            aria-label={`${hotel.name} photo gallery`}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth rounded-xl [&::-webkit-scrollbar]:hidden"
            ref={galleryRef}
            role="region"
            tabIndex={0}
            style={{ scrollbarWidth: "none" }}
          >
            {hotel.imageUrls.map((image: string, i: number) => (
              <div
                key={`${image}-${i}`}
                className="h-[300px] w-full flex-none snap-start"
              >
                <img
                  src={image}
                  alt={`${hotel.name} - photo ${i + 1} of ${hotel.imageUrls.length}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>

          {hotel.imageUrls.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Show previous photo"
                onClick={() =>
                  goToImage(
                    (activeImageIndex - 1 + hotel.imageUrls.length) %
                      hotel.imageUrls.length
                  )
                }
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Show next photo"
                onClick={() =>
                  goToImage((activeImageIndex + 1) % hotel.imageUrls.length)
                }
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div
                aria-label="Choose photo"
                className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/45 px-3 py-2"
                role="group"
              >
                {hotel.imageUrls.map((image: string, i: number) => (
                  <button
                    key={`gallery-dot-${image}-${i}`}
                    type="button"
                    aria-label={`Show photo ${i + 1}`}
                    aria-current={activeImageIndex === i ? "true" : undefined}
                    onClick={() => goToImage(i)}
                    className={`h-2.5 w-2.5 rounded-full transition-colors ${
                      activeImageIndex === i
                        ? "bg-emerald-400"
                        : "bg-white/80 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Price and Guest Info */}
        <div className="flex items-center justify-between mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                £{hotel.pricePerNight}
              </p>
              <p className="text-sm text-gray-600">per night</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">
                  {hotel.adultCount}
                </p>
                <p className="text-sm text-gray-600">Adults</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">
                  {hotel.childCount}
                </p>
                <p className="text-sm text-gray-600">Children</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">
              {hotel.starRating}
            </p>
            <p className="text-sm text-gray-600">Star Rating</p>
          </div>
        </div>

        {/* Hotel Description */}
        {hotel.description && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">About This Hotel</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {hotel.description}
            </p>
          </div>
        )}
      </div>

      {/* Contact Information */}
      {hotel.contact && (
        <div className="border border-slate-300 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hotel.contact.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-600" />
                <span>
                  <strong>Phone:</strong> {hotel.contact.phone}
                </span>
              </div>
            )}
            {hotel.contact.email && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-600" />
                <span>
                  <strong>Email:</strong> {hotel.contact.email}
                </span>
              </div>
            )}
            {hotel.contact.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-600" />
                <span>
                  <strong>Website:</strong>{" "}
                  <a
                    href={hotel.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Visit Website
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hotel Policies */}
      {hotel.policies && (
        <div className="border border-slate-300 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-3">Hotel Policies</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotel.policies.checkInTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span>
                  <strong>Check-in:</strong> {hotel.policies.checkInTime}
                </span>
              </div>
            )}
            {hotel.policies.checkOutTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span>
                  <strong>Check-out:</strong> {hotel.policies.checkOutTime}
                </span>
              </div>
            )}
            {hotel.policies.cancellationPolicy && (
              <div>
                <strong>Cancellation:</strong>{" "}
                {hotel.policies.cancellationPolicy}
              </div>
            )}
            {hotel.policies.petPolicy && (
              <div>
                <strong>Pet Policy:</strong> {hotel.policies.petPolicy}
              </div>
            )}
            {hotel.policies.smokingPolicy && (
              <div>
                <strong>Smoking:</strong> {hotel.policies.smokingPolicy}
              </div>
            )}
          </div>
        </div>
      )}

      {amenities.length > 0 && (
        <div className="border border-slate-300 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-3">Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {amenities.map((amenity) => (
              <div
                key={amenity.name}
                className="flex items-center justify-between gap-2"
              >
                <span>{amenity.name}</span>
                <span
                  className={
                    amenity.available
                      ? "text-green-700"
                      : "text-gray-500"
                  }
                >
                  {amenity.available ? "Available" : "Not available"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Facilities */}
      <div className="border border-slate-300 rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-3">Facilities</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {hotel.facilities.map((facility) => (
            <div key={facility} className="flex items-center gap-2">
              <div className="w-4 h-4 text-green-600">
                {facility === "Free WiFi" && <Wifi className="w-4 h-4" />}
                {facility === "Parking" && <Car className="w-4 h-4" />}
                {facility === "Airport Shuttle" && (
                  <Plane className="w-4 h-4" />
                )}
                {facility === "Outdoor Pool" && <Waves className="w-4 h-4" />}
                {facility === "Spa" && <Sparkles className="w-4 h-4" />}
                {facility === "Fitness Center" && (
                  <Dumbbell className="w-4 h-4" />
                )}
                {facility === "Family Rooms" && (
                  <Building2 className="w-4 h-4" />
                )}
                {facility === "Non-Smoking Rooms" && (
                  <Building2 className="w-4 h-4" />
                )}
                {![
                  "Free WiFi",
                  "Parking",
                  "Airport Shuttle",
                  "Outdoor Pool",
                  "Spa",
                  "Fitness Center",
                  "Family Rooms",
                  "Non-Smoking Rooms",
                ].includes(facility) && <Building2 className="w-4 h-4" />}
              </div>
              <span>{facility}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr]">
        <div className="h-fit">
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
