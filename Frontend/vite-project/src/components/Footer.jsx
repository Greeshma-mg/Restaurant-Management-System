import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
  
        <div>
          <h6 className="text-lg font-bold">About Us</h6>
          <p className="text-sm mt-2">
            Welcome to RestaurantPro – your all-in-one restaurant management system!
          </p>
        </div>

        <div>
          <h6 className="text-lg font-bold">Quick Links</h6>
          <ul className="mt-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Menu</a></li>
            <li><a href="#" className="hover:underline">Reservations</a></li>
            <li><a href="#" className="hover:underline">Order Online</a></li>
          </ul>
        </div>
        <div>
          <h6 className="text-lg font-bold">Contact</h6>
          <p className="text-sm mt-2">123 Food Street, kochi, kerala</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
          <p className="text-sm">Email: support@restaurantpro.com</p>
        </div>

        {/* Social Media */}
        <div>
          <h6 className="text-lg font-bold">Follow Us</h6>
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-xl hover:text-blue-500"><FaFacebook /></a>
            <a href="#" className="text-xl hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="text-xl hover:text-blue-300"><FaTwitter /></a>
            <a href="#" className="text-xl hover:text-red-500"><FaYoutube /></a>
          </div>
        </div>

      </div>

      <div className="mt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} RestaurantPro. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
