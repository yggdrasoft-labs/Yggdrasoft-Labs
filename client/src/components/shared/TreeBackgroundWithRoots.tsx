import { motion, useScroll, useTransform } from 'framer-motion';

interface TreeBackgroundWithRootsProps {
  imagePath: string;
}

export const TreeBackgroundWithRoots = ({ imagePath }: TreeBackgroundWithRootsProps) => {
  const { scrollYProgress } = useScroll();

  // Subtle parallax effect - tree moves slightly slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 0.7, 0.7, 0.6]);

  return (
    <>
      {/* Absolute positioned tree that spans the entire content height */}
      <div 
        className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none z-0 overflow-hidden"
        style={{ minHeight: '100%' }}
      >
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Tree image - positioned to span from top to bottom */}
          <img
            src={imagePath}
            alt="Yggdrasil Tree"
            className="absolute"
            style={{
              width: 'auto',
              height: '100%',
              minHeight: '100%',
              maxWidth: '100vw',
              objectFit: 'contain',
              objectPosition: 'center center',
              filter: 'drop-shadow(0 0 60px rgba(140, 114, 49, 0.4)) brightness(1.1)',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </motion.div>

        {/* Gradient overlays for depth and blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-primary/60 via-background-primary/20 to-background-primary/50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background-primary/40 via-transparent to-background-primary/40 pointer-events-none" />




      </div>
    </>
  );
};
