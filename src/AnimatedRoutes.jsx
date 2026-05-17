import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Welcome from './components/welcome/Welcome';
import Contact from './components/contact/Contact';
import About from './components/about/About';
import Projects from './components/projects/Projects';
import { useTheme } from './Them';

function AnimatedRoutes() {
  const location = useLocation();
  const { theme } = useTheme();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [theme]);

  return (
    <div className='App'>
      <motion.div className='cursor' animate={{ x: pos.x, y: pos.y }} />
      <motion.div className='cursor-dot' animate={{ x: pos.x, y: pos.y }} />
      <AnimatePresence mode='wait'>
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
