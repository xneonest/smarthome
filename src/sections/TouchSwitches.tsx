import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const switches = [
  {
    name: '8 Switches (4M)',
    specs: [
      'Toggle / Scene / 2-way control',
      'Zigbee Smart Touch Switch',
      'Glass Panel, 2.5D Curved Bezel',
      'Customizable icons & colors',
      'Face Plate: White/Black',
      'Bezel: Gold/Silver/Black',
    ],
  },
  {
    name: '4 Switches + Socket + USB (4M)',
    specs: [
      'Toggle / Scene / 2-way control',
      'Zigbee Smart Touch Switch',
      'Glass Panel, 2.5D Curved Bezel',
      'Type A + Type C USB ports',
      'Customizable icons & colors',
      'Face Plate: White/Black',
    ],
  },
  {
    name: '8 Switches + Socket + USB (6M/8M)',
    specs: [
      'Toggle / Scene / 2-way control',
      'Zigbee Smart Touch Switch',
      'Glass Panel, 2.5D Curved Bezel',
      'Type A + Type C USB ports',
      'Expanded module for large setups',
      'Customizable icons & colors',
    ],
  },
];

export default function TouchSwitches() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const ctx = gsap.context(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current.children,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          },
        }
      );
    }

    if (heroImgRef.current) {
      gsap.fromTo(
        heroImgRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroImgRef.current,
            start: 'top 80%',
          },
        }
      );
    }

    if (gridRef.current) {
      const cards =
        gridRef.current.querySelectorAll('.switch-card');

      gsap.fromTo(
        cards,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <section ref={sectionRef} className="section-padding bg-[#0D0D0F]">
      <div className="container-main">
        <div ref={headerRef} className="text-center mb-12">
          <span className="label-style text-[#00D26A] mb-4 block">TOUCH SWITCHES</span>
          <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-4">
            Tap. Control. Transform.
          </h2>
          <p className="text-base text-white/65 max-w-[500px] mx-auto">
            NeoNest Smart Switches for an effortless lifestyle.
          </p>
        </div>

        <div ref={heroImgRef} className="rounded-[20px] overflow-hidden mb-10 shadow-card max-h-[380px]">
          <img
            src="/switches-product.jpg"
            alt="Smart touch switches"
            className="w-full h-full object-cover"
          />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {switches.map((sw) => (
            <div
              key={sw.name}
              className="switch-card bg-[#16161A] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00D26A]/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-[160px] bg-gradient-to-b from-[#1E1E24] to-[#0D0D0F] flex items-center justify-center">
                <span className="text-4xl font-bold text-white/10">{sw.name.split(' ')[0]}</span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-white mb-3">{sw.name}</h3>
                <ul className="space-y-1.5">
                  {sw.specs.map((spec) => (
                    <li key={spec} className="text-xs text-white/50 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#00D26A] mt-1.5 shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
