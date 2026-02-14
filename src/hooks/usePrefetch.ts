import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from './useProducts';
import { Property } from './useProperties';

export const usePrefetch = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
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

  const prefetchImages = useCallback((images: string[]) => {
    // Use requestIdleCallback for non-blocking image prefetch
    const loadImages = () => {
      images.forEach(src => {
        if (!src) return;
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadImages);
    } else {
      setTimeout(loadImages, 200);
    }
  }, []);

  return { prefetchImages };
};
