export default function Demovideo() {
  return (
    <section
      id="demo-video"
      className="bg-[#0D0D0F] py-24 overflow-hidden"
    >
      <div className="container-main">

        {/* Heading */}
        <div className="text-center mb-14">

          <p className="text-[#00E6C8] text-sm tracking-[0.25em] mb-4">
            EXPERIENCE NEONEST
          </p>

          <h2 className="text-[clamp(34px,4vw,60px)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
            See Smart Living<br />
            In Action
          </h2>

          <p className="text-white/60 text-lg max-w-2xl mx-auto mt-6">
            Discover how NeoNest transforms modern homes into intelligent living experiences through seamless automation.
          </p>

        </div>

        {/* Video Container */}
        <div className="relative rounded-[32px] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl">

          <div className="aspect-video">

            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/WjcdnZgmDdg"
              title="NeoNest Smart Home Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

          </div>

        </div>

      </div>
    </section>
  )
}