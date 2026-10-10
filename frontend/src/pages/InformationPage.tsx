import { Mail, MapPin } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

type InfoPageContent = {
  title: string;
  introduction: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
};

const pages: Record<string, InfoPageContent> = {
  about: {
    title: "About HBM",
    introduction:
      "HBM helps travelers discover accommodations and gives hotel owners tools to manage their listings and reservations.",
    sections: [
      {
        heading: "A simpler way to plan a stay",
        body: "Search stays by destination, guest capacity, hotel type, facilities, and price. Review listing details and choose the accommodation that suits your trip.",
      },
      {
        heading: "Built for travelers and hotel owners",
        body: "Travelers can manage bookings in one place, while hotel owners can create and maintain property listings through the platform.",
      },
      {
        heading: "Browse with confidence",
        body: "Each listing includes property information such as location, facilities, contact details, and policies. Please confirm important arrangements directly with the property before travel.",
      },
    ],
  },
  contact: {
    title: "Contact HBM",
    introduction:
      "Need help with the website or have a question about a listing? Get in touch with our support team.",
    sections: [
      {
        heading: "Email support",
        body: "Send your question to our support inbox. Include the hotel name or booking reference if your request is about a reservation.",
      },
      {
        heading: "Property questions",
        body: "For current availability, check-in arrangements, accessibility, or property-specific requests, use the contact details shown on the hotel detail page.",
      },
    ],
  },
  help: {
    title: "Help Center",
    introduction:
      "Quick answers to common questions about finding hotels and using HBM.",
    sections: [
      {
        heading: "How do I find a hotel?",
        body: "Use the search form to enter a destination, travel dates, and guest counts. Refine results with the available price, rating, hotel-type, and facility filters.",
      },
      {
        heading: "Where can I see property information?",
        body: "Open a listing using View Details & Book to review its photos, location, facilities, contact information, and policies.",
      },
      {
        heading: "How do I find my reservation?",
        body: "Sign in and open My Bookings to review reservations associated with your account.",
      },
      {
        heading: "Need more help?",
        body: "Email the support team and include enough information for us to understand your question.",
      },
    ],
  },
  "booking-guide": {
    title: "Booking Guide",
    introduction:
      "Use these steps to search for a stay and complete a reservation on HBM.",
    sections: [
      {
        heading: "1. Search for a destination",
        body: "Enter a city or country, your check-in and check-out dates, and the number of guests. You can also browse hotels from the Destinations page.",
      },
      {
        heading: "2. Compare listings",
        body: "Review prices, ratings, room capacity, facilities, photos, location, and property policies before choosing a hotel.",
      },
      {
        heading: "3. Review your stay",
        body: "Open View Details & Book, enter your guest and stay information, and review the total before continuing to payment.",
      },
      {
        heading: "4. Check your booking",
        body: "After completing the booking, sign in and visit My Bookings to see the reservation details and status.",
      },
    ],
  },
  "cancellation-policy": {
    title: "Cancellation Policy",
    introduction:
      "Cancellation terms can vary by hotel and reservation. The policy shown on the hotel detail page and during booking applies to that stay.",
    sections: [
      {
        heading: "Before you book",
        body: "Read the listing's cancellation policy and any deadline or fee shown before you confirm payment. Some reservations may be non-refundable.",
      },
      {
        heading: "Requesting a cancellation",
        body: "Contact the property using the details on its listing and keep your booking reference available. Any refund depends on the terms of that reservation.",
      },
      {
        heading: "Changes and support",
        body: "If you need help understanding a reservation, contact HBM support with your booking reference. HBM cannot promise a cancellation or refund outside the property's stated terms.",
      },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    introduction:
      "This page summarizes how the HBM demo platform uses information needed to provide hotel search, accounts, and booking features.",
    sections: [
      {
        heading: "Information you provide",
        body: "Account, guest, and reservation details are used to operate the features you request, such as signing in, making bookings, and managing hotel listings.",
      },
      {
        heading: "Information shared for a booking",
        body: "Details needed to fulfil a reservation may be processed by the platform and relevant payment or accommodation providers.",
      },
      {
        heading: "Account and security",
        body: "Authentication information is used to protect account features. Do not share passwords or payment details in support messages.",
      },
      {
        heading: "Questions",
        body: "For questions about information associated with your account, contact the HBM support email.",
      },
    ],
  },
  "terms-of-service": {
    title: "Terms of Service",
    introduction:
      "By using HBM, you agree to use the platform lawfully and to provide accurate information when creating an account or making a booking.",
    sections: [
      {
        heading: "Listings and reservations",
        body: "Property information is provided to help you compare stays. Availability, amenities, prices, and reservation terms are subject to confirmation by the property and the booking flow.",
      },
      {
        heading: "Your account",
        body: "You are responsible for safeguarding your sign-in credentials and for activity performed through your account.",
      },
      {
        heading: "Acceptable use",
        body: "Do not misuse the platform, attempt to access another person's account, submit deceptive information, or interfere with the service.",
      },
      {
        heading: "Demo service",
        body: "Some property details and contact information in this development instance are sample data and may not represent real accommodations.",
      },
    ],
  },
  "cookie-policy": {
    title: "Cookie Policy",
    introduction:
      "HBM uses browser storage and cookies to support authentication and remember information needed by the application.",
    sections: [
      {
        heading: "Authentication",
        body: "The application uses session credentials to keep you signed in and send authenticated requests.",
      },
      {
        heading: "Preferences and browser storage",
        body: "Some application state may be kept in browser storage so features continue to work as you navigate between pages.",
      },
      {
        heading: "Managing stored data",
        body: "You can clear cookies and site storage through your browser settings. Doing so may sign you out or reset saved application state.",
      },
    ],
  },
};

const InformationPage = () => {
  const { slug } = useParams();
  const page = slug ? pages[slug] : undefined;

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="mx-auto max-w-4xl space-y-8">
      <header className="rounded-2xl bg-gradient-to-r from-emerald-950 to-emerald-800 px-6 py-10 text-white sm:px-10">
        <p className="font-semibold uppercase tracking-[0.2em] text-emerald-200">
          HBM information
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{page.title}</h1>
        <p className="mt-3 max-w-3xl leading-7 text-emerald-50">
          {page.introduction}
        </p>
      </header>

      {slug === "contact" && (
        <section className="grid gap-4 sm:grid-cols-2">
          <a
            href="mailto:support@hbm.com"
            className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-emerald-700"
          >
            <Mail className="mt-1 h-5 w-5 text-emerald-800" />
            <span>
              <span className="block font-semibold text-gray-900">
                Email support
              </span>
              <span className="mt-1 block text-emerald-800">
                support@hbm.com
              </span>
            </span>
          </a>
          <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <MapPin className="mt-1 h-5 w-5 text-emerald-800" />
            <span>
              <span className="block font-semibold text-gray-900">
                Property-specific help
              </span>
              <span className="mt-1 block text-gray-600">
                Contact the hotel using the details on its listing.
              </span>
            </span>
          </div>
        </section>
      )}

      <div className="space-y-5">
        {page.sections.map((section) => (
          <section
            key={section.heading}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              {section.heading}
            </h2>
            <p className="mt-3 leading-7 text-gray-600">{section.body}</p>
            {section.bullets && (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-600">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <p className="text-center text-sm text-gray-600">
        Looking for a place to stay?{" "}
        <Link
          to="/search"
          className="font-semibold text-emerald-800 hover:underline"
        >
          Browse hotels
        </Link>
      </p>
    </main>
  );
};

export default InformationPage;
