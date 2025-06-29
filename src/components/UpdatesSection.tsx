
import React from 'react';
import { useUpdates } from '@/hooks/useUpdates';
import UpdateCard from './UpdateCard';
import { Loader2 } from 'lucide-react';

const UpdatesSection = () => {
  const { data: updates, isLoading } = useUpdates();

  // Filter only published updates with images
  const publishedUpdates = updates?.filter(update => update.published && update.image_url) || [];

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading updates...</p>
          </div>
        </div>
      </section>
    );
  }

  if (publishedUpdates.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest Updates
          </h2>
          <p className="text-xl text-gray-600">
            Stay informed with our newest announcements and offers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedUpdates.map(update => (
            <UpdateCard key={update.id} update={update} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpdatesSection;
