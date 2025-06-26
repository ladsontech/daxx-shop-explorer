
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    category: product?.category || '',
    section: product?.section || '',
    images: product?.images || [],
    in_stock: product?.in_stock ?? true
  });

  React.useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        description: product.description || '',
        price: product.price.toString(),
        original_price: product.original_price?.toString() || '',
        category: product.category,
        section: product.section,
        images: product.images || [],
        in_stock: product.in_stock
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product) return;

    const { error } = await supabase
      .from('products')
      .update({
        title: form.title,
        description: form.description || null,
        price: parseFloat(form.price),
        original_price: form.original_price ? parseFloat(form.original_price) : null,
        category: form.category,
        section: form.section,
        images: form.images,
        in_stock: form.in_stock
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
              <Label htmlFor="edit_title">Title</Label>
              <Input
                id="edit_title"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit_price">Price (UGX)</Label>
              <Input
                id="edit_price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({...form, price: e.target.value})}
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
              />
            </div>
            <div>
              <Label htmlFor="edit_section">Section</Label>
              <Select value={form.section} onValueChange={(value) => setForm({...form, section: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gadgets">Gadgets</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                  <SelectItem value="fashion">Fashion</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="edit_category">Category</Label>
              <Select value={form.category} onValueChange={(value) => setForm({...form, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Phones">Phones</SelectItem>
                  <SelectItem value="Laptops">Laptops</SelectItem>
                  <SelectItem value="Tablets">Tablets</SelectItem>
                  <SelectItem value="Smartwatches">Smartwatches</SelectItem>
                  <SelectItem value="Audio">Audio</SelectItem>
                  <SelectItem value="Chargers">Chargers</SelectItem>
                  <SelectItem value="Cases">Cases</SelectItem>
                  <SelectItem value="Cables">Cables</SelectItem>
                  <SelectItem value="Men's Clothing">Men's Clothing</SelectItem>
                  <SelectItem value="Women's Bags">Women's Bags</SelectItem>
                  <SelectItem value="Shoes">Shoes</SelectItem>
                  <SelectItem value="Jewelry">Jewelry</SelectItem>
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
            />
          </div>

          <ImageUpload
            bucket="product-images"
            images={form.images}
            onImagesChange={(images) => setForm({...form, images})}
            maxImages={5}
          />

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
