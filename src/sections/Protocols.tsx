import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const protocols = ['Zigbee', 'IFTTT', 'WiFi', 'Matter', 'Thread', 'Bluetooth'];
const platforms = ['Apple Home', 'Google Home', 'Alexa', 'SmartThings', 'Siri'];

export default function Protocols() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        const badges = leftRef.current.querySelectorAll('.protocol-badge');
        gsap.from(badges, {
          scale: 0,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      if (rightRef.current) {
        const logos = rightRef.current.querySelectorAll('.platform-badge');
        gsap.from(logos, {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        const img = rightRef.current.querySelector('.protocol-img');
        if (img) {
          gsap.from(img, {
            x: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-[#16161A]">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left */}
          <div ref={leftRef} className="lg:w-1/2">
            <span className="label-style text-[#00E6C8] mb-4 block">CONNECTED ECOSYSTEM</span>
            <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-6">
              Works With Everything You Own
            </h2>
            <p className="text-base text-white/65 leading-relaxed mb-8">
              Neonest's advanced protocol support enables real-time automation, minimal latency, and smooth device communication, ensuring a truly connected living space.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {protocols.map((p) => (
                <span
                  key={p}
                  className="protocol-badge bg-[#1E1E24] rounded-xl px-5 py-3 text-sm font-medium text-white/80 border border-white/[0.08]"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div ref={rightRef} className="lg:w-1/2">
            <h3 className="text-xl font-semibold text-white mb-4">Cross-Platform Compatibility</h3>
            <p className="text-base text-white/65 leading-relaxed mb-6">
              Neonest products are integrated with major third-party platforms. Speak your way to convenience — control devices with natural voice commands.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {platforms.map((p) => (
                <span
                  key={p}
                  className="platform-badge bg-[#1E1E24] rounded-xl px-4 py-2.5 text-sm font-medium text-white/70 border border-white/[0.08]"
                >
                  {p}
                </span>
              ))}
            </div>

            <div className="protocol-img rounded-[20px] overflow-hidden shadow-card">
              <img
                src="/protocols-phone-app.jpg"
                alt="Smart home app control"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
