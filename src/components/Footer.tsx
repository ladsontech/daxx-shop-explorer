import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="amazon-dark-blue text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white font-playfair">
              Esale Uganda
            </h3>
            <p className="text-gray-300">
              Your trusted marketplace for gadgets, fashion, cosmetics, accessories, and property. 
              Quality products, competitive prices.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#gadgets" className="text-gray-300 hover:text-white transition-colors">Gadgets</a></li>
              <li><a href="#accessories" className="text-gray-300 hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#property" className="text-gray-300 hover:text-white transition-colors">Property</a></li>
              <li><a href="#cosmetics" className="text-gray-300 hover:text-white transition-colors">Cosmetics</a></li>
              <li><a href="#fashion" className="text-gray-300 hover:text-white transition-colors">Fashion</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-300" />
                <span className="text-gray-300">support@daxxshop.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-300" />
                <span className="text-gray-300">+256 751 173504</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-300" />
                <span className="text-gray-300">New Pioneer Mall</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 Esale Uganda. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;