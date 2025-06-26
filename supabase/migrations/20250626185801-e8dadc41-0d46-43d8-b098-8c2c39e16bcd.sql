
-- Remove the CHECK constraint on category column
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_category_check;

-- Make the category column nullable since we're not using it anymore
ALTER TABLE public.products ALTER COLUMN category DROP NOT NULL;

-- Set a default value for existing records that might have null category
UPDATE public.products SET category = section WHERE category IS NULL;
