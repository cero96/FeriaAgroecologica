import React, { useCallback } from 'react';
import { Particles } from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
const Particule = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: { enable: true, mode: 'push' },
            onHover: { enable: true, mode: 'repulse' },
            resize: true,
          },
          modes: {
            push: { quantity: 4 },
            repulse: { distance: 100, duration: 0.4 },
          },
        },
        particles: {
          color: { value: '#00ff00' },
          links: {
            color: '#00cc66',
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1.2,
          },
          collisions: { enable: true },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            outModes: { default: 'bounce' },
          },
          number: {
            value: 60,
            density: { enable: true, area: 800 },
          },
          opacity: { value: 0.5 },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 5 } },
        },
        detectRetina: true,
      }}
    />
  );
};

export default Particule;
