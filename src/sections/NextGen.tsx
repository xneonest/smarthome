import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Sliders, LockKeyhole } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: TrendingUp,
    title: 'Scalable Solutions',
    desc: 'Start with a Basic package and upgrade to Elite or Premium as your needs grow. Modular by design.',
  },
  {
    icon: Sliders,
    title: 'Customization',
    desc: 'Tailor your smart home system to suit your lifestyle and preferences. Every room, every routine, uniquely yours.',
  },
  {
    icon: LockKeyhole,
    title: 'Reliability & Security',
    desc: 'Industry-leading technology with robust security features. Your data and your home, protected.',
  },
];

export default function NextGen() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.value-card');
        gsap.fromTo(
  cards,
  {
    y: 60,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: cardsRef.current,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-[#0D0D0F]">
      <div className="container-main">
        <div className="text-center mb-16">
          <span className="label-style text-[#00E6C8] mb-4 block">THE NEXT GENERATION</span>
          <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
            Built for the Future.<br className="hidden md:block" /> Designed for You.
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="value-card group bg-[#16161A] rounded-[20px] p-10 border border-white/[0.08] hover:border-[#00E6C8]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-full bg-[#1E1E24] flex items-center justify-center mb-6 animate-pulse-glow">
                  <Icon size={24} className="text-[#00E6C8]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{v.title}</h3>
                <p className="text-base text-white/65 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
