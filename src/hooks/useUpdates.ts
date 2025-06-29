
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Update {
  id: string;
  title: string;
  description: string | null;
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
        .insert([update])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['updates'] });
      toast.success('Update created successfully!');
    },
    onError: (error) => {
      toast.error('Failed to create update: ' + error.message);
    },
  });
};

export const useUpdateUpdate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...update }: Partial<Update> & { id: string }) => {
      const { data, error } = await supabase
        .from('updates')
        .update({ ...update, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['updates'] });
      toast.success('Update updated successfully!');
    },
    onError: (error) => {
      toast.error('Failed to update update: ' + error.message);
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
