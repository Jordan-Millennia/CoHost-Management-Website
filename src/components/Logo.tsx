export default function Logo({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 180"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Teal glow behind center */}
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
        </radialGradient>
        <filter id="blur-glow">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Background glow */}
      <circle cx="100" cy="85" r="60" fill="url(#glow)" filter="url(#blur-glow)" />

      {/* Left building - house shape */}
      <path d="M15 105 L15 70 L45 50 L45 105 Z" stroke="#0C2D5A" strokeWidth="3" fill="none" />
      <rect x="22" y="75" width="8" height="10" rx="1" stroke="#0C2D5A" strokeWidth="1.5" fill="none" />
      <rect x="22" y="90" width="8" height="15" rx="1" stroke="#0C2D5A" strokeWidth="1.5" fill="none" />
      {/* Garage */}
      <rect x="33" y="88" width="10" height="17" rx="1" stroke="#0C2D5A" strokeWidth="1.5" fill="none" />

      {/* Center tall tower */}
      <rect x="55" y="25" width="30" height="80" rx="2" stroke="#0C2D5A" strokeWidth="3" fill="none" />
      {/* Tower windows */}
      <rect x="60" y="32" width="6" height="6" rx="1" stroke="#0C2D5A" strokeWidth="1.2" fill="none" />
      <rect x="74" y="32" width="6" height="6" rx="1" stroke="#0C2D5A" strokeWidth="1.2" fill="none" />
      <rect x="60" y="45" width="6" height="6" rx="1" stroke="#0C2D5A" strokeWidth="1.2" fill="none" />
      <rect x="74" y="45" width="6" height="6" rx="1" stroke="#0C2D5A" strokeWidth="1.2" fill="none" />
      <rect x="60" y="58" width="6" height="6" rx="1" stroke="#0C2D5A" strokeWidth="1.2" fill="none" />
      <rect x="74" y="58" width="6" height="6" rx="1" stroke="#0C2D5A" strokeWidth="1.2" fill="none" />

      {/* Right tall tower */}
      <rect x="115" y="30" width="28" height="75" rx="2" stroke="#0C2D5A" strokeWidth="3" fill="none" />
      <rect x="120" y="37" width="6" height="6" rx="1" stroke="#0C2D5A" strokeWidth="1.2" fill="none" />
      <rect x="132" y="37" width="6" height="6" rx="1" stroke="#0C2D5A" strokeWidth="1.2" fill="none" />
      <rect x="120" y="50" width="6" height="6" rx="1" stroke="#0C2D5A" strokeWidth="1.2" fill="none" />
      <rect x="132" y="50" width="6" height="6" rx="1" stroke="#0C2D5A" strokeWidth="1.2" fill="none" />
      <rect x="120" y="63" width="6" height="6" rx="1" stroke="#0C2D5A" strokeWidth="1.2" fill="none" />
      <rect x="132" y="63" width="6" height="6" rx="1" stroke="#0C2D5A" strokeWidth="1.2" fill="none" />

      {/* Right house */}
      <path d="M155 105 L155 70 L185 50 L185 105 Z" stroke="#0C2D5A" strokeWidth="3" fill="none" />
      <rect x="162" y="75" width="8" height="10" rx="1" stroke="#0C2D5A" strokeWidth="1.5" fill="none" />
      <rect x="173" y="88" width="10" height="17" rx="1" stroke="#0C2D5A" strokeWidth="1.5" fill="none" />

      {/* Circuit board traces */}
      <line x1="100" y1="85" x2="100" y2="130" stroke="#00D4AA" strokeWidth="2" />
      <line x1="100" y1="85" x2="60" y2="65" stroke="#00D4AA" strokeWidth="1.5" opacity="0.7" />
      <line x1="100" y1="85" x2="140" y2="65" stroke="#00D4AA" strokeWidth="1.5" opacity="0.7" />
      <line x1="100" y1="85" x2="30" y2="85" stroke="#00D4AA" strokeWidth="1.5" opacity="0.5" />
      <line x1="100" y1="85" x2="170" y2="85" stroke="#00D4AA" strokeWidth="1.5" opacity="0.5" />
      <line x1="100" y1="85" x2="70" y2="40" stroke="#00D4AA" strokeWidth="1.2" opacity="0.4" />
      <line x1="100" y1="85" x2="130" y2="42" stroke="#00D4AA" strokeWidth="1.2" opacity="0.4" />

      {/* Center node - bright teal */}
      <circle cx="100" cy="85" r="7" fill="#00D4AA" />
      <circle cx="100" cy="85" r="4" fill="#03080F" />
      <circle cx="100" cy="85" r="2" fill="#00D4AA" />

      {/* Circuit nodes */}
      <circle cx="60" cy="65" r="3.5" fill="#00D4AA" opacity="0.8" />
      <circle cx="140" cy="65" r="3.5" fill="#00D4AA" opacity="0.8" />
      <circle cx="30" cy="85" r="3" fill="#00D4AA" opacity="0.6" />
      <circle cx="170" cy="85" r="3" fill="#00D4AA" opacity="0.6" />
      <circle cx="70" cy="40" r="2.5" fill="#00D4AA" opacity="0.5" />
      <circle cx="130" cy="42" r="2.5" fill="#00D4AA" opacity="0.5" />
      <circle cx="100" cy="130" r="3" fill="#00D4AA" opacity="0.7" />

      {/* Chip/processor squares at key points */}
      <rect x="55" y="28" width="10" height="10" rx="1.5" stroke="#00D4AA" strokeWidth="1" fill="none" opacity="0.5" />
      <rect x="135" y="33" width="10" height="10" rx="1.5" stroke="#00D4AA" strokeWidth="1" fill="none" opacity="0.5" />
      <rect x="75" y="20" width="8" height="8" rx="1.5" stroke="#00D4AA" strokeWidth="1" fill="none" opacity="0.4" />
      <rect x="117" y="22" width="8" height="8" rx="1.5" stroke="#00D4AA" strokeWidth="1" fill="none" opacity="0.4" />
    </svg>
  );
}
