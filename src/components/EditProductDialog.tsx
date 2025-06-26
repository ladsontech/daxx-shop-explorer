
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Product } from '@/hooks/useProducts';
import ImageUpload from '@/components/ImageUpload';

interface EditProductDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const EditProductDialog = ({ product, isOpen, onClose, onUpdate }: EditProductDialogProps) => {
  const [form, setForm] = useState({
    title: product?.title || '',
    description: product?.description || '',
    price: product?.price?.toString() || '',
    original_price: product?.original_price?.toString() || '',
    section: product?.section || '',
    images: product?.images || [],
    in_stock: product?.in_stock ?? true,
    featured: product?.featured ?? false
  });

  React.useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        description: product.description || '',
        price: product.price.toString(),
        original_price: product.original_price?.toString() || '',
        section: product.section,
        images: product.images || [],
        in_stock: product.in_stock,
        featured: product.featured || false
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product) return;

    // Improved validation with specific error messages
    if (!form.title.trim()) {
      toast.error('Please enter a product title');
      return;
    }
    
    if (!form.price || parseFloat(form.price) <= 0) {
      toast.error('Please enter a valid price greater than 0');
      return;
    }
    
    if (!form.section) {
      toast.error('Please select a section (Gadgets, Accessories, or Fashion)');
      return;
    }
    
    if (form.images.length === 0) {
      toast.error('Please upload at least one product image');
      return;
    }

    const { error } = await supabase
      .from('products')
      .update({
        title: form.title.trim(),
        description: form.description.trim() || null,
        price: parseFloat(form.price),
        original_price: form.original_price ? parseFloat(form.original_price) : null,
        category: form.section, // Use section as category
        section: form.section,
        images: form.images,
        in_stock: form.in_stock,
        featured: form.featured
      })
      .eq('id', product.id);

    if (error) {
      toast.error('Error updating product: ' + error.message);
    } else {
      toast.success('Product updated successfully!');
      onUpdate();
      onClose();
    }
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit_title">Title *</Label>
              <Input
                id="edit_title"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
                placeholder="Enter product title"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit_price">Price (UGX) *</Label>
              <Input
                id="edit_price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({...form, price: e.target.value})}
                placeholder="Enter price in UGX"
                min="1"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit_original_price">Original Price (Optional)</Label>
              <Input
                id="edit_original_price"
                type="number"
                value={form.original_price}
                onChange={(e) => setForm({...form, original_price: e.target.value})}
                placeholder="Enter original price if on sale"
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="edit_section">Section *</Label>
              <Select value={form.section} onValueChange={(value) => setForm({...form, section: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gadgets">Gadgets</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="edit_description">Description</Label>
            <Textarea
              id="edit_description"
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
              rows={3}
              placeholder="Enter product description (optional)"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="edit_featured"
              checked={form.featured}
              onCheckedChange={(checked) => setForm({...form, featured: !!checked})}
            />
            <Label htmlFor="edit_featured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Mark as featured product
            </Label>
          </div>

          <div>
            <Label>Product Images *</Label>
            <ImageUpload
              bucket="product-images"
              images={form.images}
              onImagesChange={(images) => setForm({...form, images})}
              maxImages={5}
            />
            <p className="text-sm text-gray-500 mt-1">Upload at least one image (max 5 images)</p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update Product</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
