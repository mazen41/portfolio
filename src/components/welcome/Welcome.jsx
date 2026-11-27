import useSeo from '../../useSeo';
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DevicesIcon from '@mui/icons-material/Devices';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import VerifiedIcon from '@mui/icons-material/Verified';
import Navbar from '../navbar/Navbar';
import { pageVariants, easeOutExpo, fadeUp, staggerParent } from '../../motionSystem';
import './welcome.css';

// Stats accurate to actual codebase & CV (12 shipped featured projects displayed on the site)
const STATS = [
  { value: '6+',  label: 'Years Experience' },
  { value: '12+', label: 'Shipped Projects' },
  { value: '50K+', label: 'App Downloads' },
  { value: '3',   label: 'Countries Deployed (EG, SA, UAE)' },
];

const STACK = [
  'Laravel', 'Next.js', 'Flutter', 'React',
  'PHP', 'Dart', 'TypeScript', 'Redis',
  'Salla Apps', 'REST API', 'MySQL', 'Tailwind',
];

// Single place for the service price line. Replace with real prices later.
const SERVICE_PRICE_NOTE = 'Fixed quote after a free 15 minute call';

const SERVICES = [
  {
    icon: <DevicesIcon className="service-icon" />,
    title: 'Web Applications',
    desc: 'High-performance SaaS platforms, client portals, and web products engineered with Next.js, React, and Laravel.',
    price: SERVICE_PRICE_NOTE,
  },
  {
    icon: <PhoneIphoneIcon className="service-icon" />,
    title: 'Flutter Mobile Apps',
    desc: 'Cross-platform iOS and Android mobile apps with native fluid feel, in-app purchases, offline caching, and push notifications.',
    price: SERVICE_PRICE_NOTE,
  },
  {
    icon: <ShoppingBagIcon className="service-icon" />,
    title: 'Salla Apps & Stores',
    desc: 'Custom Salla App Store plugins, OAuth integrations, automated webhook event triggers, and tailored e-commerce enhancements.',
    price: SERVICE_PRICE_NOTE,
  },
  {
    icon: <DashboardIcon className="service-icon" />,
    title: 'Admin Dashboards & ERPs',
    desc: 'Custom back-office control panels, multi-tenant operations systems, granular RBAC, and automated tabular/PDF reporting.',
    price: SERVICE_PRICE_NOTE,
  },
  {
    icon: <SmartToyIcon className="service-icon" />,
    title: 'API & AI Chatbot Integrations',
    desc: 'Multi-channel messaging pipelines, WhatsApp automation bots, AI triage workflows, and custom payment gateway integrations.',
    price: SERVICE_PRICE_NOTE,
  },
];

