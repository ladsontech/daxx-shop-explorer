import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from './useProducts';
import { Property } from './useProperties';

export const usePrefetch = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Prefetch all product sections
    const sections = ['gadgets', 'accessories', 'cosmetics', 'fashion'];
    
    sections.forEach((section) => {
      queryClient.prefetchQuery({
        queryKey: ['products', section],
        queryFn: async () => {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('section', section)
            .order('created_at', { ascending: false });
          
          if (error) throw error;
          return data as Product[];
        },
      });
    });

    // Prefetch all products (for general queries)
    queryClient.prefetchQuery({
      queryKey: ['products'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data as Product[];
      },
    });

    // Prefetch properties
    queryClient.prefetchQuery({
      queryKey: ['properties'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        return data as Property[];
      },
    });
  }, [queryClient]);

  // Prefetch images
  const prefetchImage = (src: string) => {
    if (!src) return;
    const img = new Image();
    img.src = src;
  };

  const prefetchImages = (images: string[]) => {
    images.forEach(prefetchImage);
  };

  return { prefetchImages };
};
