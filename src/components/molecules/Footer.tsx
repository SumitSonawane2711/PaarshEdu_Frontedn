import { Link } from "react-router-dom";
import Logo from "../atoms/Logo";

function Footer() {
  return (
    <footer className=" border-t bg-[#050914] border-slate-400 py-10">
      <div className="container mx-auto px-8 sm:px-20">
        {/* Footer Top Section */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-10">
          {/* Logo and Description */}
          <div className="flex flex-col space-y-4">
            <Logo className="" width="250px" />
            <p className="text-slate-300">
              Education is a door to the future & Paarsh E-Learning is the key
              to brightening it.
            </p>
            {/* Social Links */}
            <div className="flex gap-5">
              <a href="#" aria-label="Facebook">
                <img
                  src="https://th.bing.com/th/id/OIP.CCh8_VogLJ1Jiwuqg5EwXQAAAA?pid=ImgDet&w=145&h=156.6&c=7"
                  alt="Facebook"
                  className="w-7 h-7 rounded-full"
                />
              </a>
              <a href="#" aria-label="Instagram">
                <img
                  src="https://th.bing.com/th/id/OIP.Oq0naf1e4eP4guc47e3vfwHaHa?pid=ImgDet&w=145&h=145&c=7"
                  alt="Instagram"
                  className="w-7 h-7 rounded-full"
                />
              </a>
              <a href="#" aria-label="LinkedIn">
                <img
                  src="https://th.bing.com/th/id/OIP.FPjQ2OolWgNHEDLXkIf98AHaF2?pid=ImgDet&w=145&h=145&c=7"
                  alt="LinkedIn"
                  className="w-7 h-7 rounded-full"
                />
              </a>
              <a href="#" aria-label="Twitter">
                <img
                  src="https://th.bing.com/th/id/OIP.GXs2WSLR6jqhqTL_m72kpgHaFP?pid=ImgDet&w=145&h=102.53778157969775&c=7"
                  alt="Twitter"
                  className="w-7 h-7 rounded-full"
                />
              </a>
            </div>
          </div>

          {/* Paarsh Infotech Links */}
          <div className="text-[#C1C1C1]">
            <h3 className="text-xs font-semibold uppercase mb-6">
              Paarsh Infotech
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-base font-medium hover:text-gray-700"
                  to="/"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium hover:text-gray-700"
                  to="/"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium hover:text-gray-700"
                  to="/"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="text-[#C1C1C1]">
            <h3 className="text-xs font-semibold uppercase mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-base font-medium hover:text-gray-700"
                  to="/"
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium hover:text-gray-700"
                  to="/"
                >
                  Help
                </Link>
              </li>
              <li>
                <Link
                  className="text-base font-medium hover:text-gray-700"
                  to="/"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-t-[#C1C1C1] pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-[#C1C1C1] mb-4 md:mb-0">
              &copy; 2023 Paarsh E-Learning. All rights reserved.
            </p>
            <div className="flex gap-3 text-[#C1C1C1]">
              <Link className="hover:text-gray-700" to="/">
                Terms & Conditions
              </Link>
              <Link className="hover:text-gray-700" to="/">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
