import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScrollingYggdrasilImageProps {
  imagePath: string;
  imageHeight?: number; // Total height of your image in pixels
}

export const ScrollingYggdrasilImage = ({ 
  imagePath, 
  imageHeight: _imageHeight = 5000 
}: ScrollingYggdrasilImageProps) => {
  const [windowHeight, setWindowHeight] = useState(0);
  
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollY } = useScroll();
  
  // Calculate how much of the image to show based on scroll
  // Maps scroll position to vertical position in the image
  const backgroundPositionY = useTransform(
    scrollY,
    [0, document.body.scrollHeight - windowHeight],
    ['0%', '100%']
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${imagePath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundPositionY,
          opacity: 0.6,
        }}
      />
      
      {/* Optional overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-primary/80 via-background-primary/60 to-background-primary/80" />
    </div>
  );
};