export default function Welcome() {
  useSeo({ title: 'Mazen Hossny | Full-Stack Developer for Salla Stores, SaaS and Mobile Apps', description: 'Full-stack developer for Salla stores, SaaS and mobile apps. Laravel, Next.js, Flutter. 50K+ app downloads, live in Egypt, Saudi Arabia and the UAE.', path: '/' });
  return (
    <motion.main
      className="home-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: easeOutExpo }}
    >
      <Navbar />

      {/* Background orbs */}
      <div className="orb orb-1" aria-hidden />
      <div className="orb orb-2" aria-hidden />

      <div className="home-shell">

        {/* ── Hero ─────────────────────────────────────────── */}
        <motion.section
          className="hero-section hero-layout-split"
          variants={staggerParent}
          initial="hidden"
          animate="show"
        >
          {/* Left Column: Copy & CTAs */}
          <div className="hero-text-col">
            <motion.div variants={fadeUp} transition={{ duration: 0.4, ease: easeOutExpo }}>
              <span className="hero-eyebrow">Available for freelance & contract</span>
            </motion.div>

            <motion.h1
              className="hero-headline"
              variants={fadeUp}
              transition={{ duration: 0.45, ease: easeOutExpo, delay: 0.05 }}
            >
              Full-stack developer for Salla stores, SaaS and mobile apps.
            </motion.h1>

            <motion.p
              className="hero-tech-lead"
              variants={fadeUp}
              transition={{ duration: 0.45, ease: easeOutExpo, delay: 0.08 }}
            >
              <span className="gradient-text">Laravel, Next.js, Flutter. Arabic and English.</span>
            </motion.p>

            <motion.div
              className="hero-proof-line"
              variants={fadeUp}
              transition={{ duration: 0.45, ease: easeOutExpo, delay: 0.12 }}
            >
              <VerifiedIcon className="proof-icon" />
              <span>50K+ app downloads, live in Egypt, Saudi Arabia and the UAE.</span>
            </motion.div>

            <motion.div
              className="hero-cta-row"
              variants={fadeUp}
              transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.16 }}
            >
              <Link to="/projects" className="btn-primary">View My Work</Link>
              <Link to="/contact"  className="btn-ghost">Get In Touch</Link>
              <a
                href="/resume.pdf"
                download
                className="btn-cv"
                aria-label="Download CV"
              >
                ↓ Download CV
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive Product Mockup */}
          <motion.div
            className="hero-visual-col"
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 }}
          >
            <div className="hero-mockup-frame">
              <div className="mockup-window-header">
                <span className="mockup-dot red" />
                <span className="mockup-dot yellow" />
                <span className="mockup-dot green" />
                <span className="mockup-title-bar">nazbiz.io — Omnichannel AI Messaging</span>
              </div>
              <div className="mockup-content">
                <img
                  src="./nazbiz/nazbiz-1.jpeg"
                  alt="Mazen Hossny - Featured Platform NazBiz"
                  className="mockup-img"
                />
                <div className="mockup-floating-card">
                  <div className="floating-badge-pulse" />
                  <div>
                    <strong className="floating-title">Featured Project</strong>
                    <span className="floating-sub">NazBiz · Omnichannel AI Messaging</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ── Stats ────────────────────────────────────────── */}
        <motion.div
          className="stats-row"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="stat-card">
              <span className="stat-value">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Credibility Highlight Ribbon ─────────────────── */}
        <div className="credibility-ribbon">
          <span className="ribbon-label">Key Credibility:</span>
          <span className="ribbon-text">Built for <strong>Nahdet Misr</strong> and the <strong>Ministry of Immigration</strong></span>
          <span className="ribbon-divider">•</span>
          <span className="ribbon-text">Published apps live on <strong>Google Play & App Store</strong></span>
        </div>

        {/* ── Services Section ─────────────────────────────── */}
        <section className="services-section">
          <div className="section-head-center">
            <span className="hero-eyebrow">What I Build</span>
            <h2 className="section-title">Specialized Services</h2>
            <p className="section-desc">
              End-to-end engineering tailored for startups, e-commerce brands, and enterprises.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.title}
                className="service-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: easeOutExpo }}
              >
                <div className="service-icon-wrap">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-body">{service.desc}</p>
                <div className="service-price-tag">
                  <span className="price-label">Pricing</span>
                  <span className="price-val">{service.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ───────────────────────────────────── */}
        <section className="home-final-cta">
          <h2>Ready to build your next product?</h2>
          <p>Let's talk about your project scope, timeline, and deliverables.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn-primary">
              Start a Conversation <ArrowForwardIcon style={{ fontSize: 16, marginLeft: 6 }} />
            </Link>
            <Link to="/projects" className="btn-ghost">
              Explore All Projects
            </Link>
          </div>
        </section>

      </div>

      {/* ── Marquee stack strip ───────────────────────────── */}
      <div className="marquee-wrap" aria-hidden>
        <div className="marquee-track">
          {[...STACK, ...STACK].map((tech, i) => (
            <span key={i} className="marquee-item">{tech}</span>
          ))}
        </div>
      </div>

    </motion.main>
  );
}
