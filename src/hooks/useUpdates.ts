
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Update {
  id: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const useUpdates = () => {
  return useQuery({
    queryKey: ['updates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('updates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Update[];
    },
  });
};

export const useCreateUpdate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (update: Omit<Update, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('updates')
        .insert([{
          ...update,
          title: 'Update Poster', // Provide a default title to satisfy database requirement
          description: null
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['updates'] });
      toast.success('Update posted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to post update: ' + error.message);
    },
  });
};

export const useDeleteUpdate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('updates')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['updates'] });
      toast.success('Update deleted successfully!');
    },
    onError: (error) => {
      toast.error('Failed to delete update: ' + error.message);
    },
  });
};
