import React from "react";
import { motion } from "framer-motion";
import "./welcome.css";
import Navbar from "../navbar/Navbar";

const projects = [
  {
    title: "SAMH System",
    image: "adminPNG.PNG",
    badge: "Full System",
    description:
      "An enterprise-grade automotive operations platform that unifies car listings, sales, inspections, and examination reporting into one scalable workflow.",
    features: [
      "Car listings and sales lifecycle management",
      "Inspection workflows and examination reports",
      "Image handling with status tracking",
      "Role-based admin dashboards"
    ],
    stack: ["React", "Laravel", "MySQL", "REST APIs"]
  },
  {
    title: "Qartaji Platform",
    image: "qartjiPNG.PNG",
    badge: "B2B Procurement",
    description:
      "A full-featured B2B procurement platform connecting companies with suppliers through structured RFQs, quote comparison, and approval automation in a centralized control center.",
    features: [
      "Multi-role system for buyers, suppliers, and admins",
      "RFQ creation with quotation comparison",
      "Workflow automation and notification engine",
      "Dashboard analytics and secure authentication"
    ],
    stack: ["React", "Node.js", "PostgreSQL", "JWT"]
  },
  {
    title: "HR Management System",
    image: "maiPNG.PNG",
    badge: "Enterprise",
    description:
      "A comprehensive HR suite built to manage workforce operations at scale, including employee records, branch structures, attendance governance, and access control.",
    features: [
      "Employee, department, and branch management",
      "Attendance, roles, and permissions system",
      "Operational dashboards for HR leaders",
      "Audit-ready administration workflows"
    ],
    stack: ["React", "Laravel", "MySQL", "RBAC"]
  },
  {
    title: "Yaman System",
    image: "Dashboard.png",
    badge: "Logistics",
    description:
      "A complete order, shipping, and tracking management platform covering the full delivery lifecycle from basket to fulfillment analytics.",
    features: [
      "Order lifecycle management",
      "Basket/cart and checkout operations",
      "Shipping and delivery tracking",
      "Reports, analytics, and admin control panel"
    ],
    stack: ["React", "Node.js", "MongoDB", "Socket.IO"]
  }
];

const imageFromPublic = (fileName) => `${process.env.PUBLIC_URL}/${fileName}`;

export default function Welcome() {
  return (
    <motion.div className="portfolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Navbar />

      <header className="hero" id="home">
        <p className="eyebrow">Freelance Full-Stack Engineer</p>
        <h1>I build scalable systems, not just websites.</h1>
        <p className="subtitle">
          I design and develop production-grade platforms for companies that need reliability, performance, and clean user experience — from internal dashboards to enterprise workflows.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="primary">View Signature Projects</a>
          <a href="#contact" className="secondary">Book a Project Call</a>
        </div>
      </header>

      <section className="about" id="about">
        <h2>About</h2>
        <p>
          I help founders and operations teams turn complex business logic into elegant digital products. My focus is delivering software that is maintainable, conversion-focused, and built for real business growth.
        </p>
      </section>

      <section className="skills" id="skills">
        <h2>Core Skills</h2>
        <div className="skill-grid">
          <article><h3>Frontend</h3><p>React, Next.js, TypeScript, UI Architecture, Accessibility</p></article>
          <article><h3>Backend</h3><p>Laravel, Node.js, API Design, Auth, Workflow Engines</p></article>
          <article><h3>Systems</h3><p>RBAC, Reporting, Dashboards, Enterprise Data Modeling</p></article>
        </div>
      </section>

      <section className="projects" id="projects">
        <div className="section-head"><h2>Featured Systems</h2><p>Selected platforms built for real-world operations.</p></div>
        <div className="project-grid">
          {projects.map((project) => (
            <motion.article className="project-card" key={project.title} whileHover={{ y: -8 }} transition={{ duration: 0.25 }}>
              <div className="cover-wrap">
                <img src={imageFromPublic(project.image)} alt={project.title} loading="lazy" />
                <span>{project.badge}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <h4>Key Features</h4>
              <ul>{project.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <div className="stack">{project.stack.map((tech) => <em key={tech}>{tech}</em>)}</div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <h2>Let’s Build Your Next System</h2>
        <p>Available for freelance contracts and long-term product partnerships.</p>
        <a href="mailto:mazen@example.com">mazen@example.com</a>
      </section>
    </motion.div>
  );
}
