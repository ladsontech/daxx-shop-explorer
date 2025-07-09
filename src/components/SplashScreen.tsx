
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
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50 animate-fade-out">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <img 
              src="/images/logo.png" 
              alt="E-Sale Uganda Logo"
              className="h-20 w-auto max-w-[200px] object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2 font-playfair amazon-orange">E-Sale Uganda</h1>
          <p className="text-muted-foreground">Your trusted marketplace</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <img 
            src="/images/logo.png" 
            alt="E-Sale Uganda Logo" 
            className="h-20 w-auto max-w-[200px] object-contain animate-fade-in"
          />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2 animate-fade-in font-playfair amazon-orange">E-Sale Uganda</h1>
        <p className="text-muted-foreground animate-fade-in">Your trusted marketplace</p>
        <div className="mt-8">
          <div className="inline-block h-2 w-16 bg-muted rounded-full overflow-hidden">
            <div className="h-full amazon-orange rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
