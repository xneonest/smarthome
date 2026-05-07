export default function NeonestLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" stroke="#00E6C8" strokeWidth="3" strokeLinecap="round" strokeDasharray="90 180" className="origin-center animate-ring-rotate" />
      <circle cx="24" cy="24" r="13" stroke="#00A8E8" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="60 180" className="origin-center animate-ring-rotate-reverse" />
    </svg>
  );
}
