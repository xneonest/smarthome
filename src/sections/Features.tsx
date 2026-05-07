import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Wifi,
  ShieldCheck,
  Palette,
  ThermometerSun,
  Smartphone,
  PanelTop,
  BrainCircuit,
  Mic,
  Zap,
  Layers,
  Puzzle,
  Speaker,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Wifi,
    title: 'Wired & Wireless Automation',
    desc: 'Flexibility for any home setup. Whether new construction or retrofit, Neonest seamlessly integrates into your space.',
  },
  {
    icon: ShieldCheck,
    title: 'Smart Security Solutions',
    desc: 'Smart locks, motion sensors, CCTV integration, AI threat detection, and 24/7 remote monitoring protect your home.',
  },
  {
    icon: Palette,
    title: 'Scene Customization',
    desc: 'Create personalized scenes: Movie Night, Good Morning, Party Mode — all activated with a single command.',
  },
  {
    icon: ThermometerSun,
    title: 'Smart Lighting & Climate',
    desc: 'Automated lighting based on time, occupancy, and natural light.',
  },
  {
    icon: Smartphone,
    title: 'Remote Monitoring',
    desc: 'Stay connected no matter where you are with real-time notifications.',
  },
  {
    icon: PanelTop,
    title: 'Smart Blinds & Curtains',
    desc: 'Automate window treatments based on time, sunlight, or your preferences.',
  },
  {
    icon: BrainCircuit,
    title: 'AI Self-Learning',
    desc: 'Learns your routines and optimizes your smart home automatically.',
  },
  {
    icon: Mic,
    title: 'Voice & App Control',
    desc: 'Control your home with Alexa, Siri, Google Assistant, or the NeoNest app.',
  },
  {
    icon: Zap,
    title: 'Energy Management',
    desc: 'Optimize power usage and reduce electricity bills intelligently.',
  },
  {
    icon: Layers,
    title: 'Easy Upgrades',
    desc: 'Start small and expand anytime with modular smart-home architecture.',
  },
  {
    icon: Puzzle,
    title: 'Third-Party Integration',
    desc: 'Integrates seamlessly with TVs, appliances, and smart ecosystems.',
  },
  {
    icon: Speaker,
    title: 'Multi-Zone Audio',
    desc: 'Control music and entertainment independently across rooms.',
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards =
          cardsRef.current.querySelectorAll('.feature-card');

        gsap.fromTo(
          cards,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="section-padding bg-[#0D0D0F]"
    >
      <div className="container-main">
        <div className="text-center mb-16">
          <span className="label-style text-[#00E6C8] mb-4 block">
            WHY CHOOSE US
          </span>

          <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white max-w-[600px] mx-auto">
            Intelligence That Adapts to You
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="feature-card group bg-[#16161A] rounded-2xl p-7 border border-white/[0.08] hover:border-[#00E6C8]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-[10px] bg-[#1E1E24] flex items-center justify-center mb-5">
                  <Icon
                    size={20}
                    className="text-[#00E6C8]"
                  />
                </div>

                <h3 className="text-lg font-semibold text-white mb-2.5">
                  {feature.title}
                </h3>

                <p className="text-sm text-white/60 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}