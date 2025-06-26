
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
import { Trash2, Edit, Plus } from 'lucide-react';

const Admin = () => {
  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: '',
    original_price: '',
    category: '',
    section: '',
    image_url: '',
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
    image_url: ''
  });

  const { data: products, refetch: refetchProducts } = useProducts();
  const { data: properties, refetch: refetchProperties } = useProperties();

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from('products').insert([{
      title: productForm.title,
      description: productForm.description || null,
      price: parseFloat(productForm.price),
      original_price: productForm.original_price ? parseFloat(productForm.original_price) : null,
      category: productForm.category,
      section: productForm.section,
      image_url: productForm.image_url,
      in_stock: productForm.in_stock
    }]);

    if (error) {
      toast.error('Error adding product: ' + error.message);
    } else {
      toast.success('Product added successfully!');
      setProductForm({
        title: '', description: '', price: '', original_price: '',
        category: '', section: '', image_url: '', in_stock: true
      });
      refetchProducts();
    }
  };

  const handlePropertySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from('properties').insert([{
      title: propertyForm.title,
      price: parseFloat(propertyForm.price),
      location: propertyForm.location,
      type: propertyForm.type,
      bedrooms: propertyForm.bedrooms ? parseInt(propertyForm.bedrooms) : null,
      bathrooms: propertyForm.bathrooms ? parseInt(propertyForm.bathrooms) : null,
      area: propertyForm.area ? parseInt(propertyForm.area) : null,
      image_url: propertyForm.image_url
    }]);

    if (error) {
      toast.error('Error adding property: ' + error.message);
    } else {
      toast.success('Property added successfully!');
      setPropertyForm({
        title: '', price: '', location: '', type: 'sale',
        bedrooms: '', bathrooms: '', area: '', image_url: ''
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
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
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={productForm.category} onValueChange={(value) => setProductForm({...productForm, category: value})}>
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
                  <div>
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      value={productForm.image_url}
                      onChange={(e) => setProductForm({...productForm, image_url: e.target.value})}
                      required
                    />
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
                      <img src={product.image_url} alt={product.title} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <h3 className="font-semibold">{product.title}</h3>
                        <p className="text-sm text-gray-600">{product.category} • {product.section}</p>
                        <p className="font-bold">UGX {product.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
                  <div>
                    <Label htmlFor="prop_image_url">Image URL</Label>
                    <Input
                      id="prop_image_url"
                      value={propertyForm.image_url}
                      onChange={(e) => setPropertyForm({...propertyForm, image_url: e.target.value})}
                      required
                    />
                  </div>
                </div>
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
                      <img src={property.image_url} alt={property.title} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <h3 className="font-semibold">{property.title}</h3>
                        <p className="text-sm text-gray-600">{property.location} • For {property.type}</p>
                        <p className="font-bold">UGX {property.price.toLocaleString()}{property.type === 'rent' && '/month'}</p>
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteProperty(property.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
