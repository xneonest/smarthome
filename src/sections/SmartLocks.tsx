import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const locks = [
  {
    name: 'K300',
    specs: [
      '3D Face Recognition + Fingerprint + RF ID',
      'Passcode + OTP + App + Manual Keys',
      '2-Way Communication from App',
      'Door Thickness: 35-70mm',
    ],
  },
  {
    name: 'K703',
    specs: [
      'Ultra Thin with 3D Face Recognition',
      'Fingerprint + RF ID + Passcode + OTP',
      'App Unlock + Manual Keys',
      'Door Thickness: 35-70mm',
    ],
  },
  {
    name: 'K390',
    specs: [
      'Ultra Thin Smart Lock',
      'Fingerprint + RF ID + Passcode + OTP',
      'App Unlock + Manual Keys',
      'Door Thickness: 35-55mm',
    ],
  },
  {
    name: 'K608',
    specs: [
      'Fingerprint + RF ID + Passcode + OTP',
      'App Unlock + Manual Keys',
      'Passage Mode available',
      'Door Thickness: 35-55mm',
    ],
  },
  {
    name: 'S200',
    specs: [
      'Smart Handle Lock',
      'Fingerprint + RF ID + Passcode + OTP',
      'App Unlock + Manual Keys',
      'Passage Mode available',
      'Door Thickness: 35-55mm',
    ],
  },
  {
    name: 'L40',
    specs: [
      'BLE Smart Drawer Lock',
      'Fingerprint + Manual USB Keys',
      'Door Thickness: up to 55mm',
    ],
  },
];

export default function SmartLocks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
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
            toggleActions: 'play none none none',
          },
        }
      );
    }

    if (gridRef.current) {
      const cards =
        gridRef.current.querySelectorAll('.lock-card');

      gsap.fromTo(
        cards,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, sectionRef);

  return () => ctx.revert();
}, []);

  return (
    <section ref={sectionRef} id="products" className="section-padding bg-[#0D0D0F]">
      <div className="container-main">
        <div ref={headerRef} className="text-center mb-12">
          <span className="label-style text-[#00E6C8] mb-4 block">SMART LOCKS</span>
          <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-4">
            No Keys. No Worries.
          </h2>
          <p className="text-base text-white/65 max-w-[500px] mx-auto">
            Intelligent access control for the modern home.
          </p>
        </div>

        <div className="rounded-[20px] overflow-hidden mb-10 shadow-card max-h-[420px]">
          <img
            src="/locks-hero-product.jpg"
            alt="Smart lock product"
            className="w-full h-full object-cover"
          />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {locks.map((lock) => (
            <div
              key={lock.name}
              className="lock-card bg-[#16161A] rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#00E6C8]/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-[180px] bg-gradient-to-b from-[#1E1E24] to-[#0D0D0F] flex items-center justify-center">
                <span className="text-5xl font-bold text-white/10">{lock.name}</span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white mb-3">{lock.name}</h3>
                <ul className="space-y-1.5">
                  {lock.specs.map((spec) => (
                    <li key={spec} className="text-xs text-white/50 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#00E6C8] mt-1.5 shrink-0" />
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
