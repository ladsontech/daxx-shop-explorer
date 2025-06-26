
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Property } from '@/hooks/useProperties';
import ImageUpload from '@/components/ImageUpload';

interface EditPropertyDialogProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const EditPropertyDialog = ({ property, isOpen, onClose, onUpdate }: EditPropertyDialogProps) => {
  const [form, setForm] = useState({
    title: property?.title || '',
    price: property?.price?.toString() || '',
    location: property?.location || '',
    type: property?.type || 'sale' as 'sale' | 'rent',
    bedrooms: property?.bedrooms?.toString() || '',
    bathrooms: property?.bathrooms?.toString() || '',
    area: property?.area?.toString() || '',
    images: property?.images || []
  });

  React.useEffect(() => {
    if (property) {
      setForm({
        title: property.title,
        price: property.price.toString(),
        location: property.location,
        type: property.type,
        bedrooms: property.bedrooms?.toString() || '',
        bathrooms: property.bathrooms?.toString() || '',
        area: property.area?.toString() || '',
        images: property.images || []
      });
    }
  }, [property]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!property) return;

    const { error } = await supabase
      .from('properties')
      .update({
        title: form.title,
        price: parseFloat(form.price),
        location: form.location,
        type: form.type,
        bedrooms: form.bedrooms ? parseInt(form.bedrooms) : null,
        bathrooms: form.bathrooms ? parseInt(form.bathrooms) : null,
        area: form.area ? parseInt(form.area) : null,
        images: form.images
      })
      .eq('id', property.id);

    if (error) {
      toast.error('Error updating property: ' + error.message);
    } else {
      toast.success('Property updated successfully!');
      onUpdate();
      onClose();
    }
  };

  if (!property) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit_prop_title">Title</Label>
              <Input
                id="edit_prop_title"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit_prop_price">Price (UGX)</Label>
              <Input
                id="edit_prop_price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({...form, price: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit_location">Location</Label>
              <Input
                id="edit_location"
                value={form.location}
                onChange={(e) => setForm({...form, location: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit_type">Type</Label>
              <Select value={form.type} onValueChange={(value: 'sale' | 'rent') => setForm({...form, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit_bedrooms">Bedrooms</Label>
              <Input
                id="edit_bedrooms"
                type="number"
                value={form.bedrooms}
                onChange={(e) => setForm({...form, bedrooms: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit_bathrooms">Bathrooms</Label>
              <Input
                id="edit_bathrooms"
                type="number"
                value={form.bathrooms}
                onChange={(e) => setForm({...form, bathrooms: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit_area">Area (sqft)</Label>
              <Input
                id="edit_area"
                type="number"
                value={form.area}
                onChange={(e) => setForm({...form, area: e.target.value})}
              />
            </div>
          </div>

          <ImageUpload
            bucket="property-images"
            images={form.images}
            onImagesChange={(images) => setForm({...form, images})}
            maxImages={10}
          />

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update Property</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPropertyDialog;
