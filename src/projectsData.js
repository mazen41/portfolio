// projectsData.js - Single source of truth for portfolio projects and case studies

export const projectsData = [
  {
    id: 1,
    slug: 'nazbiz',
    name: 'NazBiz (Nazeer Business) — Omnichannel AI Messaging Platform',
    category: 'SaaS Platform',
    featured: true,
    badge: 'Featured SaaS · nazbiz.io',
    image: '/nazbiz/nazbiz-1.jpeg',
    screenshots: [
      { src: '/nazbiz/nazbiz-1.jpeg', title: 'NazBiz Unified Conversation & Inbox Management' },
      { src: '/nazbiz/nazbiz-2.jpeg', title: 'Omnichannel Customer Messaging Hub' },
      { src: '/nazbiz/nazbiz-3.jpeg', title: 'AI Assistant & Knowledge Base Grounding' },
      { src: '/nazbiz/nazbiz-4.jpeg', title: 'Automated Bot Workflows, Sequences & Campaigns' },
      { src: '/nazbiz/nazbiz-5.jpeg', title: 'Salla E-Commerce Integration & Live Order Status' },
      { src: '/nazbiz/nazbiz-6.jpeg', title: 'Interactive Multi-Channel Messaging Flows' },
      { src: '/nazbiz/nazbiz-7.jpeg', title: 'Human Handoff & Team Collaboration' },
      { src: '/nazbiz/nazbiz-8.jpeg', title: 'Operations Dashboard & Analytics (AR & EN)' },
      { src: '/nazbiz/nazbiz-9.jpeg', title: 'Channel & Webhook Settings' }
    ],
    smallDescription: 'Omnichannel AI customer messaging platform unifying WhatsApp, Instagram, Messenger, Telegram, TikTok & email with multi-LLM AI.',
    overview: 'NazBiz (Nazeer Business | nazbiz.io) puts WhatsApp, Instagram, Messenger, Telegram, TikTok and email into one inbox and answers customers automatically with AI (OpenAI, Claude and Gemini) grounded in each business\'s own knowledge base. Naz AutoReply is its dedicated app for Salla merchants. Shipped in 2026 across a 60-day product build cycle.',
    problem: 'Online stores lose sales when customers wait for replies. Teams juggle several apps, and generic chatbots make up prices and policies.',
    role: 'Full-stack engineer on a small product team (2026 | 60 days) — built the unified messaging layer, Salla e-commerce integration, verified knowledge base grounding, automated bot workflows, sequences, campaigns, human handoff, and bilingual dashboards.',
    stack: ['Next.js', 'React', 'TypeScript', 'Laravel', 'MySQL', 'Node.js', 'OpenAI', 'Claude', 'Gemini', 'Salla API', 'Meta Graph API'],
    credibility: 'Omnichannel AI platform handling WhatsApp, Instagram, Messenger, Telegram, TikTok and Salla stores across Arabic and English.',
    result: 'Unified multiple messaging channels into a single conversation model with idempotent sub-second webhook execution and zero duplicate orders.',
    resultNumber: 'Unified 6+ messaging channels with multi-LLM verified AI',
    liveLink: 'https://nazbiz.io',
    gitFrontendLink: null,
    gitBackendLink: null,
    features: [
      'Unified messaging layer so every channel (WhatsApp, Instagram, Messenger, Telegram, TikTok, email) and provider shares one conversation model',
      'Salla integration: product sync, live order creation, order and shipping status inside the chat',
      'Knowledge base (PDFs, FAQs, pricing) so the AI answers from verified data',
      'Bots, workflows, sequences, campaigns and human handoff when the AI should step aside',
      'Dashboard and analytics, in Arabic and English',
      'Idempotent webhook processing with unique event IDs and database constraints (retries never create duplicate orders or messages)',
      'Queued background jobs for store sync and webhooks',
      'Multi-LLM support with fallback between OpenAI, Claude, and Gemini',
      'Authenticated media handling across all messaging providers'
    ]
  },
  {
    id: 2,
    slug: 'naz-autoreply',
    name: 'Naz AutoReply — Salla App',
    category: 'E-Commerce / Salla App',
    featured: true,
    badge: 'Featured · Salla App Store',
    image: '/nazbiz/nazbiz-5.jpeg',
    screenshots: [
      { src: '/nazbiz/nazbiz-5.jpeg', title: 'Naz AutoReply Salla Integration & Live Order Operations' },
      { src: '/nazbiz/nazbiz-2.jpeg', title: 'Automated Merchant Messaging & Notification Hub' },
      { src: '/nazbiz/nazbiz-4.jpeg', title: 'Bot Sequences & Salla Event Trigger Flows' }
    ],
    smallDescription: 'Automated customer messaging and notification application built specifically for Salla e-commerce merchants.',
    overview: 'Naz AutoReply is NazBiz\'s dedicated Salla App Store application enabling merchants across Saudi Arabia and the GCC to automate transactional and promotional messaging directly linked to Salla store events (live order creation, abandoned carts, shipping and fulfillment status updates).',
    problem: 'Salla store merchants lose sales when customers wait for responses. Teams spend hours manually updating buyers, recovering abandoned carts, and handling repetitive order inquiries.',
    role: 'Full-Stack Developer — Built the Salla OAuth app integration, product sync, live order creation within chat, webhook event engine, and merchant dashboard.',
    stack: ['Laravel', 'PHP', 'Next.js', 'React', 'TypeScript', 'Salla API & Webhooks', 'MySQL', 'Node.js'],
    credibility: 'Built specifically for Salla merchants with product sync and live order operations inside chat.',
    result: 'Automated routine order status updates and abandoned cart recovery with idempotent webhook processing and real-time Salla sync.',
    resultNumber: 'Real-time Salla sync, live order creation & automated replies',
    liveLink: 'https://nazbiz.io',
    gitFrontendLink: null,
    gitBackendLink: null,
    features: [
      'Seamless Salla OAuth authorization and instant store onboarding',
      'Live order creation, product sync, and shipping status tracking directly inside customer chats',
      'Real-time idempotent webhook processing for order, payment, and cart lifecycle events',
      'Customizable Arabic and English message templates with dynamic order variables',
      'Automated bot sequences, marketing campaigns, and human agent handoff'
    ]
  },
  {
    id: 3,
    slug: 'etkalem-arabi',
    name: 'Etkalem Arabi — Arabic Language Learning App',
    category: 'Mobile App',
    badge: 'Live on Play Store · 50K+ Downloads',
    image: '/etkalm-arabi.webp',
    screenshots: [
      { src: '/etkalm-arabi.webp', title: 'Interactive Learning Interface' }
    ],
    smallDescription: 'Children\'s Arabic-learning app featuring Arabic letters, 500+ vocabulary words, stories, and games.',
    overview: 'Etkalem Arabi is a production Flutter app designed to teach Arabic to Egyptian children living abroad. The app blends interactive exercises, animated stories, and songs to build reading, writing, listening, and speaking skills.',
    problem: 'Second and third-generation Egyptian and Arab children living abroad often lose touch with their native language due to the absence of engaging, culturally resonant, interactive learning tools designed specifically for their age group.',
    role: 'Full-Stack & Mobile Developer (Flutter & Laravel) — Implemented the Flutter mobile application, learning activity engine, RTL gamification screens, and API endpoints.',
    stack: ['Flutter', 'Dart', 'Laravel', 'Firebase', 'REST API', 'Android', 'iOS'],
    credibility: 'Over 50,000 downloads across Google Play and the App Store.',
    result: 'Over 50,000+ downloads across Google Play and the Apple App Store, actively used in multiple diaspora countries.',
    resultNumber: '50K+ Downloads',
    liveLink: 'https://play.google.com/store/apps/details?id=com.nahdetmisr.flutter_ems',
    gitFrontendLink: null,
    gitBackendLink: null,
    features: [
      'Interactive letter, word & sentence learning across 3 progressive stages',
      '500+ commonly used Arabic words with native pronunciation',
      'Animated cultural stories & educational songs with interactive worksheets',
      'Gamified learning journey with stickers, rewards, and progress maps',
      'Multi-child profile support with individual learning paths',
      'Fully Arabic RTL interface optimized for tablets and mobile devices'
    ]
  },
  {
    id: 4,
    slug: 'nilelangu',
    name: 'NileLangu — Egyptian Languages Learning App',
    category: 'Mobile App',
    badge: 'Live on Play Store · 4.3★ Rating',
    image: '/nilelangu.webp',
    screenshots: [
      { src: '/nilelangu.webp', title: 'NileLangu Learning Dashboard' }
    ],
    smallDescription: 'Language-learning app for Egyptian Arabic, Bohairic Coptic, and Middle Egyptian/hieroglyphs, with structured lessons, vocabulary, and audio.',
    overview: 'NileLangu is a comprehensive language-learning Flutter app covering all three historical Egyptian language branches: Modern Egyptian Arabic for daily conversations, Bohairic Coptic for heritage and liturgy, and Middle Egyptian Hieroglyphs for ancient culture and inscriptions.',
    problem: 'Learners, Egyptologists, and cultural researchers had no unified, modern mobile platform to study Egyptian languages systematically with audio pronunciation and interactive drills.',
    role: 'Full-Stack Mobile Engineer — Designed the mobile UX, lesson hierarchy engine, custom Hieroglyph rendering components, audio playback system, and offline lesson caching.',
    stack: ['Flutter', 'Dart', 'Node.js', 'Firebase', 'In-App Purchases'],
    credibility: 'Rated 4.3 stars on Google Play.',
    result: 'Maintains a 4.3-star rating on Google Play with 5,000+ active downloads worldwide.',
    resultNumber: '4.3★ rating & 5,000+ downloads',
    liveLink: 'https://play.google.com/store/apps/details?id=com.elkammah.nilelangu',
    gitFrontendLink: null,
    gitBackendLink: null,
    features: [
      '29 Egyptian Arabic structured lessons with daily dialogues and 700+ recorded words',
      '18 Bohairic Coptic lessons with liturgy and vocabulary exercises',
      '11 Middle Egyptian Hieroglyph lessons with sign-by-sign breakdowns',
      'Gamified audio quizzes and interactive recall testing',
      'One-time purchase model per language — zero recurring subscriptions',
      'Privacy-first architecture with zero third-party data tracking'
    ]
  },
  {
    id: 5,
    slug: 'reliant',
    name: 'Reliant — Security Operations Platform',
    category: 'Enterprise Platform',
    badge: 'Live · reliant.sa',
    image: '/reliant.png',
    screenshots: [
      { src: '/reliant.png', title: 'Reliant Enterprise Platform' }
    ],
    smallDescription: 'Saudi enterprise platform focused on bug-bounty and penetration-testing management.',
    overview: 'Reliant (reliant.sa) is a specialized Security Operations Platform engineered for Saudi enterprise clients. It unifies the governance of bug bounty programs, scoped penetration testing engagements, vulnerability disclosure lifecycles, and security researcher payouts into one portal.',
    problem: 'Organizations managing security research programs suffer from chaotic email threads, unorganized vulnerability reports, lack of SLA enforcement.',
    role: 'Full-Stack Developer — Developed responsive Next.js frontends, Laravel API endpoints, role-based access control, vulnerability severity workflows, and audit reporting modules.',
    stack: ['Next.js', 'Laravel', 'React', 'PHP', 'MySQL', 'REST API'],
    credibility: 'Saudi enterprise security operations platform.',
    result: 'Centralized bug bounty and penetration testing management for enterprise security teams across Saudi Arabia.',
    resultNumber: 'Enterprise-grade vulnerability tracking & audit-ready reporting',
    liveLink: 'https://reliant.sa',
    gitFrontendLink: null,
    gitBackendLink: null,
    features: [
      'Bug bounty program setup, researcher invitations, and reward approvals',
      'Scoped penetration testing engagement tracker with milestone verification',
      'Standardized vulnerability disclosure pipeline with CVSS severity scoring',
      'Granular role-based access for enterprises, security auditors, and researchers',
      'Detailed audit trails for security activity',
      'Real-time activity analytics and security posture dashboards'
    ]
  },
  {
    id: 6,
    slug: 'qartaji',
    name: 'Qartaji — B2B Procurement Platform',
    category: 'Enterprise Platform',
    badge: 'Enterprise Platform',
    image: '/qartaji.png',
    screenshots: [
      { src: '/qartaji.png', title: 'Qartaji Procurement System' },
      { src: '/qartjiPNG.PNG', title: 'Supplier Quotation Management' }
    ],
    smallDescription: 'B2B procurement platform connecting businesses with suppliers through RFQ and multi-stage approval flows.',
    overview: 'Qartaji is a full-featured B2B procurement platform bridging corporate buyers and vetted commercial suppliers. It manages the entire procurement journey: requisition creation, RFQ issuance, multi-supplier quote comparison, multi-tier corporate approvals, and purchase order tracking.',
    problem: 'Manual procurement via spreadsheets and paper quotes leads to slow turnaround, lack of price transparency, approval bottlenecks, and untracked supplier performance.',
    role: 'Full-Stack Engineer — Designed database schema, built RFQ matching logic, multi-stage approval state machine, and dedicated portals for buyers and suppliers.',
    stack: ['Next.js', 'Laravel', 'PHP', 'MySQL', 'REST API', 'JWT Auth'],
    credibility: 'Implemented multi-tenant quotation comparison engine for commercial procurement.',
    result: 'Streamlined corporate purchasing with multi-stage approval pipelines and structured RFQ bidding.',
    resultNumber: 'Multi-stage approval flows with comparative price analysis',
    liveLink: null,
    gitFrontendLink: null,
    gitBackendLink: null,
    features: [
      'RFQ creation with granular line items and specification attachments',
      'Side-by-side supplier quote comparison matrix with cost breakdown',
      'Configurable multi-tier internal approval workflows based on budget thresholds',
      'Dedicated role portals for Buyers, Suppliers, and Operations Managers',
      'Real-time in-app notifications on status changes and bids',
      'JWT authenticated secure endpoints with audit logs'
    ]
  },
  {
    id: 7,
    slug: 'samh',
    name: 'SAMH — Vehicle Inspection & Operations System',
    category: 'Full-Stack System',
    badge: 'Operations Platform',
    image: '/samh.png',
    screenshots: [
      { src: '/samh.png', title: 'SAMH Vehicle Dashboard' },
      { src: '/samh%20(2).png', title: 'Inspection Flow & Checklist' }
    ],
    smallDescription: 'Vehicle operations platform with vehicle listings, multi-stage inspection checklists, real-time vehicle status, and PDF reports.',
    overview: 'SAMH is an automotive operations management system designed to coordinate vehicle listings, multi-stage digital inspections, defect cataloging, automated PDF inspection report generation, and administrative status tracking.',
    problem: 'Automotive dealerships and fleet operators frequently deal with inconsistent pen-and-paper vehicle inspections, lost condition logs, and slow customer report deliveries.',
    role: 'Full-Stack Developer — Developed the inspection checklist interface, backend state transitions, automated PDF rendering engine, and admin vehicle management control center.',
    stack: ['React', 'Laravel', 'PHP', 'MySQL', 'PDF Generation', 'REST API'],
    credibility: 'Deployed for commercial automotive inspection workflows with instant PDF report delivery.',
    result: 'Accelerated vehicle turnaround by digitizing multi-stage checklist inspections and generating instant client-ready PDF reports.',
    resultNumber: 'Multi-stage inspection checklists with automated PDF report generation',
    liveLink: null,
    gitFrontendLink: null,
    gitBackendLink: null,
    features: [
      'Comprehensive multi-step vehicle inspection checklists with photo attachments',
      'Automated high-resolution PDF inspection report generation',
      'Real-time vehicle status tracking across intake, inspection, and lot placement',
      'Role-based permissions for field inspectors, service managers, and admins',
      'Inventory management with search and multi-attribute filters',
      'Detailed audit logs for every condition alteration'
    ]
  },
  {
    id: 8,
    slug: 'dalala',
    name: 'Dalala — Saudi Classifieds Marketplace',
    category: 'Mobile App',
    badge: 'Live on Google Play · Saudi Arabia',
    image: '/dalala.webp',
    screenshots: [
      { src: '/dalala.webp', title: 'Dalala Marketplace App' }
    ],
    smallDescription: 'Saudi classified marketplace enabling category- and location-based listings and direct communication between buyers and sellers.',
    overview: 'Dalala is a production Flutter mobile classifieds application built for the Saudi Arabian market. Users can publish ads, browse listings across Saudi regions, filter by city and category, and communicate in real time.',
    problem: 'Local buyers and sellers in Saudi Arabia needed a lightweight, secure Arabic-first marketplace app tailored to regional categories and direct communication without intermediary friction.',
    role: 'Mobile & Backend Developer — Built the Flutter client, Arabic RTL user flows, location filtering, chat interface, and Laravel backend APIs.',
    stack: ['Flutter', 'Laravel', 'MySQL', 'REST API', 'Dart'],
    credibility: 'Published and live on Google Play in Saudi Arabia.',
    result: 'Live on Google Play serving active buyers and sellers across Saudi cities.',
    resultNumber: 'Live on Google Play across Saudi Arabian regions',
    liveLink: 'https://play.google.com/store/apps/details?id=com.dalala.customer',
    gitFrontendLink: null,
    gitBackendLink: null,
    features: [
      'Geolocation-based listing discovery filtered by Saudi cities and provinces',
      'In-app direct messaging between buyers and sellers',
      'Streamlined Arabic ad publishing process with photo upload',
      'Full Arabic RTL layout optimized for Saudi users',
      'Secure authentication and verified phone numbers',
      'Categorized search with price, condition, and location filters'
    ]
  },
  {
    id: 9,
    slug: 'hr-payroll-erp',
    name: 'Enterprise HR & Payroll ERP',
    category: 'Enterprise System',
    badge: 'Enterprise ERP',
    image: '/hr-system.png',
    screenshots: [
      { src: '/hr-system.png', title: 'HR System Dashboard' }
    ],
    smallDescription: 'PHP HR and payroll ERP covering payroll processing, leave management, fingerprint-device integration, and 30+ exportable reports.',
    overview: 'A complete enterprise HRMS and payroll solution engineered to automate human resource operations. It features automated payroll calculation, attendance sync with biometric fingerprint devices, leave request workflows, employee self-service portals, and 30+ exportable financial and compliance reports.',
    problem: 'Companies with distributed offices faced errors in manual attendance logging, payroll discrepancies, slow leave approvals, and lack of statutory labor reporting.',
    role: 'Full-Stack Developer — Built the payroll calculation engine, biometric device integration, employee self-service portal, and tabular reporting modules.',
    stack: ['PHP', 'Laravel', 'React', 'MySQL', 'Biometric Device API', 'REST API'],
    credibility: 'Processed enterprise payroll workflows with 30+ custom exportable reports.',
    result: 'Reduced monthly payroll processing time and automated employee attendance tracking across company branches.',
    resultNumber: '30+ exportable reports & biometric hardware integration',
    liveLink: null,
    gitFrontendLink: null,
    gitBackendLink: null,
    features: [
      'Automated payroll computation with tax, deductions, and bonus formulas',
      'Biometric fingerprint device integration for attendance synchronization',
      'Self-service employee portal for leave requests, pay slips, and document uploads',
      'Multi-department and multi-branch organizational hierarchy management',
      '30+ exportable Excel and PDF reports for accounting and compliance',
      'Granular role-based access control with comprehensive audit logs'
    ]
  },
  {
    id: 10,
    slug: 'yaman',
    name: 'Yaman — Orders, Shipping & Tracking Platform',
    category: 'Operations Platform',
    badge: 'Logistics System',
    image: '/yaman.png',
    screenshots: [
      { src: '/yaman.png', title: 'Yaman Logistics & Order Tracker' }
    ],
    smallDescription: 'Full order and logistics management — from basket creation to delivery confirmation and analytics.',
    overview: 'Yaman is an end-to-end order fulfillment and courier tracking platform. It guides orders through the complete operational pipeline: customer basket creation, carrier assignment, barcode scanning, status updates, and digital proof-of-delivery confirmation.',
    problem: 'E-commerce logistics operations suffered from delayed dispatching, lack of courier status visibility, and manual paper-based delivery verifications.',
    role: 'Full-Stack Developer — Engineered order lifecycle state machine, courier assignment rules, driver status endpoints, and fulfillment dashboard.',
    stack: ['Laravel', 'React', 'PHP', 'MySQL', 'REST API'],
    credibility: 'Full lifecycle order and dispatch system with real-time fulfillment metrics.',
    result: 'Automated dispatch tracking and gave operations teams real-time visibility into order transit and delivery confirmations.',
    resultNumber: 'End-to-end dispatch and delivery fulfillment pipeline',
    liveLink: null,
    gitFrontendLink: null,
    gitBackendLink: null,
    features: [
      'Order creation, batching, and shipping label assignment',
      'Real-time courier transit tracking with status checkpoints',
      'Digital proof of delivery with recipient sign-off',
      'Operations dashboard with fulfillment velocity metrics',
      'Role-based views for dispatchers, carriers, and administrators',
      'REST APIs connecting merchant storefronts to fulfillment hubs'
    ]
  },
  {
    id: 11,
    slug: 'meedapay',
    name: 'MeedaPay — Bilingual Payment Gateway',
    category: 'Fintech Platform',
    badge: 'Fintech System',
    image: '/MeedaPayPNG.PNG',
    screenshots: [
      { src: '/MeedaPayPNG.PNG', title: 'MeedaPay Bilingual Checkout' }
    ],
    smallDescription: 'Production-ready Arabic/English payment processing platform with full RTL support.',
    overview: 'MeedaPay is a bilingual payment gateway integration platform offering Arabic and English checkout experiences, merchant transaction reconciliation, and secure communication with upstream financial providers.',
    problem: 'Merchants needed an intuitive checkout flow that effortlessly switches between Arabic RTL and English LTR while keeping card capture responsive.',
    role: 'Full-Stack Engineer — Implemented bilingual UI, secure payment API handlers, webhook status verification, and merchant payment logs.',
    stack: ['React', 'Node.js', 'REST API', 'MySQL', 'Payment Gateways'],
    credibility: 'Bilingual payment gateway infrastructure with complete RTL and LTR support.',
    result: 'Delivered a seamless Arabic/English checkout experience with automated transaction verification.',
    resultNumber: 'Bilingual Arabic/English RTL payment processing',
    liveLink: null,
    gitFrontendLink: null,
    gitBackendLink: null,
    features: [
      'Bilingual Arabic/English checkout with responsive RTL/LTR adaptation',
      'Payment provider API integration with automated webhook handling',
      'Merchant management dashboard for transactions and refund requests',
      'Instant transaction notification triggers',
      'High-security tokenization and payload validation'
    ]
  },
  {
    id: 12,
    slug: 'social-media-platform',
    name: 'Full-Stack Social Media Application',
    category: 'Full-Stack App',
    badge: 'Open Source',
    image: '/Social_Media_App_Picture.png',
    screenshots: [
      { src: '/Social_Media_App_Picture.png', title: 'Social Platform Feed & Posts' }
    ],
    smallDescription: 'Full-stack social platform with authentication, feeds, posts, comments & profile management.',
    overview: 'A complete full-stack social networking application featuring secure user authentication, media posts, personalized feed generation, comment threads, and user profile management.',
    problem: 'Designed and built to showcase clean full-stack decoupled architecture between a modern React single-page frontend and a robust Laravel REST API backend.',
    role: 'Full-Stack Developer — Built both the React frontend client and the Laravel backend REST API.',
    stack: ['React', 'Laravel', 'PHP', 'MySQL', 'REST API'],
    credibility: 'Open source frontend and backend repositories on GitHub.',
    result: 'Complete decoupled social platform with clean REST API architecture and responsive UI.',
    resultNumber: 'Full-stack decoupled architecture with public GitHub repositories',
    liveLink: null,
    gitFrontendLink: 'https://github.com/mazen41/social-media-app.git',
    gitBackendLink: 'https://github.com/mazen41/social-media-app-api.git',
    features: [
      'User registration, login, and token-based session security',
      'Post creation supporting rich text and image uploads',
      'Personalized news feed with chronological ordering',
      'Comment threads and real-time interaction feedback',
      'Profile customization with bio and user post archives',
      'Separate modular repositories for frontend and backend'
    ]
  }
];

export const getProjectBySlug = (slug) => {
  return projectsData.find((p) => p.slug === slug);
};
