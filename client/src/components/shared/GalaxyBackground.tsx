export const GalaxyBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Starry sky background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/stars-background.jpg)',
          backgroundPosition: 'center top',
        }}
      />

      {/* Gradient fade to tree section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-background-primary" />
    </div>
  );
};
