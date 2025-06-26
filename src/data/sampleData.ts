export const gadgets = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    title: "iPhone 15 Pro Max",
    price: 1199,
    originalPrice: 1299,
    category: "Phones",
    description: "The most advanced iPhone yet with titanium design, A17 Pro chip, and Pro camera system. Features incredible battery life and stunning display technology.",
    inStock: true
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    title: "MacBook Pro M3",
    price: 1999,
    category: "Laptops",
    description: "Supercharged by M3 chip for incredible performance. Perfect for professionals with up to 22 hours of battery life and stunning Liquid Retina XDR display.",
    inStock: true
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
    title: "Samsung Galaxy Tab S9",
    price: 799,
    originalPrice: 899,
    category: "Tablets",
    description: "Premium Android tablet with S Pen included. Perfect for productivity and creativity with a brilliant AMOLED display and all-day battery life.",
    inStock: true
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    title: "Apple Watch Series 9",
    price: 399,
    category: "Smartwatches",
    description: "The most advanced Apple Watch with new S9 chip, brighter display, and innovative health features. Track your fitness and stay connected.",
    inStock: false
  }
];

export const accessories = [
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    title: "Sony WH-1000XM5 Headphones",
    price: 349,
    originalPrice: 399,
    category: "Audio",
    description: "Industry-leading noise canceling headphones with exceptional sound quality. 30-hour battery life and crystal-clear hands-free calling.",
    inStock: true
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400",
    title: "Wireless Charging Pad",
    price: 49,
    category: "Chargers",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overheat protection.",
    inStock: true
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
    title: "iPhone 15 Pro Case",
    price: 29,
    originalPrice: 39,
    category: "Cases",
    description: "Premium protective case with military-grade drop protection. Precise cutouts and wireless charging compatible with raised edges for screen protection.",
    inStock: true
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    title: "USB-C Hub 7-in-1",
    price: 79,
    category: "Cables",
    description: "Versatile 7-in-1 hub with HDMI 4K, USB 3.0 ports, SD card readers, and fast charging. Perfect for laptops and tablets with USB-C connectivity.",
    inStock: true
  }
];

export const fashion = [
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    title: "Premium Cotton T-Shirt",
    price: 29,
    originalPrice: 39,
    category: "Men's Clothing",
    description: "Soft, breathable premium cotton t-shirt with modern fit. Available in multiple colors with tagless design for maximum comfort.",
    inStock: true
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
    title: "Designer Handbag",
    price: 189,
    category: "Women's Bags",
    description: "Elegant designer handbag crafted from genuine leather. Features multiple compartments, adjustable strap, and timeless design that complements any outfit.",
    inStock: true
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    title: "Running Sneakers",
    price: 129,
    originalPrice: 159,
    category: "Shoes",
    description: "High-performance running shoes with advanced cushioning and breathable mesh upper. Designed for comfort and durability during intense workouts.",
    inStock: true
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400",
    title: "Gold Chain Necklace",
    price: 299,
    category: "Jewelry",
    description: "Elegant 18k gold-plated chain necklace with secure clasp. Hypoallergenic and tarnish-resistant with a sophisticated design perfect for any occasion.",
    inStock: true
  }
];

export const properties = [
  {
    id: 13,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
    title: "Modern Family Home",
    price: 450000,
    location: "Downtown District",
    type: "sale" as const,
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    phone: "+1 (555) 123-4567"
  },
  {
    id: 14,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
    title: "Luxury Apartment",
    price: 2800,
    location: "City Center",
    type: "rent" as const,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    phone: "+1 (555) 987-6543"
  },
  {
    id: 15,
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400",
    title: "Beachfront Villa",
    price: 850000,
    location: "Coastal Area",
    type: "sale" as const,
    bedrooms: 5,
    bathrooms: 4,
    area: 3200,
    phone: "+1 (555) 456-7890"
  }
];
