
-- Add the condition column to products table first
ALTER TABLE public.products 
ADD COLUMN condition TEXT;

-- Set all existing gadgets to 'used' by default
UPDATE public.products 
SET condition = 'used' 
WHERE section = 'gadgets';

-- Set condition to NULL for all non-gadget products
UPDATE public.products 
SET condition = NULL 
WHERE section != 'gadgets';

-- Add the proper constraint that allows NULL for non-gadgets and requires new/used for gadgets
ALTER TABLE public.products 
ADD CONSTRAINT products_condition_check 
CHECK (
  (section = 'gadgets' AND condition IN ('new', 'used')) OR 
  (section != 'gadgets' AND condition IS NULL)
);
