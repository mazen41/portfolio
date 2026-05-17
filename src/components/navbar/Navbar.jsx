import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { motion, AnimatePresence } from 'framer-motion';
import './navbar.css';
import { useTheme } from '../../Them';

const links = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className={`navbar ${theme}`}>
      <div className='nav-shell'>
        <Link to='/' className='brand'>Mazen Hossny</Link>
        <nav className='desktop-nav'>
          {links.filter((l) => l.to !== location.pathname).map((link) => (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          ))}
        </nav>
        <div className='actions'>
          <button className='theme-btn' onClick={toggleTheme} aria-label='Toggle theme'>
            {theme === 'dark' ? <LightModeRoundedIcon fontSize='small' /> : <DarkModeRoundedIcon fontSize='small' />}
          </button>
          <button className='menu-btn' onClick={() => setOpen(true)} aria-label='Open menu'>
            <MenuRoundedIcon />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className='mobile-wrap' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className='mobile-nav' initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}>
              <button className='close-btn' onClick={() => setOpen(false)}><CloseRoundedIcon /></button>
              {links.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>{link.label}</Link>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
