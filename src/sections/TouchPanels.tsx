import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const devices = [
  {
    name: 'Touch Screen Remote',
    desc: '2.5" Touch Screen + Physical Button portable remote to control all smart home devices. Comes with charging dock.',
  },
  {
    name: '4" Touch Panel',
    desc: 'Control all smart home devices with built-in Alexa and Zigbee+BLE gateway. Compact and powerful.',
  },
  {
    name: '6" Touch Panel',
    desc: 'Control with knob and Bluetooth, connect to external speakers, Zigbee+BLE gateway integration.',
  },
  {
    name: '3.5" Touch Panel',
    desc: '3 physical buttons (Relay/Scene/Shortcuts), built-in IR and BLE gateway for versatile control.',
  },
  {
    name: 'IR Blaster',
    desc: 'Control all IR appliances in a room — TV, AC, Music System — with one compact device.',
  },
  {
    name: 'Wireless Scene Controller',
    desc: '4 button / 12 scene wireless Zigbee controller with LED indicator for instant scene switching.',
  },
  {
    name: 'Curtain Motor',
    desc: 'Silent, powerful motor that controls all types of curtains with precise positioning.',
  },
  {
    name: 'Smart Gateway',
    desc: 'Zigbee, IFTTT, Matter, Thread & Bluetooth BLE Direct Plug Gateway. The brain of your smart home.',
  },
  {
    name: 'Retro-Fit Controller',
    desc: 'Multi-channel retro-fit devices to upgrade existing switches without rewiring.',
  },
  {
    name: 'Smart Sensors',
    desc: 'Motion, temperature, humidity, and light sensors that seamlessly integrate with your automation system.',
  },
];

export default function TouchPanels() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      if (heroImgRef.current) {
        gsap.from(heroImgRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroImgRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.device-card');
        cards.forEach((card, i) => {
          gsap.from(card, {
            x: i % 2 === 0 ? -30 : 30,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
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
    <section ref={sectionRef} className="section-padding bg-[#16161A]">
      <div className="container-main">
        <div ref={headerRef} className="text-center mb-12">
          <span className="label-style text-[#00E6C8] mb-4 block">TOUCH PANELS & DEVICES</span>
          <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-4">
            Your Home, Your Control
          </h2>
          <p className="text-base text-white/65 max-w-[560px] mx-auto">
            NeoNest Smart Touch Panels put automation at your fingertips.
          </p>
        </div>

        <div ref={heroImgRef} className="rounded-[20px] overflow-hidden mb-10 shadow-card max-h-[420px]">
          <img
            src="/panels-flatlay.jpg"
            alt="Smart touch panels flatlay"
            className="w-full h-full object-cover"
          />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {devices.map((device) => (
            <div
              key={device.name}
              className="device-card flex gap-4 bg-[#0D0D0F] rounded-2xl p-5 border border-white/[0.08] hover:border-[rgba(0,230,200,0.2)] transition-all duration-300"
            >
              <div className="w-[80px] h-[80px] shrink-0 rounded-xl bg-[#1E1E24] flex items-center justify-center">
                <span className="text-2xl font-bold text-white/10">{device.name.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white mb-1.5">{device.name}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{device.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
