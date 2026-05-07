import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmartModes() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        const cards = textRef.current.querySelectorAll('.mode-card');
        gsap.from(cards, {
          x: -40,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });
      }

      if (imagesRef.current) {
        const imgs = imagesRef.current.querySelectorAll('.mode-img');
        imgs.forEach((img) => {
          gsap.from(img, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const morningItems = [
    'Turn off the night light',
    'Open the curtains',
    'Turn on the coffee maker',
    'Turn on the lights',
    'Turn on the air purifier',
    'Disable the alert mode',
  ];

  const nightItems = [
    'Set a comfortable bedroom temperature',
    'Turn off all lights in the entire house',
    'Close the curtains',
    'Enable the alert mode',
  ];

  return (
    <section ref={sectionRef} id="modes" className="section-padding bg-[#16161A]">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left: Sticky Text */}
          <div ref={textRef} className="lg:w-1/2 lg:sticky lg:top-[120px] lg:self-start">
            <span className="label-style text-[#00D26A] mb-4 block">SET YOUR MODE</span>
            <h2 className="text-[clamp(32px,3.5vw,52px)] font-semibold leading-[1.05] tracking-[-0.02em] text-white mb-10">
              One Command.<br />Infinite Possibilities.
            </h2>

            <div className="flex flex-col gap-4">
              {/* Good Morning */}
              <div className="mode-card bg-[#1E1E24] rounded-2xl p-6 border-l-4 border-[#00D26A]">
                <h3 className="text-xl font-semibold text-white mb-3">Good Morning</h3>
                <p className="text-sm text-white/60 mb-4">
                  Start a beautiful day with Neonest. The curtains automatically open to let the sunshine in. Air purifier, bathroom light, and the coffee maker can all be turned on with a single press.
                </p>
                <ul className="space-y-1.5">
                  {morningItems.map((item) => (
                    <li key={item} className="text-sm text-white/50 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#00D26A]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Good Night */}
              <div className="mode-card bg-[#1E1E24] rounded-2xl p-6 border-l-4 border-[#00A8E8]">
                <h3 className="text-xl font-semibold text-white mb-3">Good Night</h3>
                <p className="text-sm text-white/60 mb-4">
                  Simply say "Good Night" to your voice assistant to turn off all lights, close all curtains, and activate Alert Mode.
                </p>
                <ul className="space-y-1.5">
                  {nightItems.map((item) => (
                    <li key={item} className="text-sm text-white/50 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#00A8E8]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Scrolling Images */}
          <div ref={imagesRef} className="lg:w-1/2 flex flex-col gap-6">
            <div className="mode-img rounded-[20px] overflow-hidden shadow-card">
              <img
                src="/mode-morning-bedroom.jpg"
                alt="Good Morning mode"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="mode-img rounded-[20px] overflow-hidden shadow-card">
              <img
                src="/mode-night-bedroom.jpg"
                alt="Good Night mode"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
