import useSeo from '../../useSeo';
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DevicesIcon from '@mui/icons-material/Devices';
import BugReportIcon from '@mui/icons-material/BugReport';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import VerifiedIcon from '@mui/icons-material/Verified';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Navbar from '../navbar/Navbar';
import { pageVariants, easeOutExpo, fadeUp, staggerParent } from '../../motionSystem';
import { whatsappLink } from '../../contactConfig';
import { useLanguage } from '../../i18n/LanguageContext';
import './welcome.css';

// Stats accurate to actual codebase & CV (12 shipped featured projects displayed on the site)
const STATS = [
  { value: '6+',  key: 'hStatYears' },
  { value: '12+', key: 'hStatProjects' },
  { value: '50K+', key: 'hStatDownloads' },
  { value: '3',   key: 'hStatCountries' },
];

const STACK = [
  'Laravel', 'Next.js', 'Flutter', 'React',
  'PHP', 'Dart', 'TypeScript', 'Redis',
  'Salla Apps', 'REST API', 'MySQL', 'Tailwind',
];

// Starting prices per service. Edit these values only.
const SERVICES = [
  {
    icon: <DevicesIcon className="service-icon" />,
    titleKey: 'hServ1Title',
    descKey: 'hServ1Desc',
    price: '$250',
  },
  {
    icon: <ShoppingBagIcon className="service-icon" />,
    titleKey: 'hServ2Title',
    descKey: 'hServ2Desc',
    price: '$500',
  },
  {
    icon: <DashboardIcon className="service-icon" />,
    titleKey: 'hServ3Title',
    descKey: 'hServ3Desc',
    price: '$1,500',
  },
  {
    icon: <SmartToyIcon className="service-icon" />,
    titleKey: 'hServ4Title',
    descKey: 'hServ4Desc',
    price: '$300',
  },
  {
    icon: <BugReportIcon className="service-icon" />,
    titleKey: 'hServ5Title',
    descKey: 'hServ5Desc',
    price: '$15/hr',
  },
];

export default function Welcome() {
  const { t } = useLanguage();
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
              <span className="hero-eyebrow">{t('hEyebrow')}</span>
            </motion.div>

            <motion.h1
              className="hero-headline"
              variants={fadeUp}
              transition={{ duration: 0.45, ease: easeOutExpo, delay: 0.05 }}
            >
              {t('hHeadline')}
            </motion.h1>

            <motion.p
              className="hero-tech-lead"
              variants={fadeUp}
              transition={{ duration: 0.45, ease: easeOutExpo, delay: 0.08 }}
            >
              <span className="gradient-text">{t('hTechLead')}</span>
            </motion.p>

            <motion.div
              className="hero-proof-line"
              variants={fadeUp}
              transition={{ duration: 0.45, ease: easeOutExpo, delay: 0.12 }}
            >
              <VerifiedIcon className="proof-icon" />
              <span>{t('hProof')}</span>
            </motion.div>

            <motion.div
              className="hero-cta-row"
              variants={fadeUp}
              transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.16 }}
            >
              <a
                href={whatsappLink("Hi Mazen, I found your portfolio and I'd like to talk about a project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <WhatsAppIcon style={{ fontSize: 18 }} /> {t('hWaBtn')}
              </a>
              <Link to="/projects" className="btn-ghost">{t('hViewWork')}</Link>
              <Link to="/contact"  className="btn-ghost">{t('hGetInTouch')}</Link>
              <a
                href="/resume.pdf"
                download
                className="btn-cv"
                aria-label={t('hDownloadCvAria')}
              >
                {t('hDownloadCv')}
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
                    <strong className="floating-title">{t('hFeaturedProject')}</strong>
                    <span className="floating-sub">{t('hFeaturedSub')}</span>
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
          {STATS.map(({ value, key }) => (
            <div key={key} className="stat-card">
              <span className="stat-value" dir="ltr">{value}</span>
              <span className="stat-label">{t(key)}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Credibility Highlight Ribbon ─────────────────── */}
        <div className="credibility-ribbon">
          <span className="ribbon-label">{t('hCredLabel')}</span>
          <span className="ribbon-text">{t('hCredText1')} <strong>{t('hCredNahdet')}</strong> {t('hCredAnd')} <strong>{t('hCredMinistry')}</strong></span>
          <span className="ribbon-divider">•</span>
          <span className="ribbon-text">{t('hCredText2')} <strong>{t('hCredStores')}</strong></span>
        </div>

        {/* ── Services Section ─────────────────────────────── */}
        <section className="services-section">
          <div className="section-head-center">
            <span className="hero-eyebrow">{t('hServEyebrow')}</span>
            <h2 className="section-title">{t('hServTitle')}</h2>
            <p className="section-desc">
              {t('hServDesc')}
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.titleKey}
                className="service-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: easeOutExpo }}
              >
                <div className="service-icon-wrap">{service.icon}</div>
                <h3 className="service-title">{t(service.titleKey)}</h3>
                <p className="service-body">{t(service.descKey)}</p>
                <div className="service-price-tag">
                  <span className="price-label">{t('hServStartAt')}</span>
                  <span className="price-val" dir="ltr">{service.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="services-note">{t('hServNote')}</p>
        </section>

        {/* ── Bottom CTA ───────────────────────────────────── */}
        <section className="home-final-cta">
          <h2>{t('hCtaTitle')}</h2>
          <p>{t('hCtaSub')}</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn-primary">
              {t('hCtaBtn1')} <ArrowForwardIcon style={{ fontSize: 16, marginInlineStart: 6 }} />
            </Link>
            <Link to="/projects" className="btn-ghost">
              {t('hCtaBtn2')}
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
