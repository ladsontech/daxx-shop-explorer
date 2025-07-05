-- Fix products section constraint to properly include cosmetics
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_section_check;
ALTER TABLE public.products ADD CONSTRAINT products_section_check 
CHECK (section IN ('gadgets', 'accessories', 'cosmetics', 'fashion'));

-- Also update the condition constraint to allow cosmetics to have NULL condition like accessories and fashion
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_condition_check;
ALTER TABLE public.products ADD CONSTRAINT products_condition_check 
CHECK (
  (section = 'gadgets' AND condition IN ('new', 'used')) OR 
  (section IN ('accessories', 'cosmetics', 'fashion') AND condition IS NULL)
);