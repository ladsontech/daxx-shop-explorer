/*
  # Add Cosmetics Section Support

  1. Database Changes
    - Update products table to support cosmetics section
    - Add cosmetics to allowed section values
    - Update existing constraints to include cosmetics

  2. Security
    - Existing RLS policies will automatically apply to cosmetics products
    - No additional security changes needed
*/

-- Add cosmetics to the section constraint
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_section_check;
ALTER TABLE public.products ADD CONSTRAINT products_section_check 
CHECK (section IN ('gadgets', 'accessories', 'cosmetics', 'fashion'));

-- Update the condition constraint to allow cosmetics to have NULL condition (like accessories and fashion)
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_condition_check;
ALTER TABLE public.products ADD CONSTRAINT products_condition_check 
CHECK (
  (section = 'gadgets' AND condition IN ('new', 'used')) OR 
  (section IN ('accessories', 'cosmetics', 'fashion') AND condition IS NULL)
);

-- Create index for cosmetics section for better performance
CREATE INDEX IF NOT EXISTS idx_products_cosmetics ON public.products(section) WHERE section = 'cosmetics';