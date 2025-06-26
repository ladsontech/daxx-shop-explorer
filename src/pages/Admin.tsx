import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useProducts } from '@/hooks/useProducts';
import { useProperties } from '@/hooks/useProperties';
import { toast } from 'sonner';
import { Trash2, Plus, Edit } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';
import AdminLogin from '@/components/AdminLogin';
import EditProductDialog from '@/components/EditProductDialog';
import EditPropertyDialog from '@/components/EditPropertyDialog';
import { Product } from '@/hooks/useProducts';
import { Property } from '@/hooks/useProperties';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  
  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: '',
    original_price: '',
    section: '',
    images: [] as string[],
    in_stock: true
  });

  const [propertyForm, setPropertyForm] = useState({
    title: '',
    price: '',
    location: '',
    type: 'sale' as 'sale' | 'rent',
    bedrooms: '',
    bathrooms: '',
    area: '',
    images: [] as string[]
  });

  const { data: products, refetch: refetchProducts } = useProducts();
  const { data: properties, refetch: refetchProperties } = useProperties();

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (productForm.images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    const { error } = await supabase.from('products').insert([{
      title: productForm.title,
      description: productForm.description || null,
      price: parseFloat(productForm.price),
      original_price: productForm.original_price ? parseFloat(productForm.original_price) : null,
      category: productForm.section, // Use section as category
      section: productForm.section,
      images: productForm.images,
      in_stock: productForm.in_stock
    }]);

    if (error) {
      toast.error('Error adding product: ' + error.message);
    } else {
      toast.success('Product added successfully!');
      setProductForm({
        title: '', description: '', price: '', original_price: '',
        section: '', images: [], in_stock: true
      });
      refetchProducts();
    }
  };

  const handlePropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (propertyForm.images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    const { error } = await supabase.from('properties').insert([{
      title: propertyForm.title,
      price: parseFloat(propertyForm.price),
      location: propertyForm.location,
      type: propertyForm.type,
      bedrooms: propertyForm.bedrooms ? parseInt(propertyForm.bedrooms) : null,
      bathrooms: propertyForm.bathrooms ? parseInt(propertyForm.bathrooms) : null,
      area: propertyForm.area ? parseInt(propertyForm.area) : null,
      images: propertyForm.images
    }]);

    if (error) {
      toast.error('Error adding property: ' + error.message);
    } else {
      toast.success('Property added successfully!');
      setPropertyForm({
        title: '', price: '', location: '', type: 'sale',
        bedrooms: '', bathrooms: '', area: '', images: []
      });
      refetchProperties();
    }
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      toast.error('Error deleting product');
    } else {
      toast.success('Product deleted successfully');
      refetchProducts();
    }
  };

  const deleteProperty = async (id: string) => {
    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (error) {
      toast.error('Error deleting property');
    } else {
      toast.success('Property deleted successfully');
      refetchProperties();
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
          Logout
        </Button>
      </div>
      
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add New Product</span>
              </CardTitle>
              <CardDescription>Add gadgets, accessories, or fashion items</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={productForm.title}
                      onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price (UGX)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="original_price">Original Price (Optional)</Label>
                    <Input
                      id="original_price"
                      type="number"
                      value={productForm.original_price}
                      onChange={(e) => setProductForm({...productForm, original_price: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="section">Section</Label>
                    <Select value={productForm.section} onValueChange={(value) => setProductForm({...productForm, section: value})}>
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
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={productForm.description}
                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <ImageUpload
                  bucket="product-images"
                  images={productForm.images}
                  onImagesChange={(images) => setProductForm({...productForm, images})}
                  maxImages={5}
                />

                <Button type="submit">Add Product</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products?.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {product.images && product.images.length > 0 ? (
                        <img src={product.images[0]} alt={product.title} className="w-16 h-16 object-cover rounded" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold">{product.title}</h3>
                        <p className="text-sm text-gray-600">{product.section}</p>
                        <p className="font-bold">UGX {product.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="properties" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add New Property</span>
              </CardTitle>
              <CardDescription>Add properties for sale or rent</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePropertySubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="prop_title">Title</Label>
                    <Input
                      id="prop_title"
                      value={propertyForm.title}
                      onChange={(e) => setPropertyForm({...propertyForm, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="prop_price">Price (UGX)</Label>
                    <Input
                      id="prop_price"
                      type="number"
                      value={propertyForm.price}
                      onChange={(e) => setPropertyForm({...propertyForm, price: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={propertyForm.location}
                      onChange={(e) => setPropertyForm({...propertyForm, location: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={propertyForm.type} onValueChange={(value: 'sale' | 'rent') => setPropertyForm({...propertyForm, type: value})}>
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
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={propertyForm.bedrooms}
                      onChange={(e) => setPropertyForm({...propertyForm, bedrooms: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={propertyForm.bathrooms}
                      onChange={(e) => setPropertyForm({...propertyForm, bathrooms: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="area">Area (sqft)</Label>
                    <Input
                      id="area"
                      type="number"
                      value={propertyForm.area}
                      onChange={(e) => setPropertyForm({...propertyForm, area: e.target.value})}
                    />
                  </div>
                </div>

                <ImageUpload
                  bucket="property-images"
                  images={propertyForm.images}
                  onImagesChange={(images) => setPropertyForm({...propertyForm, images})}
                  maxImages={10}
                />

                <Button type="submit">Add Property</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {properties?.map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {property.images && property.images.length > 0 ? (
                        <img src={property.images[0]} alt={property.title} className="w-16 h-16 object-cover rounded" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No Image</span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold">{property.title}</h3>
                        <p className="text-sm text-gray-600">{property.location} • For {property.type}</p>
                        <p className="font-bold">UGX {property.price.toLocaleString()}{property.type === 'rent' && '/month'}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingProperty(property)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteProperty(property.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <EditProductDialog
        product={editingProduct}
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onUpdate={refetchProducts}
      />

      <EditPropertyDialog
        property={editingProperty}
        isOpen={!!editingProperty}
        onClose={() => setEditingProperty(null)}
        onUpdate={refetchProperties}
      />
    </div>
  );
};

export default Admin;
