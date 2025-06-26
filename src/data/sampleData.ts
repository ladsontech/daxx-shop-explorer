
export const gadgets = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    title: "iPhone 15 Pro Max",
    price: 1199,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 245,
    category: "Phones",
    inStock: true
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    title: "MacBook Pro M3",
    price: 1999,
    rating: 4.9,
    reviews: 189,
    category: "Laptops",
    inStock: true
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
    title: "Samsung Galaxy Tab S9",
    price: 799,
    originalPrice: 899,
    rating: 4.6,
    reviews: 156,
    category: "Tablets",
    inStock: true
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    title: "Apple Watch Series 9",
    price: 399,
    rating: 4.7,
    reviews: 312,
    category: "Smartwatches",
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
    rating: 4.8,
    reviews: 428,
    category: "Audio",
    inStock: true
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400",
    title: "Wireless Charging Pad",
    price: 49,
    rating: 4.4,
    reviews: 89,
    category: "Chargers",
    inStock: true
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
    title: "iPhone 15 Pro Case",
    price: 29,
    originalPrice: 39,
    rating: 4.5,
    reviews: 167,
    category: "Cases",
    inStock: true
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    title: "USB-C Hub 7-in-1",
    price: 79,
    rating: 4.6,
    reviews: 234,
    category: "Cables",
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
    rating: 4.3,
    reviews: 145,
    category: "Men's Clothing",
    inStock: true
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
    title: "Designer Handbag",
    price: 189,
    rating: 4.7,
    reviews: 98,
    category: "Women's Bags",
    inStock: true
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    title: "Running Sneakers",
    price: 129,
    originalPrice: 159,
    rating: 4.6,
    reviews: 203,
    category: "Shoes",
    inStock: true
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400",
    title: "Gold Chain Necklace",
    price: 299,
    rating: 4.8,
    reviews: 67,
    category: "Jewelry",
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
    agent: "Sarah Johnson",
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
    agent: "Mike Chen",
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
    agent: "Emily Rodriguez",
    phone: "+1 (555) 456-7890"
  }
];
