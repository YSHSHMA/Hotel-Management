import { Building2, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Hotels", to: "/search" },
  { label: "Destinations", to: "/destinations" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const supportLinks = [
  { label: "Help Center", to: "/help" },
  { label: "Booking Guide", to: "/booking-guide" },
  { label: "Cancellation Policy", to: "/cancellation-policy" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms-of-service" },
];

const Footer = () => (
  <footer className="bg-gradient-to-r from-[#0B3D2E] via-[#145A41] to-[#1F7A59] text-white">
    <div className="mx-auto max-w-8xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="rounded-lg bg-white p-2">
              <Building2 className="h-6 w-6 text-primary-600" />
            </span>
            <span className="text-2xl font-bold">HBM</span>
          </Link>
          <p className="leading-relaxed text-gray-300">
            Discover stays, compare hotel details, and manage reservations in
            one place.
          </p>
        </div>

        <nav aria-label="Quick links" className="space-y-4">
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Support links" className="space-y-4">
          <h2 className="text-lg font-semibold">Support</h2>
          <ul className="space-y-2">
            {supportLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/cookie-policy"
                className="text-gray-300 transition-colors hover:text-white"
              >
                Cookie Policy
              </Link>
            </li>
          </ul>
        </nav>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <a
            href="mailto:support@hbm.com"
            className="inline-flex items-center gap-3 text-gray-300 transition-colors hover:text-white"
          >
            <Mail className="h-5 w-5 shrink-0 text-emerald-200" />
            support@hbm.com
          </a>
          <p className="text-sm leading-6 text-gray-300">
            For property-specific questions, contact the hotel using the
            information on its listing.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-emerald-700 pt-6 text-sm text-gray-300 md:flex-row">
        <p>© {new Date().getFullYear()} HBM. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <Link to="/privacy-policy" className="hover:text-white">
            Privacy
          </Link>
          <Link to="/terms-of-service" className="hover:text-white">
            Terms
          </Link>
          <Link to="/cookie-policy" className="hover:text-white">
            Cookies
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
