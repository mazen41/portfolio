import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../navbar/Navbar';
import './about.css';

const groups = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  Backend: ['Laravel', 'PHP', 'Node.js', 'REST APIs', 'MySQL'],
  Tools: ['Docker', 'Git', 'Figma', 'Postman', 'Linux'],
};

export default function About() {
  return (
    <motion.main className='about page-shell' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />
      <section className='about-grid'>
        <article className='glass block'>
          <h2 className='section-title'>About Mazen</h2>
          <p>Full Stack Developer with 5–10 years of experience designing enterprise web platforms, SaaS systems, and motion-forward interfaces.</p>
        </article>
        <article className='glass block timeline'>
          <h3>Experience Timeline</h3>
          <ul>
            <li><strong>Senior Engineer</strong><span>Leading architecture and delivery of B2B products.</span></li>
            <li><strong>Full Stack Specialist</strong><span>Built 15+ shipped applications across commerce, HR, fintech.</span></li>
            <li><strong>Frontend Craftsman</strong><span>Focused on quality UI systems and UX consistency.</span></li>
          </ul>
        </article>
      </section>
      <section className='skills'>
        {Object.entries(groups).map(([k, v], idx) => (
          <motion.div className='glass skill-col' key={k} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.1 }}>
            <h4>{k}</h4><div>{v.map((s) => <span key={s}>{s}</span>)}</div>
          </motion.div>
        ))}
      </section>
    </motion.main>
  );
}
