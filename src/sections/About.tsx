import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        const words = textRef.current.querySelectorAll('.about-word');
        gsap.from(words, {
          opacity: 0.3,
          stagger: 0.02,
          ease: 'none',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 0.5,
          },
        });
      }

      if (imgRef.current) {
        gsap.from(imgRef.current, {
          x: 60,
          rotate: 2,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });
      }

      if (statsRef.current) {
        const chips = statsRef.current.querySelectorAll('.stat-chip');
        gsap.from(chips, {
          scale: 0.8,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const aboutText = `Neonest is a recognized brand in smart home automation with a strong international presence in Beijing, China, and the UAE. Brought to India by Technometics, a trusted IT services provider with decades of expertise, Neonest delivers cutting-edge features such as AI self-learning capabilities, wired and wireless automation, and reliable, scalable, secure solutions. Whether it's transforming your home into an intelligent living space or ensuring seamless control and security, Neonest delivers innovation at every step.`;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding bg-[#16161A]"
    >
      <div className="container-main">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Left: Text */}
          <div className="lg:w-[55%]" ref={textRef}>
            <span className="label-style text-[#00E6C8] mb-4 block">ABOUT NEONEST</span>
            <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-8">
              Redefining the Future of Living Spaces
            </h2>
            <p className="text-base text-white/65 leading-relaxed mb-10">
              {aboutText.split(' ').map((word, i) => (
                <span key={i} className="about-word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
            </p>

            <div ref={statsRef} className="flex flex-wrap gap-4">
              {[
                { label: '10K+ Homes Automated', color: '#00E6C8' },
                { label: '24/7 Security', color: '#00D26A' },
                { label: '3 Countries', color: '#00A8E8' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="stat-chip flex items-center gap-3 bg-[#1E1E24] rounded-xl px-5 py-4"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: stat.color }}
                  />
                  <span className="text-sm text-white/80 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div ref={imgRef} className="lg:w-[45%] w-full">
            <div className="rounded-[20px] overflow-hidden shadow-card">
              <img
                src="/about-person-smart-home.jpg"
                alt="Smart home lifestyle"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
