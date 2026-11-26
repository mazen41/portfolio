import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../navbar/Navbar';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { pageVariants, easeOutExpo, fadeUp, staggerParent } from '../../motionSystem';
import './contact.css';

const EMAIL = 'mazen.hossny.121@gmail.com';
const WHATSAPP_NUMBER_PLACEHOLDER = '+20 115 287 9755'; // Mazen's official verified number from CV
const WHATSAPP_LINK = 'https://wa.me/201152879755';

const SOCIALS = [
  {
    label: 'LinkedIn',
    handle: 'mazen-hossny',
    href: 'https://www.linkedin.com/in/mazen-hossny-54a8a02b7/',
    icon: <LinkedInIcon />,
    color: '#0a66c2',
  },
  {
    label: 'GitHub',
    handle: 'mazen41',
    href: 'https://github.com/mazen41',
    icon: <GitHubIcon />,
    color: '#e8f8ff',
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    budget: '',
    timeline: '',
  });

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry: ${formData.project || 'New Project'} from ${formData.name}`);
    const bodyText = `Hello Mazen,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Details: ${formData.project}\nBudget: ${formData.budget || 'Not specified'}\nTimeline: ${formData.timeline || 'Not specified'}\n`;
    const mailtoUrl = `mailto:${EMAIL}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <motion.main
      className="contact-page page-shell"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: easeOutExpo }}
    >
      <Navbar />

      <motion.section
        className="contact-inner"
        variants={staggerParent}
        initial="hidden"
        animate="show"
      >
        {/* ── Heading ──────────────────────────────────────── */}
        <motion.p
          className="contact-eyebrow"
          variants={fadeUp}
          transition={{ duration: 0.35, ease: easeOutExpo }}
        >
          Contact
        </motion.p>

        <motion.h1
          className="section-title contact-headline"
          variants={fadeUp}
          transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.05 }}
        >
          Let's build something<br />
          <span className="gradient-text">extraordinary.</span>
        </motion.h1>

        <motion.p
          className="contact-sub"
          variants={fadeUp}
          transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.1 }}
        >
          Whether you need a custom Salla app, a SaaS product, a mobile app, or end-to-end full-stack development — I am ready to discuss your goals.
        </motion.p>

        {/* ── 24-Hour Response Guarantee Banner ─────────────── */}
        <motion.div
          className="response-guarantee-banner"
          variants={fadeUp}
          transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.12 }}
        >
          <AccessTimeIcon className="guarantee-icon" />
          <span>I reply within 24 hours.</span>
        </motion.div>

        {/* ── Contact Methods Row (Email + WhatsApp) ───────── */}
        <motion.div
          className="contact-quick-channels"
          variants={fadeUp}
          transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.15 }}
        >
          {/* Email block */}
          <div className="contact-channel-card">
            <div className="contact-email-icon"><EmailIcon /></div>
            <div className="contact-email-text">
              <span className="contact-email-label">Email</span>
              <a href={`mailto:${EMAIL}`} className="contact-email-value">{EMAIL}</a>
            </div>
            <button
              className={`contact-copy-btn${copied ? ' copied' : ''}`}
              onClick={copyEmail}
              aria-label="Copy email"
            >
              {copied ? <CheckIcon style={{ fontSize: 16 }} /> : <ContentCopyIcon style={{ fontSize: 16 }} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          {/* WhatsApp Button */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn-card"
          >
            <div className="whatsapp-icon-wrap"><WhatsAppIcon /></div>
            <div className="whatsapp-info">
              <span className="whatsapp-label">Direct Message</span>
              <span className="whatsapp-number">WhatsApp ({WHATSAPP_NUMBER_PLACEHOLDER})</span>
            </div>
            <span className="channel-arrow">↗</span>
          </a>
        </motion.div>

        {/* ── Project Inquiry Form ─────────────────────────── */}
        <motion.div
          className="project-form-container"
          variants={fadeUp}
          transition={{ duration: 0.45, ease: easeOutExpo, delay: 0.18 }}
        >
          <div className="form-header">
            <h3>Start a Project</h3>
            <p>Tell me a bit about your idea, timeline, and goals. This form creates an email directly to my inbox.</p>
          </div>

          <form onSubmit={handleFormSubmit} className="project-form">
            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Sarah Miller"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="e.g. sarah@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="project">Project Details *</label>
              <textarea
                id="project"
                name="project"
                rows="4"
                required
                placeholder="Briefly describe what you are looking to build (e.g. Salla app integration, Flutter mobile app, Laravel SaaS dashboard)..."
                value={formData.project}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-row two-col">
              <div className="form-group">
                <label htmlFor="budget">Estimated Budget</label>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  placeholder="e.g. $1,500 - $3,000 [or placeholder]"
                  value={formData.budget}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="timeline">Desired Timeline</label>
                <input
                  type="text"
                  id="timeline"
                  name="timeline"
                  placeholder="e.g. 3-4 weeks"
                  value={formData.timeline}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary submit-project-btn">
              <SendIcon style={{ fontSize: 18, marginRight: 8 }} />
              Send Project Inquiry to Email
            </button>
          </form>
        </motion.div>

        {/* ── Socials (Without inactive X) ──────────────────── */}
        <motion.div
          className="contact-socials"
          variants={fadeUp}
          transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.22 }}
        >
          {SOCIALS.map(({ label, handle, href, icon, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              style={{ '--social-color': color }}
            >
              <span className="social-icon">{icon}</span>
              <div>
                <span className="social-label">{label}</span>
                <span className="social-handle">{handle}</span>
              </div>
              <span className="social-arrow">↗</span>
            </a>
          ))}
        </motion.div>

      </motion.section>
    </motion.main>
  );
}
