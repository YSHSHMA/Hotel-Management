import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const destinations = [
  {
    city: "Jaipur",
    state: "Rajasthan",
    description: "Explore historic forts, colorful bazaars, and royal architecture.",
    image:
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1000&q=80",
  },
  {
    city: "Udaipur",
    state: "Rajasthan",
    description: "Discover lakeside palaces and the winding lanes of the old city.",
    image:
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1000&q=80",
  },
  {
    city: "Mumbai",
    state: "Maharashtra",
    description: "Experience India's lively coastal metropolis and food scene.",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    city: "Goa",
    state: "Goa",
    description: "Find relaxed beaches, Portuguese heritage, and coastal escapes.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80",
  },
  {
    city: "Kochi",
    state: "Kerala",
    description: "Enjoy waterfront heritage, local art, and Kerala cuisine.",
    image:
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1000&q=80",
  },
  {
    city: "Munnar",
    state: "Kerala",
    description: "Unwind among tea gardens and the green Western Ghats.",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
  },
  {
    city: "Varanasi",
    state: "Uttar Pradesh",
    description: "Explore the riverfront ghats and centuries-old neighborhoods.",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80",
  },
  {
    city: "Agra",
    state: "Uttar Pradesh",
    description: "Visit the Taj Mahal and the historic sights around Agra.",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80",
  },
  {
    city: "Rishikesh",
    state: "Uttarakhand",
    description: "Combine riverside calm, yoga, and Himalayan adventures.",
    image:
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80",
  },
  {
    city: "Shimla",
    state: "Himachal Pradesh",
    description: "Take in mountain views and the heritage streets of the hills.",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1000&q=80",
  },
  {
    city: "Bengaluru",
    state: "Karnataka",
    description: "Explore green spaces, cafés, and India's technology capital.",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80",
  },
  {
    city: "Hyderabad",
    state: "Telangana",
    description: "Discover historic landmarks and the city's celebrated cuisine.",
    image:
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1000&q=80",
  },
];

const Destinations = () => (
  <main className="mx-auto max-w-7xl space-y-8">
    <header className="rounded-2xl bg-gradient-to-r from-emerald-950 to-emerald-800 px-6 py-10 text-white sm:px-10">
      <p className="font-semibold uppercase tracking-[0.2em] text-emerald-200">
        Find your next stay
      </p>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
        Explore destinations across India
      </h1>
      <p className="mt-3 max-w-2xl text-emerald-50">
        Browse city stays, hill retreats, heritage hotels, and coastal escapes.
        Choose a destination to see available hotel listings.
      </p>
    </header>

    <section
      aria-label="Featured Indian destinations"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {destinations.map((destination) => (
        <article
          key={destination.city}
          className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <img
            src={destination.image}
            alt={`${destination.city}, India`}
            className="h-52 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
          <div className="space-y-3 p-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {destination.city}
              </h2>
              <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                {destination.state}, India
              </p>
            </div>
            <p className="text-sm leading-6 text-gray-600">
              {destination.description}
            </p>
            <Link
              to={`/search?destination=${encodeURIComponent(destination.city)}`}
              className="inline-flex items-center gap-2 font-semibold text-emerald-800 hover:text-emerald-950"
            >
              Browse hotels <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </article>
      ))}
    </section>
  </main>
);

export default Destinations;
