import { motion } from 'framer-motion';
import { Button } from '../shared/Button';
import { useFetch } from '../../hooks/useFetch';
import { getSettings } from '../../services/api';
import { fadeInUp, staggerContainer, floatingAnimation } from '../../styles/theme';
import { GalaxyBackground } from '../shared/GalaxyBackground';
import { Settings } from '../../types';

export const Hero = () => {
  const { data: settings, loading } = useFetch<Settings>(getSettings);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center bg-background-primary"
      >
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-gold border-t-transparent rounded-full mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background-primary"
    >
      {/* Galaxy Background */}
      <GalaxyBackground />

      <motion.div
        className="container mx-auto px-6 text-center z-10 relative"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={floatingAnimation} animate="animate">
          <div className="w-40 h-40 mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl" />
            <img 
              src="/assets/favicon.png" 
              alt="Yggrasoft Labs Logo" 
              className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
            />
          </div>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-6xl md:text-8xl font-bold text-gold mb-6 drop-shadow-2xl font-heading tracking-wider"
        >
          {settings?.siteName || 'Yggrasoft Labs'}
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-2xl md:text-3xl text-gold-light mb-8 drop-shadow-lg font-accent"
        >
          {settings?.tagline || 'Connecting Realms of Innovation'}
        </motion.p>

        <motion.p
          variants={fadeInUp}
          className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-md"
        >
          {settings?.missionStatement ||
            'Like the branches of Yggdrasil reaching across nine realms, we extend our expertise across multiple domains, creating solutions that bridge innovation and real-world impact.'}
        </motion.p>

        <motion.div variants={fadeInUp} className="flex gap-4 justify-center flex-wrap">
          <Button
            onClick={() => scrollToSection('domains')}
            variant="primary"
            ariaLabel="Learn more about our domains"
          >
            Explore Our Domains
          </Button>
          <Button
            onClick={() => scrollToSection('contact')}
            variant="secondary"
            ariaLabel="Get in touch"
          >
            Connect With Us
          </Button>
        </motion.div>
      </motion.div>


      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-gold rounded-full"
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};
