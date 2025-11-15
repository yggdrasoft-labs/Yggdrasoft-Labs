import { motion, useScroll, useTransform } from 'framer-motion';

interface FullPageTreeBackgroundProps {
  imagePath: string;
}

export const FullPageTreeBackground = ({ imagePath }: FullPageTreeBackgroundProps) => {
  const { scrollYProgress } = useScroll();

  // Parallax effect - tree moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 0.6, 0.6, 0.4]);

  return (
    <>
      {/* Fixed background tree that spans entire page */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img
            src={imagePath}
            alt="Yggdrasil Tree"
            className="h-full w-auto object-contain"
            style={{
              filter: 'drop-shadow(0 0 50px rgba(140, 114, 49, 0.3)) brightness(0.9)',
              minHeight: '100vh',
            }}
          />
        </motion.div>

        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-primary/80 via-background-primary/30 to-background-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background-primary/60 via-transparent to-background-primary/60" />

        {/* Mystical particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: i % 2 === 0 ? '#A89048' : '#4A7A8A',
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Floating energy orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-2 h-2 rounded-full bg-gold/40"
            style={{
              left: `${45 + Math.random() * 10}%`,
              filter: 'blur(2px)',
            }}
            animate={{
              y: ['100vh', '-10vh'],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Absolute positioned tree that spans the document height */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-0" style={{ height: '100%' }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            style={{ y }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={imagePath}
              alt="Yggdrasil Tree Background"
              className="h-[200vh] w-auto object-contain opacity-50"
              style={{
                filter: 'drop-shadow(0 0 80px rgba(140, 114, 49, 0.4)) brightness(1.1)',
              }}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};
