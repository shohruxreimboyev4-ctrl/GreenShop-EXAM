import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import Ctm6W3Jq from "../../assets/images/1-Ctm6W3Jq.png";
import BF1Oo3xK from "../../assets/images/2-BF1Oo3xK.png";
import BispicH from "../../assets/images/3-Bi-spicH.png";
import Logo from "../../assets/images/Logo.svg";

// ✅ LOGO: o'zing import qilasan
// import Logo from "../../assets/images/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 font-sans">
      {/* ===== TOP: services + newsletter ===== */}
      <div className="w-[90%] max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 py-10">
          {/* 1 */}
          <div className="relative lg:pr-8 lg:border-r lg:border-gray-200">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
              <img src={Ctm6W3Jq} alt="" className="w-10 h-10 object-contain" />
            </div>
            <h4 className="text-[17px] font-bold text-[#3d3d3d] mb-2">
              Garden Care
            </h4>
            <p className="text-sm text-[#727272] leading-relaxed max-w-[260px]">
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>

          {/* 2 */}
          <div className="relative lg:px-8 lg:border-r lg:border-gray-200">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
              <img src={BF1Oo3xK} alt="" className="w-10 h-10 object-contain" />
            </div>
            <h4 className="text-[17px] font-bold text-[#3d3d3d] mb-2">
              Plant Renovation
            </h4>
            <p className="text-sm text-[#727272] leading-relaxed max-w-[260px]">
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>

          {/* 3 */}
          <div className="relative lg:px-8 lg:border-r lg:border-gray-200">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
              <img src={BispicH} alt="" className="w-10 h-10 object-contain" />
            </div>
            <h4 className="text-[17px] font-bold text-[#3d3d3d] mb-2">
              Watering Garden
            </h4>
            <p className="text-sm text-[#727272] leading-relaxed max-w-[260px]">
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>

          {/* Newsletter */}
          <div className="lg:pl-8">
            <h4 className="text-[18px] font-bold text-[#3d3d3d] mb-4">
              Would you like to join newsletters?
            </h4>

            <div className="flex w-full max-w-[430px] h-[40px] rounded-md overflow-hidden shadow-sm">
              <input
                type="email"
                placeholder="enter your email address..."
                className="flex-1 px-4 text-sm outline-none bg-white border border-gray-200 border-r-0 placeholder:text-gray-400 focus:border-[#46A358]"
              />
              <button className="bg-[#46A358] hover:bg-[#3d8f4d] transition-colors text-white font-bold px-7 text-sm">
                Join
              </button>
            </div>

            <p className="text-[13px] text-[#727272] leading-relaxed mt-4 max-w-[430px]">
              We usually post offers and challenges in newsletter. We're your
              online houseplant destination. We offer a wide range of
              houseplants and accessories shipped directly from our (green)house
              to yours!
            </p>
          </div>
        </div>
      </div>

      {/* ===== CONTACT BAR (✅ och aqua-green) ===== */}
      <div className="bg-[#D7F3E6] border-y border-[#CBEBDD]">
        <div className="w-[90%] max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6 items-center">
            {/* logo */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              

              <img src={Logo} alt="GreenShop" className="h-8 object-contain" />

              <div className="h-8 w-[120px]" />
            </div>

            <div className="text-[#3d3d3d] text-sm leading-snug text-center md:text-left">
              70 West Buckingham Ave.
              <br />
              Farmingdale, NY 11735
            </div>

            <div className="text-[#3d3d3d] text-sm text-center md:text-left">
              contact@greenshop.com
            </div>

            <div className="text-[#3d3d3d] text-sm text-center md:text-right">
              +88 01911 717 490
            </div>
          </div>
        </div>
      </div>

      {/* ===== LINKS + SOCIAL + PAYMENTS ===== */}
      <div className="bg-white">
        <div className="w-[90%] max-w-[1400px] mx-auto py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* My Account */}
            <div>
              <h4 className="text-[18px] font-bold text-[#3d3d3d] mb-4">
                My Account
              </h4>
              <ul className="space-y-2 text-[14px] text-[#727272]">
                <li>
                  <Link
                    to="#"
                    className="hover:text-[#46A358] transition-colors"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-[#46A358] transition-colors"
                  >
                    Our stores
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-[#46A358] transition-colors"
                  >
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-[#46A358] transition-colors"
                  >
                    Career
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-[#46A358] transition-colors"
                  >
                    Specials
                  </Link>
                </li>
              </ul>
            </div>

            {/* Help & Guide */}
            <div>
              <h4 className="text-[18px] font-bold text-[#3d3d3d] mb-4">
                Help &amp; Guide
              </h4>
              <ul className="space-y-2 text-[14px] text-[#727272]">
                <li>
                  <Link
                    to="#"
                    className="hover:text-[#46A358] transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-[#46A358] transition-colors"
                  >
                    How to Buy
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-[#46A358] transition-colors"
                  >
                    Shipping &amp; Delivery
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-[#46A358] transition-colors"
                  >
                    Product Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-[#46A358] transition-colors"
                  >
                    How to Return
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-[18px] font-bold text-[#3d3d3d] mb-4">
                Categories
              </h4>
              <ul className="space-y-2 text-[14px] text-[#727272]">
                <li>
                  <Link
                    to="#"
                    className="hover:text-[#46A358] transition-colors"
                  >
                    House Plants
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-[#46A358] transition-colors"
                  >
                    Potter Plants
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-[#46A358] transition-colors"
                  >
                    Seeds
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-[#46A358] transition-colors"
                  >
                    Small Plants
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="hover:text-[#46A358] transition-colors"
                  >
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social + Payments */}
            <div>
              <h4 className="text-[18px] font-bold text-[#3d3d3d] mb-4">
                Social Media
              </h4>

              <div className="flex items-center gap-3 mb-8">
                {[
                  { icon: <FaFacebookF />, href: "https://facebook.com" },
                  { icon: <FaInstagram />, href: "https://instagram.com" },
                  { icon: <FaTwitter />, href: "https://twitter.com" },
                  { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
                  { icon: <FaYoutube />, href: "https://youtube.com" },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-9 h-9 rounded border border-[#D9E7DB]
                      flex items-center justify-center
                      text-[#46A358]
                      bg-white
                      hover:bg-green-50 hover:border-[#46A358]/30
                      hover:scale-[1.06] active:scale-[0.96]
                      transition-all duration-200 ease-out
                    "
                  >
                    {item.icon}
                  </a>
                ))}
              </div>

              <h4 className="text-[18px] font-bold text-[#3d3d3d] mb-4">
                We accept
              </h4>

              <div className="flex items-center gap-4 flex-wrap">
                <a
                  href="https://www.paypal.com/ru/home"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://freepngimg.com/save/13626-paypal-logo-png/2272x864"
                    alt="PayPal"
                    className="h-6 object-contain"
                  />
                </a>

                <a
                  href="https://www.mastercard.uz/ru-uz.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1280px-MasterCard_Logo.svg.png"
                    alt="MasterCard"
                    className="h-6 object-contain"
                  />
                </a>

                <a
                  href="https://cis.visa.com/visa-in-uzbekistan.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://1000logos.net/wp-content/uploads/2017/06/VISA-Logo-2006.png"
                    alt="Visa"
                    className="h-6 object-contain"
                  />
                </a>

                <a
                  href="https://www.americanexpress.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4H5wB7Osnm_7IDfCwUXaiSKLpZe8AEV8iuA&s"
                    alt="Amex"
                    className="h-6 object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR (✅ qop-qora emas, ochroq dark) ===== */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="w-[90%] max-w-[1400px] mx-auto py-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-800 text-sm text-center md:text-left">
            © 2021 GreenShop. All Rights Reserved.
          </p>

          {/* pastdagi social iconlar (✅ dark bar uchun mos) */}
          <div className="flex items-center gap-3">
            {[
              { icon: <FaFacebookF />, href: "https://facebook.com" },
              { icon: <FaInstagram />, href: "https://instagram.com" },
              { icon: <FaTwitter />, href: "https://twitter.com" },
              { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
              { icon: <FaYoutube />, href: "https://youtube.com" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-8 h-8 rounded-md
                  border border-gray-300
                  flex items-center justify-center
                  text-gray-800
                  bg-white/5
                  hover:bg-gray-200 hover:text-gray-900
                  hover:border-white/30 hover:scale-[1.06]
                  active:scale-[0.96]
                  transition-all duration-200 ease-out
                "
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
