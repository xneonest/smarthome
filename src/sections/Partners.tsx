const clientLogos = [
  'swamiraj.png',
  'dosti.png',
  'hiranandani.png',
  'mohan.png',
  'tharwani.png',
  'runwal.png',
  'mehta.png',
  'lodha.png',
]

const partnerLogos = [
  'auxo.png',
  'helvar.png',
  'sylvania.png',
]

export default function Partners() {
  return (
    <section className="bg-[#0D0D0F] py-20 overflow-hidden">

      <div className="container-main">

        {/* CLIENTS */}
        <div className="mb-16">

          <p className="text-center text-[#00E6C8] text-sm tracking-[0.25em] mb-10">
            PROJECTS ACROSS PREMIUM DEVELOPMENTS
          </p>

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02] backdrop-blur-xl">

            <div className="flex animate-marquee gap-10 py-12 px-10 w-max">

              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <div
  key={index}
  className="flex items-center justify-center min-w-[220px] h-[90px] rounded-2xl bg-white/[0.02] border border-white/[0.04] opacity-90 hover:opacity-100 transition-all duration-300"
>
                  <img
                    src={`/logos/${logo}`}
                    alt={logo}
                    className="max-h-14 w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-300 mix-blend-lighten"
                  />
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* PARTNERS */}
        <div>

          <p className="text-center text-[#00E6C8] text-sm tracking-[0.25em] mb-10">
            AUTOMATION & TECHNOLOGY PARTNERS
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">

            {partnerLogos.map((logo) => (
              <div
                key={logo}
                className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl h-[140px] p-6 flex items-center justify-center hover:border-[#00E6C8]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={`/logos/${logo}`}
                  alt={logo}
                  className="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-all duration-300 mix-blend-lighten"
                />
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  )
}