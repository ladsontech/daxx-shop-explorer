
-- Create storage buckets for product and property images
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('product-images', 'product-images', true),
  ('property-images', 'property-images', true);

-- Create storage policies to allow public access to view images
CREATE POLICY "Public can view product images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Public can view property images" ON storage.objects
  FOR SELECT USING (bucket_id = 'property-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload product images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload property images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'property-images');

-- Allow authenticated users to update images
CREATE POLICY "Authenticated users can update product images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can update property images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'property-images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete product images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can delete property images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'property-images');

-- Update products table to support multiple images
ALTER TABLE public.products DROP COLUMN image_url;
ALTER TABLE public.products ADD COLUMN images TEXT[] DEFAULT '{}';

-- Update properties table to support multiple images  
ALTER TABLE public.properties DROP COLUMN image_url;
ALTER TABLE public.properties ADD COLUMN images TEXT[] DEFAULT '{}';
