import React, { useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Welcome from './components/welcome/Welcome';
import { AnimatePresence, motion } from 'framer-motion';
import Contact from './components/contact/Contact';
import About from './components/about/About';
import Design from './components/Design';
import Projects from './components/projects/Projects';
import { loadSlim } from 'tsparticles-slim';
import Particles from 'react-tsparticles';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();

  const particlesOptions = useMemo(
    () => ({
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        color: { value: ['#6b8cff', '#8ef0ff', '#e1e7ff'] },
        links: { enable: true, distance: 110, opacity: 0.15, width: 1, color: '#8ef0ff' },
        move: { enable: true, speed: 0.5 },
        number: { value: 42 },
        opacity: { value: { min: 0.15, max: 0.5 } },
        size: { value: { min: 1, max: 3 } },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: 'grab' } },
        modes: { grab: { distance: 120, links: { opacity: 0.4 } } },
      },
    }),
    []
  );

  return (
    <div className='App'>
      <Particles id='particles' init={loadSlim} options={particlesOptions} className='particles-bg' />
      <motion.div className='app-gradient' animate={{ rotate: [0, 8, -6, 0] }} transition={{ duration: 18, repeat: Infinity }} />
      <AnimatePresence mode='wait'>
        <Design />
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Welcome />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<Projects />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default AnimatedRoutes;
