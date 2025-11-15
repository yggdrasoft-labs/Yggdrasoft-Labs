import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollingYggdrasilClipProps {
  imagePath: string;
  sections?: number; // Number of sections to divide the tree into
}

export const ScrollingYggdrasilClip = ({ 
  imagePath,
  sections: _sections = 5
}: ScrollingYggdrasilClipProps) => {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to clip-path values
  // This reveals the tree from bottom to top as you scroll
  // const _clipTop = useTransform(
  //   scrollYProgress,
  //   [0, 1],
  //   [100, 0]
  // );
  
  // const _clipBottom = useTransform(
  //   scrollYProgress,
  //   [0, 1],
  //   [100, 0]
  // );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Main tree image with clip-path reveal */}
      <motion.div
        className="absolute inset-0 w-full h-full flex items-center justify-center"
        style={{
          clipPath: useTransform(
            scrollYProgress,
            [0, 1],
            [
              'inset(80% 0% 0% 0%)', // Start: only bottom 20% visible
              'inset(0% 0% 0% 0%)'   // End: fully visible
            ]
          ),
        }}
      >
        <img
          src={imagePath}
          alt="Yggdrasil Tree"
          className="h-full w-auto object-contain opacity-50"
          style={{
            maxHeight: '200vh',
            filter: 'drop-shadow(0 0 30px rgba(140, 114, 49, 0.3))',
          }}
        />
      </motion.div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-primary/70 via-transparent to-background-primary/70 pointer-events-none" />
      
      {/* Mystical glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(140, 114, 49, 0.15) 0%, transparent 70%)',
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]),
        }}
      />
    </div>
  );
};
