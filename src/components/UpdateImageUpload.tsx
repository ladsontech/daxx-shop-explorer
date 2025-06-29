
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { X, Upload, Loader2, Camera } from 'lucide-react';

interface UpdateImageUploadProps {
  imageUrl: string | null;
  onImageChange: (imageUrl: string | null) => void;
}

const UpdateImageUpload: React.FC<UpdateImageUploadProps> = ({
  imageUrl,
  onImageChange,
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        toast.error('Please select only image files.');
        return;
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File is too large. Maximum size is 10MB.');
        return;
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('update-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('update-images')
        .getPublicUrl(data.path);

      onImageChange(publicUrl);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    try {
      if (imageUrl) {
        // Extract filename from the URL for storage deletion
        const urlParts = imageUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];
        
        // Attempt to delete from storage (don't wait for it)
        if (fileName && !fileName.includes('placeholder')) {
          supabase.storage
            .from('update-images')
            .remove([fileName])
            .then(({ error }) => {
              if (error) {
                console.warn('Storage deletion warning:', error);
              }
            })
            .catch((error) => {
              console.warn('Storage deletion failed:', error);
            });
        }
      }

      // Immediately remove from UI
      onImageChange(null);
      toast.success('Image removed!');
    } catch (error) {
      console.error('Error removing image:', error);
      // Still remove from UI even if there's an error
      onImageChange(null);
      toast.success('Image removed!');
    }
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
      const file = e.dataTransfer.files[0];
      uploadImage(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadImage(e.target.files[0]);
      e.target.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Label>Update Image (Landscape Preferred)</Label>
      
      {/* Current Image Preview */}
      {imageUrl && (
        <div className="relative group">
          <div className="aspect-video rounded-lg overflow-hidden border bg-gray-100 max-w-md">
            <img
              src={imageUrl}
              alt="Update preview"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </div>
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
            title="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

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
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
        
        {uploading ? (
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p className="text-sm text-gray-600">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <Camera className="h-8 w-8 text-gray-400" />
            <p className="text-sm text-gray-600">
              <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            <p className="text-xs text-gray-500">Landscape format (16:9) recommended for best display</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateImageUpload;
