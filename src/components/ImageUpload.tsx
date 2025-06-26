
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { X, Upload, Loader2, Plus } from 'lucide-react';

interface ImageUploadProps {
  bucket: 'product-images' | 'property-images';
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  bucket,
  images,
  onImagesChange,
  maxImages = 5
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      const newImages = [...images, publicUrl];
      onImagesChange(newImages);
      
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async (imageUrl: string, index: number) => {
    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      // Delete from storage
      const { error } = await supabase.storage
        .from(bucket)
        .remove([fileName]);

      if (error) throw error;

      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);
      
      toast.success('Image removed successfully!');
    } catch (error) {
      console.error('Error removing image:', error);
      toast.error('Error removing image');
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      if (images.length < maxImages) {
        if (file.type.startsWith('image/')) {
          uploadImage(file);
        } else {
          toast.error('Please select only image files');
        }
      } else {
        toast.error(`Maximum ${maxImages} images allowed`);
      }
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
      e.target.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Label>Images ({images.length}/{maxImages})</Label>
      
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading || images.length >= maxImages}
        />
        
        {uploading ? (
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p className="text-sm text-gray-600">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <p className="text-sm text-gray-600">
              <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border bg-gray-100">
                <img
                  src={imageUrl}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(imageUrl, index);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          
          {/* Add More Button */}
          {images.length < maxImages && (
            <div
              onClick={openFileDialog}
              className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 flex items-center justify-center cursor-pointer transition-colors group"
            >
              <div className="flex flex-col items-center space-y-1">
                <Plus className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                <span className="text-xs text-gray-500">Add Image</span>
              </div>
            </div>
          )}
        </div>
      )}
      
      {images.length >= maxImages && (
        <p className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
          Maximum {maxImages} images reached
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
