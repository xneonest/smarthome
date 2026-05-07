import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lifestyleItems = [
  {
    num: '01',
    title: 'Effortless Home Monitoring',
    desc: 'Keep an eye on kids, elderly family, and pets remotely. Smart biometric security ensures only authorized access.',
  },
  {
    num: '02',
    title: 'Energy-Efficient Living',
    desc: 'Smart lighting and cooling reduce unnecessary power consumption. Save on utility bills while reducing your carbon footprint.',
  },
  {
    num: '03',
    title: 'Advanced Security & Intruder Protection',
    desc: 'Real-time alerts when someone is at your door. Biometric access and remote monitoring keep your home secure, even when you\'re away.',
  },
  {
    num: '04',
    title: 'Ultimate Home Automation',
    desc: 'Control all smart appliances through voice commands or the NeoNest app. Never worry about leaving devices on when you\'re not home.',
  },
  {
    num: '05',
    title: 'Cost Savings on Insurance',
    desc: 'Smart-tech features may lower home insurance premiums, offering additional savings on top of energy reductions.',
  },
  {
    num: '06',
    title: 'Fully Customizable Smart Living',
    desc: 'Create your perfect ambiance with automated lighting and temperature. Personalize your home\'s automation for a seamless, luxury experience.',
  },
];

export default function Lifestyle() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.from(imgRef.current, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imgRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      if (itemsRef.current) {
        const items = itemsRef.current.querySelectorAll('.lifestyle-item');
        items.forEach((item) => {
          gsap.from(item, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="lifestyle" className="section-padding bg-[#16161A]">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left: Image */}
          <div ref={imgRef} className="lg:w-[45%]">
            <div className="rounded-[20px] overflow-hidden shadow-card">
              <img
                src="/lifestyle-living-room.jpg"
                alt="Smart living room"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div ref={itemsRef} className="lg:w-[55%]">
            <span className="label-style text-[#00D26A] mb-4 block">HOW NEONEST TRANSFORMS YOUR LIFESTYLE</span>
            <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-10">
              Live Smarter.<br />Live Better.
            </h2>

            <div className="space-y-6">
              {lifestyleItems.map((item) => (
                <div key={item.num} className="lifestyle-item flex gap-5">
                  <span className="font-mono text-xl text-[#00E6C8] shrink-0 w-8">{item.num}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1.5">{item.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
