import React, { useEffect, useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Welcome  from './components/welcome/Welcome';
import Contact  from './components/contact/Contact';
import About    from './components/about/About';
import Projects from './components/projects/Projects';
import { ThemeProvider, useTheme } from './Them';

// Cursor using refs + direct DOM style — zero framer overhead
function Cursor() {
  const ringRef = useRef(null);
  const dotRef  = useRef(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot  = dotRef.current;
    if (!ring || !dot) return;

    const move = (e) => {
      const x = e.clientX, y = e.clientY;
      ring.style.left = x + 'px';
      ring.style.top  = y + 'px';
      dot.style.left  = x + 'px';
      dot.style.top   = y + 'px';
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor" />
      <div ref={dotRef}  className="cursor-dot" />
    </>
  );
}

function Inner() {
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  return (
    <div className="App">
      <Cursor />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"        element={<Welcome />} />
          <Route path="/about"   element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function AnimatedRoutes() {
  return (
    <ThemeProvider>
      <Inner />
    </ThemeProvider>
  );
}
