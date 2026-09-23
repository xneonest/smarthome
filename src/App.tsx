import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Menu, X, Instagram, Linkedin, Youtube, Phone, Mail, MapPin, Globe } from 'lucide-react';
import NeonestLogo from './components/Logo';
import ParticleCanvas from './components/ParticleCanvas';
import Hero from './sections/Hero';
import About from './sections/About';
import Features from './sections/Features';
import SmartModes from './sections/SmartModes';
import SmartLocks from './sections/SmartLocks';
import TouchPanels from './sections/TouchPanels';
import TouchSwitches from './sections/TouchSwitches';
import Protocols from './sections/Protocols';
import NextGen from './sections/NextGen';
import Lifestyle from './sections/Lifestyle';
import ClosingCTA from './sections/ClosingCTA';
import Partners from './sections/Partners' ;
import DemoVideo from './sections/Demovideo';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Features', href: '#features' },
  { label: 'Lifestyle', href: '#lifestyle' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => {
      setScrolled(window.scrollY > 100);
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el as HTMLElement, { offset: -80 });
    }
  };

  return (
    <div className="relative bg-[#0D0D0F] min-h-screen">
      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 h-[2px] z-[100] gradient-bg"
        style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled ? 'glass border-b border-white/[0.08]' : 'bg-transparent'
        }`}
      >
        <div className="container-main flex items-center justify-between w-full">
          {/* Logo */}
          <a href="#home" onClick={() => scrollTo('#home')} className="flex items-center gap-2.5">
            <NeonestLogo size={28} />
            <span className="text-lg font-semibold text-white tracking-[-0.01em]">NEONEST</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollTo('#contact')}
              className="gradient-bg text-[#0D0D0F] font-semibold text-sm px-6 py-2.5 rounded-full hover:brightness-110 hover:scale-[1.03] transition-all duration-300"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="absolute top-[72px] left-0 right-0 glass border-b border-white/[0.08] md:hidden">
            <div className="container-main py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-base font-medium text-white/80 hover:text-white py-2 text-left"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo('#contact')}
                className="gradient-bg text-[#0D0D0F] font-semibold text-sm px-6 py-3 rounded-full mt-2"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        <Hero />
        <Partners />
        <DemoVideo />
        <About />
        <Features />
        <SmartModes />
        <SmartLocks />
        <TouchPanels />
        <TouchSwitches />
        <Protocols />
        <NextGen />

        {/* Particle effect behind lifestyle section */}
        <div className="relative">
          <ParticleCanvas />
          <div className="relative z-[2]">
            <Lifestyle />
          </div>
        </div>

        <ClosingCTA />
      </main>

      {/* Footer */}
      <footer className="bg-[#0D0D0F] border-t border-white/[0.08] pt-16 pb-8">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <NeonestLogo size={24} />
                <span className="text-lg font-semibold text-white">NEONEST</span>
              </div>
              <p className="text-sm text-white/50 mb-6 leading-relaxed">
                Where technology meets lifestyle. Your home, your way.
              </p>
              <div className="flex gap-3">

  {[
    {
      icon: Instagram,
      link: 'https://www.instagram.com/technometics',
    },
    {
      icon: Linkedin,
      link: 'https://in.linkedin.com/company/technometics',
    },
    {
      icon: Youtube,
      link: 'https://www.youtube.com/@technometics03',
    },
  ].map((item, i) => {
    const Icon = item.icon

    return (
      <a
        key={i}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-[#00E6C8] hover:bg-white/10 transition-all duration-200"
      >
        <Icon size={16} />
      </a>
    )
  })}

</div>
            </div>

            {/* Services (crawlable links to service pages) */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'Home Automation Mumbai', href: '/smart-home-automation-mumbai/' },
                  { label: 'Home Automation Navi Mumbai', href: '/home-automation-navi-mumbai/' },
                  { label: 'Home Automation Thane', href: '/home-automation-thane/' },
                  { label: 'Smart Door Locks', href: '/smart-door-locks-mumbai/' },
                  { label: 'Smart Switches & Touch Panels', href: '/smart-switches-touch-panels/' },
                  { label: 'Retrofit Automation (No Rewiring)', href: '/retrofit-home-automation/' },
                ].map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-sm text-white/50 hover:text-white/80 transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2.5">
                {['About Us', 'Features', 'Lifestyle', 'Contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollTo(item === 'About Us' ? '#about' : item === 'Features' ? '#features' : item === 'Lifestyle' ? '#lifestyle' : '#contact')}
                      className="text-sm text-white/50 hover:text-white/80 transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2.5 text-sm text-white/50">
                  <Phone size={14} className="text-[#00E6C8] shrink-0" />
                  <a href="tel:+919422481711" className="hover:text-white/80">+91 94224 81711</a>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-white/50">
                  <Mail size={14} className="text-[#00E6C8] shrink-0" />
                  <a href="mailto:info@neonestx.com" className="hover:text-white/80">info@neonestx.com</a>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-white/50">
                  <Globe size={14} className="text-[#00E6C8] shrink-0" />
                  www.neonestx.com
                </li>
                <li className="flex items-start gap-2.5 text-sm text-white/50">
                  <MapPin size={14} className="text-[#00E6C8] shrink-0 mt-0.5" />
                  Neonest, Mumbai · Serving Mumbai, Navi Mumbai &amp; Thane
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/[0.08] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Neonest. Powered by Technometics. All rights reserved.
            </p>
            <p className="text-xs text-white/30">
              Designed with precision. Built for the future.
            </p>
          </div>
        </div>
      </footer>
      {/* Floating WhatsApp + Call buttons */}
      <div className="fixed bottom-5 right-5 z-[90] flex flex-col gap-3">
        <a
          href="https://wa.me/919422481711?text=Hi%20Neonest%2C%20I%27m%20interested%20in%20smart%20home%20automation."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Neonest on WhatsApp"
          onClick={() => (window as any).gtag?.('event', 'whatsapp_click')}
          className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 1 1 7.97 4.41zm8-17.42A11.3 11.3 0 0 0 12.04.75C5.8.75.72 5.83.72 12.07c0 2 .52 3.95 1.52 5.66L.62 23.25l5.65-1.48a11.3 11.3 0 0 0 5.77 1.47c6.24 0 11.32-5.08 11.32-11.32 0-3.02-1.18-5.87-3.32-8z"/></svg>
        </a>
        <a
          href="tel:+919422481711"
          aria-label="Call Neonest"
          onClick={() => (window as any).gtag?.('event', 'phone_click')}
          className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center shadow-lg hover:scale-105 transition-transform text-[#0D0D0F]"
        >
          <Phone size={24} />
        </a>
      </div>
    </div>
  );
}
