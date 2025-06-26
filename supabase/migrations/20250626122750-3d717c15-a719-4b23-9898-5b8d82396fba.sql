
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload property images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update property images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete property images" ON storage.objects;

-- Create more permissive policies for anonymous users
CREATE POLICY "Anyone can upload product images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Anyone can upload property images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "Anyone can update product images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can update property images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'property-images');

CREATE POLICY "Anyone can delete product images" ON storage.objects
  FOR DELETE USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can delete property images" ON storage.objects
  FOR DELETE USING (bucket_id = 'property-images');
