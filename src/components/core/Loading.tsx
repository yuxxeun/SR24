import React, { useEffect, useState } from "react";

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
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isLoaded]);

  return (
    !isLoaded && (
      <div
        id="loading-screen"
        className={`fixed left-0 top-0 z-50 flex min-h-screen w-full items-center justify-center border-b-2 border-[#7877C6] bg-zinc-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] transition-transform duration-1000 ${
          isExiting ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex items-center justify-center space-x-2">
          <img
            src="/ghost.gif"
            alt="loader ghost"
            height={200}
            width={200}
            className="object-fit"
            style={{ animationDelay: "-0.15s" }}
          />
        </div>
      </div>
    )
  );
};

export default LoadingScreen;
