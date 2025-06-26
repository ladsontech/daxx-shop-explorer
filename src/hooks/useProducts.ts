
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  original_price: number | null;
  category: string;
  section: string;
  image_url: string;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

export const useProducts = (section?: string) => {
  return useQuery({
    queryKey: ['products', section],
    queryFn: async () => {
      let query = supabase.from('products').select('*');
      
      if (section) {
        query = query.eq('section', section);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Product[];
    },
  });
};

export const useProductById = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Product;
    },
    enabled: !!id,
  });
};
