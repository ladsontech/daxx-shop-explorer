
-- Create updates table
CREATE TABLE public.updates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  published BOOLEAN NOT NULL DEFAULT true
);

-- Create storage bucket for update images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('update-images', 'update-images', true);

-- Create storage policies for update images
CREATE POLICY "Public can view update images" ON storage.objects
  FOR SELECT USING (bucket_id = 'update-images');

CREATE POLICY "Anyone can upload update images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'update-images');

CREATE POLICY "Anyone can update update images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'update-images');

CREATE POLICY "Anyone can delete update images" ON storage.objects
  FOR DELETE USING (bucket_id = 'update-images');

-- Allow anonymous users to manage updates (fixed RLS policies)
CREATE POLICY "Anyone can view updates" ON public.updates FOR SELECT USING (true);
CREATE POLICY "Anyone can insert updates" ON public.updates FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update updates" ON public.updates FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete updates" ON public.updates FOR DELETE USING (true);

-- Enable RLS
ALTER TABLE public.updates ENABLE ROW LEVEL SECURITY;
