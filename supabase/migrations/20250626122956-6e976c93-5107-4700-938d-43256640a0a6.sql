
-- Allow anonymous users to insert, update, and delete products
CREATE POLICY "Anyone can insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete products" ON public.products FOR DELETE USING (true);

-- Allow anonymous users to insert, update, and delete properties
CREATE POLICY "Anyone can insert properties" ON public.properties FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update properties" ON public.properties FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete properties" ON public.properties FOR DELETE USING (true);
