import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import {
  ArrowDown,
  FilmSlate,
  Sparkle,
  Palette,
  Eye,
  Quotes,
  InstagramLogo,
  YoutubeLogo,
  TwitterLogo,
  FacebookLogo,
  TiktokLogo,
  EnvelopeSimple,
  MapPin,
  Phone,
  DownloadSimple,
  Play,
} from '@phosphor-icons/react';
import ProjectModal from './components/ProjectModal';
import { projects, services, skills, testimonials, socialLinks, PERSONAL_INFO } from './data/portfolioData';
import type { PortfolioProject } from './types';

/* ─── Stagger Variant ─── */
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ─── Service Icon map ─── */
const serviceIcons: Record<string, React.ReactNode> = {
  Film: <FilmSlate size={28} weight="fill" />,
  Sparkles: <Sparkle size={28} weight="fill" />,
  Palette: <Palette size={28} weight="fill" />,
  Eye: <Eye size={28} weight="fill" />,
};

/* ─── Social Icon map ─── */
const socialIconMap: Record<string, React.ReactNode> = {
  InstagramLogo: <InstagramLogo size={22} weight="fill" />,
  YoutubeLogo: <YoutubeLogo size={22} weight="fill" />,
  TwitterLogo: <TwitterLogo size={22} weight="fill" />,
  FacebookLogo: <FacebookLogo size={22} weight="fill" />,
  TikTokLogo: <TiktokLogo size={22} weight="fill" />,
};

/* ─── Category tabs ─── */
const CATEGORIES = [
  { key: 'all', label: 'All Work' },
  { key: 'video', label: 'Video' },
  { key: 'graphic', label: 'Graphic' },
] as const;

