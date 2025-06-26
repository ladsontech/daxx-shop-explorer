
import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, Home, Smartphone, Headphones, Shirt, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Gadgets', href: '/gadgets', icon: Smartphone },
    { name: 'Accessories', href: '/accessories', icon: Headphones },
    { name: 'Fashion', href: '/fashion', icon: Shirt },
    { name: 'Property', href: '/property', icon: Building }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3">
                <img 
                  src="/images/logo.png" 
                  alt="Daxx Shop Logo" 
                  className="h-10 w-10 animate-[shake_3s_ease-in-out_infinite]"
                />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Daxx Shop
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Overlay */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200/50">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map(link => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200/50 z-50">
        <div className="flex justify-around items-center py-2">
          {navLinks.map(link => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.href}
                className="flex flex-col items-center py-2 px-3 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navigation;
