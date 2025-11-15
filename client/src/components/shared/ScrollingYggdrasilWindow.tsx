import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScrollingYggdrasilWindowProps {
  imagePath: string;
  imageHeight?: number; // Actual height of your image in pixels
}

export const ScrollingYggdrasilWindow = ({ 
  imagePath,
  imageHeight = 5000
}: ScrollingYggdrasilWindowProps) => {
  const [documentHeight, setDocumentHeight] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      setDocumentHeight(document.documentElement.scrollHeight);
      setWindowHeight(window.innerHeight);
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Update when content loads
    const timer = setTimeout(updateDimensions, 100);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  const { scrollY } = useScroll();
  
  // Calculate which portion of the tree image to show
  // As you scroll down the page, you see different parts of the tree
  const imageY = useTransform(
    scrollY,
    [0, Math.max(documentHeight - windowHeight, 1)],
    [0, -(imageHeight - windowHeight)]
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Container that acts as a "window" */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* The tree image that moves vertically */}
        <motion.div
          style={{ y: imageY }}
          className="relative"
        >
          <img
            src={imagePath}
            alt="Yggdrasil Tree"
            className="w-auto opacity-60"
            style={{
              height: `${imageHeight}px`,
              maxWidth: '100vw',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 50px rgba(140, 114, 49, 0.5)) brightness(1.1)',
            }}
          />
        </motion.div>
      </div>
      
      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background-primary/90 via-background-primary/20 to-background-primary/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background-primary/70 via-transparent to-background-primary/70" />
      </div>
      
      {/* Mystical particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};