/* ─── Section Wrapper ─── */
function Section({ id, className = '', children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`relative px-4 py-24 md:px-8 md:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

/* ─── Section Heading ─── */
function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <motion.div
      className="mb-16 text-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
    >
      <motion.span
        variants={fadeIn}
        className="mb-3 inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400"
      >
        {label}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="text-3xl font-bold text-white md:text-5xl"
      >
        {title}
      </motion.h2>
      <motion.div
        variants={fadeIn}
        className="mx-auto mt-4 h-0.5 w-16 rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
      />
    </motion.div>
  );
}

/* ─── Skill Bar ─── */
function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-300">{name}</span>
        <span className="text-xs text-zinc-500">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 + index * 0.06, ease: [0.16, 1, 0.3, 1] as const }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ project, index, onClick }: { project: PortfolioProject; index: number; onClick: () => void }) {
  const isVideo = !!project.mediaUrl;

  // YouTube thumbnails sometimes serve a black 120x90 default — use hqdefault as fallback
  const [imgSrc, setImgSrc] = useState(project.thumbnail);
  const handleImgError = () => {
    // If maxresdefault fails, fall back to hqdefault
    if (imgSrc.includes('maxresdefault')) {
      setImgSrc(imgSrc.replace('maxresdefault', 'hqdefault'));
    }
  };

  return (
    <motion.button
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/5 bg-zinc-900 text-left transition-colors hover:border-amber-500/30"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {/* Thumbnail — fixed height so every card image area is identical */}
      <div className="relative h-52 w-full shrink-0 overflow-hidden bg-zinc-800">
        <img
          src={imgSrc}
          alt={project.title}
          onError={handleImgError}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
        />

        {/* Hover overlay — scrim + play button, scoped only to the image area */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 shadow-xl shadow-amber-500/40 transition-transform duration-300 group-hover:scale-110">
            <Play size={22} weight="fill" className="translate-x-0.5 text-black" />
          </span>
        </div>

        {/* Badges — top-right of image */}
        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
          {project.featured && (
            <span className="rounded-full bg-black/70 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 ring-1 ring-amber-500/30 backdrop-blur-sm">
              Featured
            </span>
          )}
          {isVideo && (
            <span className="flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/80 ring-1 ring-white/10 backdrop-blur-sm">
              <Play size={8} weight="fill" />
              Video
            </span>
          )}
        </div>
      </div>

      {/* Info strip — fixed height, always below the image */}
      <div className="flex h-16 flex-col justify-center border-t border-white/5 px-4">
        <span className="mb-0.5 inline-block w-fit rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-400">
          {project.category}
        </span>
        <h3 className="truncate text-sm font-bold text-white">{project.title}</h3>
      </div>
    </motion.button>
  );
}

/* ─── Testimonial Card ─── */
function TestimonialCard({ quote, author, role, index }: { quote: string; author: string; role: string; index: number }) {
  return (
    <motion.div
      className="relative rounded-2xl border border-white/5 bg-gradient-to-b from-zinc-900/60 to-zinc-950/60 p-8 backdrop-blur-sm"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <Quotes size={32} className="mb-4 text-amber-500/30" weight="fill" />
      <p className="mb-6 text-base leading-relaxed text-zinc-300 italic">&ldquo;{quote}&rdquo;</p>
      <div>
        <p className="text-sm font-semibold text-white">{author}</p>
        <p className="text-xs text-zinc-500">{role}</p>
      </div>
    </motion.div>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [navBlur, setNavBlur] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setNavBlur(latest > 100);
  });

  const heroScale = useTransform(scrollY, [0, 500], [1, 1.08]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const filtered = activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory);

  /* Scroll spy */
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'services', 'portfolio', 'testimonials', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* Mobile nav toggle */
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  }, []);

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-amber-500/30 selection:text-amber-200">
      {/* ─── Navbar ─── */}
      <motion.header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          navBlur ? 'border-b border-white/5 bg-black/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
          <button
            onClick={() => scrollTo('hero')}
            className="text-lg font-bold tracking-tight text-white"
          >
            Barony<span className="text-amber-500">.</span>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`relative text-sm font-medium transition-colors ${
                    activeSection === item.id ? 'text-amber-400' : 'text-zinc-400 hover:text-amber-400'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-amber-500"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-5 bg-white origin-center transition-all duration-300 ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-white origin-center transition-all duration-300 ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </nav>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="border-t border-white/5 bg-black/95 backdrop-blur-xl md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <ul className="space-y-1 px-4 py-4">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="block w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-zinc-300 transition-colors hover:bg-amber-500/10 hover:text-amber-400"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ─── HERO ─── */}
      <section id="hero" ref={heroRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Pure dark background — no image */}
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <div className="absolute inset-0 bg-black" />
          {/* Subtle radial amber glow from centre */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, oklch(0.4 0.1 65 / 0.18) 0%, transparent 70%)' }} />
          {/* Grain overlay */}
          <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNmKSIgb3BhY2l0eT0iLjUiIC8+PC9zdmc+')] bg-repeat" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 mx-auto max-w-4xl px-4 text-center"
          style={{ opacity: heroOpacity }}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={fadeIn}
            className="mb-6 inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400"
          >
            Content Creator &amp; Designer
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="text-5xl font-black leading-[1.1] tracking-tight md:text-7xl lg:text-8xl"
          >
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
              Barony
            </span>
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl"
          >
            Cinematic storytelling through motion &amp; design. I craft visual narratives that captivate, inspire, and leave a lasting impression.
          </motion.p>
          <motion.div variants={fadeIn} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollTo('portfolio')}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-600 to-amber-500 px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30"
            >
              <span className="relative z-10">View Portfolio</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-amber-500 to-amber-300 transition-transform duration-500 group-hover:translate-x-0" />
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="rounded-full border border-white/10 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-400"
            >
              Get in Touch
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={() => scrollTo('about')}
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <ArrowDown size={24} className="text-amber-400/70" />
        </motion.button>
      </section>

      {/* ─── ABOUT ─── */}
      <Section id="about">
        <SectionHeading label="About" title="Who I Am" />
        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            {/* Avatar */}
            <motion.div variants={fadeIn} className="flex items-center gap-5">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-amber-500/30 shadow-xl shadow-amber-500/10">
                <img src={PERSONAL_INFO.avatar} alt={PERSONAL_INFO.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{PERSONAL_INFO.name}</p>
                <p className="text-sm text-amber-400">{PERSONAL_INFO.title}</p>
              </div>
            </motion.div>
            <motion.p variants={fadeIn} className="text-lg leading-relaxed text-zinc-300">
              {PERSONAL_INFO.bio}
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-wrap gap-3">
              <span className="flex items-center gap-2 rounded-full bg-zinc-900/80 px-4 py-2 text-sm text-zinc-400">
                <MapPin size={16} className="text-amber-500" weight="fill" />
                {PERSONAL_INFO.location}
              </span>
              <span className="flex items-center gap-2 rounded-full bg-zinc-900/80 px-4 py-2 text-sm text-zinc-400">
                <EnvelopeSimple size={16} className="text-amber-500" weight="fill" />
                {PERSONAL_INFO.email}
              </span>
            </motion.div>
            <motion.div variants={fadeIn}>
              <a
                href={PERSONAL_INFO.resumeUrl}
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-6 py-3 text-sm font-semibold text-amber-400 transition-all hover:bg-amber-500/20 hover:shadow-lg hover:shadow-amber-500/20"
              >
                <DownloadSimple size={18} weight="bold" />
                Download Resume
              </a>
            </motion.div>
          </motion.div>

          {/* Skills */}
          <div className="space-y-4">
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ─── SERVICES ─── */}
      <Section id="services" className="bg-gradient-to-b from-transparent via-zinc-950/50 to-transparent">
        <SectionHeading label="Services" title="What I Do" />
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-zinc-900/60 to-zinc-950/60 p-6 backdrop-blur-sm transition-all duration-500 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 transition-all duration-500 group-hover:bg-amber-500/20 group-hover:scale-110">
                {serviceIcons[service.icon] || <Sparkle size={28} weight="fill" />}
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{service.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{service.description}</p>
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-500/5 opacity-0 transition-all duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ─── PORTFOLIO ─── */}
      <Section id="portfolio">
        <SectionHeading label="Portfolio" title="Featured Work" />

        {/* Filter Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const count = cat.key === 'all' ? projects.length : projects.filter((p) => p.category === cat.key).length;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.key
                    ? 'bg-amber-500/20 text-amber-400 shadow-sm shadow-amber-500/10'
                    : 'bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-200'
                }`}
              >
                {cat.label}
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  activeCategory === cat.key ? 'bg-amber-500/30 text-amber-300' : 'bg-zinc-700/60 text-zinc-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                >
                  <ProjectCard
                    project={project}
                    index={i}
                    onClick={() => setSelectedProject(project)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.p
                className="col-span-full py-20 text-center text-zinc-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No projects in this category yet.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </Section>

      {/* ─── TESTIMONIALS ─── */}
      <Section id="testimonials" className="bg-gradient-to-b from-transparent via-zinc-950/50 to-transparent">
        <SectionHeading label="Testimonials" title="What Clients Say" />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} quote={t.quote} author={t.author} role={t.role} index={i} />
          ))}
        </div>
      </Section>

      {/* ─── CONTACT ─── */}
      <Section id="contact">
        <SectionHeading label="Contact" title="Let's Work Together" />
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeIn} className="mb-10 text-lg text-zinc-400">
            Have a project in mind? Let's create something remarkable together.
          </motion.p>

          {/* Contact Info */}
          <motion.div variants={fadeIn} className="mb-10 flex flex-wrap justify-center gap-6">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-3 rounded-full border border-white/5 bg-zinc-900/60 px-6 py-3 text-sm text-zinc-300 transition-all hover:border-amber-500/30 hover:text-amber-400"
            >
              <EnvelopeSimple size={18} className="text-amber-500" weight="fill" />
              {PERSONAL_INFO.email}
            </a>
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="flex items-center gap-3 rounded-full border border-white/5 bg-zinc-900/60 px-6 py-3 text-sm text-zinc-300 transition-all hover:border-amber-500/30 hover:text-amber-400"
            >
              <Phone size={18} className="text-amber-500" weight="fill" />
              {PERSONAL_INFO.phone}
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-zinc-900/60 text-zinc-400 transition-all duration-300 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-400 hover:shadow-lg hover:shadow-amber-500/20"
                title={link.platform}
              >
                {socialIconMap[link.icon] || <></>}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/5 px-4 py-8 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} Dauda Yakubu. All rights reserved.
          </p>
          <p className="text-sm text-zinc-700">
            Crafted with <span className="text-amber-500">passion</span> for the craft
          </p>
        </div>
      </footer>

      {/* ─── Project Modal ─── */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}