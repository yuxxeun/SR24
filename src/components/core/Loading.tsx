import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [isLoaded]);

  return (
    !isLoaded && (
      <div
        id="loading-screen"
        className={`fixed top-0 left-0 w-full min-h-screen bg-zinc-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex items-center justify-center z-50 transition-transform duration-1000 ${
          isExiting ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="flex space-x-2 justify-center items-center">
          <img src='/1479.gif' alt='loader ghost'
            height={200}
            width={200}
            className="object-fit"
            style={{ animationDelay: '-0.15s' }}/>
        </div>
      </div>
    )
  );
};

export default LoadingScreen;
