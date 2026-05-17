import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './welcome.css';

const line = 'Crafting Scalable Digital Systems With Precision Motion';

export default function Welcome() {
  return (
    <motion.main className='welcome page-shell' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <section className='hero glass'>
        <motion.p initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>Senior Full Stack Developer • 6+ Years • React / Next / Laravel</motion.p>
        <h1 className='section-title'>
          {line.split(' ').map((w, i) => <motion.span key={w + i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}>{w} </motion.span>)}
        </h1>
        <p>I build high-performance products blending strong engineering with immersive UI systems.</p>
        <div className='hero-cta'>
          <Link to='/projects' className='btn primary'>Explore Projects</Link>
          <Link to='/contact' className='btn'>Let’s Build Something Extraordinary</Link>
        </div>
      </section>
    </motion.main>
  );
}
