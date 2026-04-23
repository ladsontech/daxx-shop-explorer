
import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Home, Smartphone, Shirt, Building, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Gadgets', href: '/gadgets', icon: Smartphone },
    { name: 'Fashion', href: '/fashion', icon: Shirt },
    { name: 'Property', href: '/property', icon: Building },
  ];

  const handleCallClick = () => { window.location.href = 'tel:+256751173504'; };

  const isActiveRoute = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className="bg-card/95 backdrop-blur-lg sticky top-0 z-50 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src="/images/logo.png" alt="E-Sale Uganda Logo" className="h-12 w-auto object-contain" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden sm:flex items-center gap-1">
              {navLinks.map(link => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className={`px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                    isActiveRoute(link.href)
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              <button onClick={handleCallClick} className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-secondary transition-all text-sm">
                <Phone className="h-4 w-4" />
                <span className="font-medium">Call Us</span>
              </button>

              <button onClick={() => setIsCartOpen(true)} className="relative p-2.5 text-foreground hover:bg-secondary rounded-lg transition-all">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="sm:hidden p-2.5 text-foreground hover:bg-secondary rounded-lg transition-all">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          {isMenuOpen && (
            <div className="sm:hidden border-t border-border/50 py-3 space-y-1 animate-fade-in">
              <Link to="/" className="block px-3 py-2.5 text-foreground hover:bg-secondary rounded-lg transition-all" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <div>
                <Link to="/gadgets" className="block px-3 py-2.5 text-foreground hover:bg-secondary rounded-lg transition-all" onClick={() => setIsMenuOpen(false)}>Gadgets</Link>
                <Link to="/accessories" className="block px-6 py-2 text-muted-foreground hover:bg-secondary rounded-lg text-sm transition-all" onClick={() => setIsMenuOpen(false)}>→ Accessories</Link>
              </div>
              <div>
                <Link to="/fashion" className="block px-3 py-2.5 text-foreground hover:bg-secondary rounded-lg transition-all" onClick={() => setIsMenuOpen(false)}>Fashion</Link>
                <Link to="/cosmetics" className="block px-6 py-2 text-muted-foreground hover:bg-secondary rounded-lg text-sm transition-all" onClick={() => setIsMenuOpen(false)}>→ Cosmetics</Link>
              </div>
              <Link to="/property" className="block px-3 py-2.5 text-foreground hover:bg-secondary rounded-lg transition-all" onClick={() => setIsMenuOpen(false)}>Property</Link>
              <button onClick={() => { handleCallClick(); setIsMenuOpen(false); }} className="w-full text-left px-3 py-2.5 text-foreground hover:bg-secondary rounded-lg flex items-center gap-2 transition-all">
                <Phone className="h-4 w-4" />
                <span>Call +256 751 173504</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/50 z-50">
        <div className="grid grid-cols-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActiveRoute(link.href);
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`flex flex-col items-center justify-center py-2.5 transition-all relative ${
                  active ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {active && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />}
                <Icon className={`h-5 w-5 mb-0.5 ${active ? 'scale-110' : ''} transition-transform`} />
                <span className={`text-[10px] ${active ? 'font-semibold' : 'font-medium'}`}>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navigation;
