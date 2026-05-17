import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../navbar/Navbar';
import './contact.css';

export default function Contact() {
  return (
    <motion.main className='contact page-shell' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <section className='glass contact-wrap'>
        <h2 className='section-title'>Let’s Build Something Extraordinary</h2>
        <p>Tell me about your next product, team, or ambitious idea.</p>
        <div className='contact-links'>
          <a href='mailto:mazen.hossn.121@gmail.com'>mazen.hossn.121@gmail.com</a>
          <a href='https://www.linkedin.com/in/mazen-hossny-54a8a02b7/' target='_blank' rel='noreferrer'>LinkedIn</a>
          <a href='https://github.com/mazen41' target='_blank' rel='noreferrer'>GitHub</a>
          <a href='https://twitter.com/mazen_hossny' target='_blank' rel='noreferrer'>Twitter/X</a>
        </div>
      </section>
    </motion.main>
  );
}
