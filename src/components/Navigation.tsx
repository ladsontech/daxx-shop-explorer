
import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, Home, Smartphone, Headphones, Palette, Shirt, Building, Phone, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { getTotalItems } = useCart();

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Gadgets', href: '/gadgets', icon: Smartphone, 
      submenu: [
        { name: 'All Gadgets', href: '/gadgets' },
        { name: 'Accessories', href: '/accessories' }
      ]
    },
    {
      name: 'Fashion', href: '/fashion', icon: Shirt,
      submenu: [
        { name: 'All Fashion', href: '/fashion' },
        { name: 'Cosmetics', href: '/cosmetics' }
      ]
    },
    { name: 'Property', href: '/property', icon: Building }
  ];

  const handleCallClick = () => {
    window.location.href = 'tel:+256751173504';
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
              <button
                onClick={handleCallClick}
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
              >
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
                <img 
                  src="/images/logo.png" 
                  alt="E-Sale Uganda Logo" 
                  className="h-8 w-auto max-w-[120px] object-contain"
                />
                <h1 className="text-2xl md:text-3xl font-bold text-foreground font-playfair amazon-orange tracking-wide">
                  E-Sale Uganda
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation Links with Dropdown Menus */}
            <div className="hidden sm:flex items-center space-x-1">
              <NavigationMenu>
                <NavigationMenuList>
                  {navLinks.map(link => (
                    <NavigationMenuItem key={link.name}>
                      {link.submenu ? (
                        <>
                          <NavigationMenuTrigger className="text-foreground hover:bg-muted/20 px-2 py-2 text-xs sm:text-sm font-medium transition-colors rounded bg-transparent">
                            {link.name}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="w-48 p-2">
                              {link.submenu.map(sublink => (
                                <NavigationMenuLink key={sublink.name} asChild>
                                  <Link
                                    to={sublink.href}
                                    className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded transition-colors"
                                  >
                                    {sublink.name}
                                  </Link>
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.href}
                            className="text-foreground hover:bg-muted/20 px-2 py-2 text-xs sm:text-sm font-medium transition-colors rounded"
                          >
                            {link.name}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Desktop Contact Button */}
              <button
                onClick={handleCallClick}
                className="hidden md:flex items-center space-x-2 text-foreground hover:bg-muted/20 px-3 py-2 rounded transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm font-medium">Call Us</span>
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-foreground hover:bg-muted/20 transition-colors rounded"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 amazon-orange text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="sm:hidden p-2 text-foreground hover:bg-muted/20 rounded"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Overlay */}
          {isMenuOpen && (
            <div className="sm:hidden border-t border-border">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  className="block px-3 py-2 text-foreground hover:bg-muted/20 transition-colors rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                
                {/* Gadgets with Accessories submenu */}
                <div>
                  <Link
                    to="/gadgets"
                    className="block px-3 py-2 text-foreground hover:bg-muted/20 transition-colors rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Gadgets
                  </Link>
                  <Link
                    to="/accessories"
                    className="block px-6 py-2 text-muted-foreground hover:bg-muted/20 transition-colors rounded text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    → Accessories
                  </Link>
                </div>

                {/* Fashion with Cosmetics submenu */}
                <div>
                  <Link
                    to="/fashion"
                    className="block px-3 py-2 text-foreground hover:bg-muted/20 transition-colors rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Fashion
                  </Link>
                  <Link
                    to="/cosmetics"
                    className="block px-6 py-2 text-muted-foreground hover:bg-muted/20 transition-colors rounded text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    → Cosmetics
                  </Link>
                </div>

                <Link
                  to="/property"
                  className="block px-3 py-2 text-foreground hover:bg-muted/20 transition-colors rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Property
                </Link>

                {/* Mobile Contact Link */}
                <button
                  onClick={() => {
                    handleCallClick();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-foreground hover:bg-muted/20 transition-colors rounded flex items-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call +256 751 173504</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Navigation - Simplified */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
        <div className="grid grid-cols-4 gap-0">
          {/* Home */}
          <Link
            to="/"
            className="flex flex-col items-center justify-center py-2 px-2 text-muted-foreground hover:text-foreground transition-colors min-h-[60px]"
          >
            <Home className="h-4 w-4 mb-1" />
            <span className="text-[10px] font-medium leading-tight text-center">Home</span>
          </Link>

          {/* Gadgets (includes Accessories) */}
          <Link
            to="/gadgets"
            className="flex flex-col items-center justify-center py-2 px-2 text-muted-foreground hover:text-foreground transition-colors min-h-[60px]"
          >
            <Smartphone className="h-4 w-4 mb-1" />
            <span className="text-[10px] font-medium leading-tight text-center">Gadgets</span>
          </Link>

          {/* Fashion (includes Cosmetics) */}
          <Link
            to="/fashion"
            className="flex flex-col items-center justify-center py-2 px-2 text-muted-foreground hover:text-foreground transition-colors min-h-[60px]"
          >
            <Shirt className="h-4 w-4 mb-1" />
            <span className="text-[10px] font-medium leading-tight text-center">Fashion</span>
          </Link>

          {/* Property */}
          <Link
            to="/property"
            className="flex flex-col items-center justify-center py-2 px-2 text-muted-foreground hover:text-foreground transition-colors min-h-[60px]"
          >
            <Building className="h-4 w-4 mb-1" />
            <span className="text-[10px] font-medium leading-tight text-center">Property</span>
          </Link>
        </div>
      </div>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navigation;
