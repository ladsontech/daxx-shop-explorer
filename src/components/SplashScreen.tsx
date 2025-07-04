import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 300); // Wait for fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50 animate-fade-out">
        <div className="text-center">
          <img 
            src="/images/logo.png" 
            alt="Esale Uganda Logo"
            className="h-24 w-24 mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-playfair">Esale Uganda</h1>
          <p className="text-gray-600">Your trusted marketplace</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        <img 
          src="/images/logo.png" 
          alt="Esale Uganda Logo" 
          className="h-24 w-24 mx-auto mb-6"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-2 animate-fade-in font-playfair">Esale Uganda</h1>
        <p className="text-gray-600 animate-fade-in">Your trusted marketplace</p>
        <div className="mt-8">
          <div className="inline-block h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full amazon-orange rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;