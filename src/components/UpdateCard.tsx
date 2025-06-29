
import React from 'react';
import { Update } from '@/hooks/useUpdates';

interface UpdateCardProps {
  update: Update;
}

const UpdateCard: React.FC<UpdateCardProps> = ({ update }) => {
  if (!update.image_url) return null;

  return (
    <div className="bg-white rounded-lg amazon-shadow hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="aspect-video">
        <img
          src={update.image_url}
          alt="Update poster"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </div>
    </div>
  );
};

export default UpdateCard;
