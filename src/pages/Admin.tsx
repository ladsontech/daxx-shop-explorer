import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useProducts } from '@/hooks/useProducts';
import { useProperties } from '@/hooks/useProperties';
import { toast } from 'sonner';
import { Trash2, Plus, Edit, Filter, Smartphone, Headphones, Shirt, Building } from 'lucide-react';
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
  const [activeCategory, setActiveCategory] = useState<string>('gadgets');
  
  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: '',
    original_price: '',
    section: activeCategory,
    images: [] as string[],
    in_stock: true,
    featured: false
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

  // Filter products based on active category
  const filteredProducts = products?.filter(product => product.section === activeCategory) || [];

  // Category configuration
  const categories = [
    { id: 'gadgets', name: 'Gadgets', icon: Smartphone, color: 'bg-blue-500' },
    { id: 'accessories', name: 'Accessories', icon: Headphones, color: 'bg-green-500' },
    { id: 'fashion', name: 'Fashion', icon: Shirt, color: 'bg-purple-500' },
    { id: 'property', name: 'Property', icon: Building, color: 'bg-orange-500' }
  ];

  // Update product form section when category changes
  React.useEffect(() => {
    setProductForm(prev => ({ ...prev, section: activeCategory }));
  }, [activeCategory]);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Improved validation with specific error messages
    if (!productForm.title.trim()) {
      toast.error('Please enter a product title');
      return;
    }
    
    if (!productForm.price || parseFloat(productForm.price) <= 0) {
      toast.error('Please enter a valid price greater than 0');
      return;
    }
    
    if (!productForm.section) {
      toast.error('Please select a section (Gadgets, Accessories, or Fashion)');
      return;
    }
    
    if (productForm.images.length === 0) {
      toast.error('Please upload at least one product image');
      return;
    }

    const { error } = await supabase.from('products').insert([{
      title: productForm.title.trim(),
      description: productForm.description.trim() || null,
      price: parseFloat(productForm.price),
      original_price: productForm.original_price ? parseFloat(productForm.original_price) : null,
      category: productForm.section, // Use section as category
      section: productForm.section,
      images: productForm.images,
      in_stock: productForm.in_stock,
      featured: productForm.featured
    }]);

    if (error) {
      toast.error('Error adding product: ' + error.message);
    } else {
      toast.success('Product added successfully!');
      setProductForm({
        title: '', description: '', price: '', original_price: '',
        section: activeCategory, images: [], in_stock: true, featured: false
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
    if (window.confirm('Are you sure you want to delete this product?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        toast.error('Error deleting product');
      } else {
        toast.success('Product deleted successfully');
        refetchProducts();
      }
    }
  };

  const deleteProperty = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (error) {
        toast.error('Error deleting property');
      } else {
        toast.success('Property deleted successfully');
        refetchProperties();
      }
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

      {/* Category Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? `${category.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{category.name}</span>
                <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                  {category.id === 'property' 
                    ? properties?.length || 0 
                    : products?.filter(p => p.section === category.id).length || 0
                  }
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
      {activeCategory === 'property' ? (
        // Property Management
        <div className="space-y-6">
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
                    <Label htmlFor="prop_title">Title *</Label>
                    <Input
                      id="prop_title"
                      value={propertyForm.title}
                      onChange={(e) => setPropertyForm({...propertyForm, title: e.target.value})}
                      placeholder="Enter property title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="prop_price">Price (UGX) *</Label>
                    <Input
                      id="prop_price"
                      type="number"
                      value={propertyForm.price}
                      onChange={(e) => setPropertyForm({...propertyForm, price: e.target.value})}
                      placeholder="Enter price in UGX"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={propertyForm.location}
                      onChange={(e) => setPropertyForm({...propertyForm, location: e.target.value})}
                      placeholder="Enter property location"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type *</Label>
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
                      placeholder="Number of bedrooms"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={propertyForm.bathrooms}
                      onChange={(e) => setPropertyForm({...propertyForm, bathrooms: e.target.value})}
                      placeholder="Number of bathrooms"
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="area">Area (sqft)</Label>
                    <Input
                      id="area"
                      type="number"
                      value={propertyForm.area}
                      onChange={(e) => setPropertyForm({...propertyForm, area: e.target.value})}
                      placeholder="Area in square feet"
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <Label>Property Images *</Label>
                  <ImageUpload
                    bucket="property-images"
                    images={propertyForm.images}
                    onImagesChange={(images) => setPropertyForm({...propertyForm, images})}
                    maxImages={10}
                  />
                  <p className="text-sm text-gray-500 mt-1">Upload at least one image (max 10 images)</p>
                </div>

                <Button type="submit" className="w-full md:w-auto">Add Property</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage Properties</CardTitle>
              <CardDescription>
                Showing all properties ({properties?.length || 0} total)
              </CardDescription>
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
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{property.location}</span>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            property.type === 'sale' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            For {property.type}
                          </span>
                        </div>
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
                {properties?.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No properties found.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        // Product Management
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add New {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Product</span>
              </CardTitle>
              <CardDescription>Add products to the {activeCategory} category</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={productForm.title}
                      onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                      placeholder="Enter product title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price (UGX) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                      placeholder="Enter price in UGX"
                      min="1"
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
                      placeholder="Enter original price if on sale"
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="section">Category</Label>
                    <Input
                      id="section"
                      value={activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
                      disabled
                      className="bg-gray-100"
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
                    placeholder="Enter product description (optional)"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={productForm.featured}
                    onCheckedChange={(checked) => setProductForm({...productForm, featured: !!checked})}
                  />
                  <Label htmlFor="featured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Mark as featured product
                  </Label>
                </div>

                <div>
                  <Label>Product Images *</Label>
                  <ImageUpload
                    bucket="product-images"
                    images={productForm.images}
                    onImagesChange={(images) => setProductForm({...productForm, images})}
                    maxImages={5}
                  />
                  <p className="text-sm text-gray-500 mt-1">Upload at least one image (max 5 images)</p>
                </div>

                <Button type="submit" className="w-full md:w-auto">Add Product</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Manage {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Products</CardTitle>
              <CardDescription>
                Showing {activeCategory} products ({filteredProducts.length} items)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProducts.map((product) => (
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
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{product.section}</span>
                          {product.featured && (
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 font-medium">
                              Featured
                            </span>
                          )}
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.in_stock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
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
                {filteredProducts.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No {activeCategory} products found.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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