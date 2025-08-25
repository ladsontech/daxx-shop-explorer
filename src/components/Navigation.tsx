import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, Home, Smartphone, Headphones, Palette, Shirt, Building, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  const location = useLocation();

  const navLinks = [{
    name: 'Home',
    href: '/',
    icon: Home
  }, {
    name: 'Gadgets',
    href: '/gadgets',
    icon: Smartphone
  }, {
    name: 'Fashion',
    href: '/fashion',
    icon: Shirt
  }, {
    name: 'Property',
    href: '/property',
    icon: Building
  }];

  const handleCallClick = () => {
    window.location.href = 'tel:+256751173504';
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Contact Bar - Desktop Only */}
      <div className="hidden md:block bg-gray-100 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="text-muted-foreground">
              Welcome to E-Sale Uganda - Your trusted marketplace
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={handleCallClick} className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4" />
                <span className="font-medium">+256 751 173504</span>
              </button>
              <div className="text-muted-foreground">|</div>
              <span className="text-muted-foreground">support@daxxshop.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-3">
                <img src="/images/logo.png" alt="E-Sale Uganda Logo" className="h-14 w-auto object-contain" />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:flex items-center space-x-1">
              {navLinks.map(link => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded ${
                    isActiveRoute(link.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-muted/20'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Desktop Contact Button */}
              <button onClick={handleCallClick} className="hidden md:flex items-center space-x-2 text-foreground hover:bg-muted/20 px-3 py-2 rounded transition-colors">
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">Call Us</span>
              </button>

              <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-foreground hover:bg-muted/20 transition-colors rounded">
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 amazon-orange text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="sm:hidden p-2 text-foreground hover:bg-muted/20 rounded">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Overlay */}
          {isMenuOpen && (
            <div className="sm:hidden border-t border-border">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link to="/" className="block px-3 py-2 text-foreground hover:bg-muted/20 transition-colors rounded" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                
                {/* Gadgets with Accessories submenu */}
                <div>
                  <Link to="/gadgets" className="block px-3 py-2 text-foreground hover:bg-muted/20 transition-colors rounded" onClick={() => setIsMenuOpen(false)}>
                    Gadgets
                  </Link>
                  <Link to="/accessories" className="block px-6 py-2 text-muted-foreground hover:bg-muted/20 transition-colors rounded text-sm" onClick={() => setIsMenuOpen(false)}>
                    → Accessories
                  </Link>
                </div>

                {/* Fashion with Cosmetics submenu */}
                <div>
                  <Link to="/fashion" className="block px-3 py-2 text-foreground hover:bg-muted/20 transition-colors rounded" onClick={() => setIsMenuOpen(false)}>
                    Fashion
                  </Link>
                  <Link to="/cosmetics" className="block px-6 py-2 text-muted-foreground hover:bg-muted/20 transition-colors rounded text-sm" onClick={() => setIsMenuOpen(false)}>
                    → Cosmetics
                  </Link>
                </div>

                <Link to="/property" className="block px-3 py-2 text-foreground hover:bg-muted/20 transition-colors rounded" onClick={() => setIsMenuOpen(false)}>
                  Property
                </Link>

                {/* Mobile Contact Link */}
                <button onClick={() => {
                  handleCallClick();
                  setIsMenuOpen(false);
                }} className="w-full text-left px-3 py-2 text-foreground hover:bg-muted/20 transition-colors rounded flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Call +256 751 173504</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Mobile Bottom Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-border/50 z-50 shadow-lg">
        <div className="grid grid-cols-4 gap-0">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActiveRoute(link.href);
            
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`flex flex-col items-center justify-center py-2 px-2 transition-all duration-300 min-h-[64px] relative ${
                  active
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {/* Active indicator */}
                {active && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full animate-fade-in" />
                )}
                
                {/* Icon with scaling animation */}
                <div className={`transform transition-transform duration-200 ${active ? 'scale-110' : 'scale-100'}`}>
                  <Icon className={`h-5 w-5 mb-1 ${active ? 'animate-pulse' : ''}`} />
                </div>
                
                {/* Label */}
                <span className={`text-[10px] font-medium leading-tight text-center transition-all duration-200 ${
                  active ? 'font-semibold' : 'font-normal'
                }`}>
                  {link.name}
                </span>
                
                {/* Subtle glow effect for active state */}
                {active && (
                  <div className="absolute inset-0 bg-primary/5 rounded-lg animate-pulse" />
                )}
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
