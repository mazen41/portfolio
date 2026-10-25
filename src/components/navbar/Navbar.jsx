import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LightModeRoundedIcon  from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon   from '@mui/icons-material/DarkModeRounded';
import MenuRoundedIcon       from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon      from '@mui/icons-material/CloseRounded';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../Them';
import './navbar.css';

const LINKS = [
  { to: '/',        label: 'Home' },
  { to: '/about',   label: 'About' },
  { to: '/projects',label: 'Work' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [open,      setOpen]    = useState(false);
  const [scrolled,  setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className={`nav-root${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">

        <Link to="/" className="nav-brand">
          <span className="nav-brand-text">Mazen Hossny</span>
          <span className="nav-brand-dot" />
        </Link>

        <nav className="nav-links">
          {LINKS.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to} className={`nav-link${active ? ' active' : ''}`}>
                {label}
                {active && (
                  <motion.span
                    className="nav-link-underline"
                    layoutId="nav-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="nav-actions">
          <button className="nav-icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark'
              ? <LightModeRoundedIcon style={{ fontSize: 18 }} />
              : <DarkModeRoundedIcon  style={{ fontSize: 18 }} />}
          </button>
          <a
            href="mailto:mazen.hossn.121@gmail.com"
            className="nav-cta"
          >
            Hire Me
          </a>
          <button className="nav-icon-btn nav-hamburger" onClick={() => setOpen(true)} aria-label="Open menu">
            <MenuRoundedIcon style={{ fontSize: 20 }} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.aside
              className="nav-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="nav-drawer-header">
                <span className="nav-brand-text">Menu</span>
                <button className="nav-icon-btn" onClick={() => setOpen(false)} aria-label="Close">
                  <CloseRoundedIcon style={{ fontSize: 20 }} />
                </button>
              </div>
              {LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`nav-drawer-link${location.pathname === to ? ' active' : ''}`}
                >
                  {label}
                </Link>
              ))}
              <div className="nav-drawer-footer">
                <button className="nav-icon-btn" onClick={toggleTheme}>
                  {theme === 'dark'
                    ? <><LightModeRoundedIcon style={{ fontSize: 16 }} /> Light mode</>
                    : <><DarkModeRoundedIcon  style={{ fontSize: 16 }} /> Dark mode</>}
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
