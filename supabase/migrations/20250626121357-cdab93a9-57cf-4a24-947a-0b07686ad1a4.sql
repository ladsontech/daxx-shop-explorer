
-- Create products table for gadgets, accessories, and fashion
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category TEXT NOT NULL CHECK (category IN ('Phones', 'Laptops', 'Tablets', 'Smartwatches', 'Audio', 'Chargers', 'Cases', 'Cables', 'Men''s Clothing', 'Women''s Bags', 'Shoes', 'Jewelry')),
  section TEXT NOT NULL CHECK (section IN ('gadgets', 'accessories', 'fashion')),
  image_url TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('sale', 'rent')),
  bedrooms INTEGER,
  bathrooms INTEGER,
  area INTEGER,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is a public marketplace)
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Anyone can view properties" ON public.properties FOR SELECT USING (true);

-- Create policies for authenticated users to manage products/properties (admin functionality)
CREATE POLICY "Authenticated users can insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update products" ON public.products FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete products" ON public.products FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert properties" ON public.properties FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update properties" ON public.properties FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete properties" ON public.properties FOR DELETE TO authenticated USING (true);

-- Create indexes for better performance
CREATE INDEX idx_products_section ON public.products(section);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_properties_type ON public.properties(type);
