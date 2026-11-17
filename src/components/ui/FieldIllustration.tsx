import React from 'react';

interface FieldIllustrationProps {
  className?: string;
}

export function FieldIllustration({ className = '' }: FieldIllustrationProps) {
  return (
    <div className={`relative overflow-hidden pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 600 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto text-field-800 dark:text-straw-400 opacity-85 transition-opacity"
      >
        {/* Ground gentle curve */}
        <path
          d="M0 230 C150 215, 350 235, 600 220 L600 240 L0 240 Z"
          fill="currentColor"
          fillOpacity="0.08"
        />

        {/* Stalk 1 (Left tall) */}
        <path
          d="M60 230 C70 170, 75 110, 85 45"
          stroke="#1E3B2A"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="dark:stroke-emerald-400"
        />
        {/* Ragi / Millet Head 1 */}
        <path d="M85 45 C75 35, 60 40, 55 50" stroke="#D8B25C" strokeWidth="3" strokeLinecap="round" />
        <path d="M85 45 C80 25, 70 20, 65 30" stroke="#D8B25C" strokeWidth="3" strokeLinecap="round" />
        <path d="M85 45 C88 20, 95 18, 98 28" stroke="#D8B25C" strokeWidth="3" strokeLinecap="round" />
        <path d="M85 45 C98 30, 110 35, 112 48" stroke="#D8B25C" strokeWidth="3" strokeLinecap="round" />
        <path d="M85 45 C90 55, 95 65, 88 72" stroke="#D8B25C" strokeWidth="2.5" strokeLinecap="round" />

        {/* Stalk 2 (Mid-left leaning) */}
        <path
          d="M140 230 C150 160, 175 110, 195 65"
          stroke="#1E3B2A"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="dark:stroke-emerald-400"
        />
        <path d="M195 65 C185 50, 170 55, 168 68" stroke="#D8B25C" strokeWidth="3" strokeLinecap="round" />
        <path d="M195 65 C190 40, 182 32, 178 45" stroke="#D8B25C" strokeWidth="3" strokeLinecap="round" />
        <path d="M195 65 C205 38, 218 38, 215 52" stroke="#D8B25C" strokeWidth="3" strokeLinecap="round" />
        <path d="M195 65 C215 55, 222 68, 216 78" stroke="#D8B25C" strokeWidth="3" strokeLinecap="round" />

        {/* Stalk 3 (Center foreground - majestic) */}
        <path
          d="M270 230 C272 150, 280 80, 290 25"
          stroke="#1E3B2A"
          strokeWidth="3"
          strokeLinecap="round"
          className="dark:stroke-emerald-300"
        />
        {/* Ragi 5-finger seed cluster */}
        <path d="M290 25 C275 12, 260 22, 255 35" stroke="#D8B25C" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M290 25 C282 5, 275 2, 270 15" stroke="#D8B25C" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M290 25 C295 -2, 305 0, 308 12" stroke="#D8B25C" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M290 25 C310 10, 322 18, 320 32" stroke="#D8B25C" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M290 25 C305 40, 312 48, 300 58" stroke="#D8B25C" strokeWidth="3" strokeLinecap="round" />
        {/* Leaves */}
        <path d="M276 130 C250 115, 230 125, 210 145" stroke="#2A523A" strokeWidth="2" strokeLinecap="round" />
        <path d="M284 90 C310 80, 330 90, 345 110" stroke="#2A523A" strokeWidth="2" strokeLinecap="round" />

        {/* Stalk 4 (Mid-right) */}
        <path
          d="M390 230 C395 165, 410 105, 420 50"
          stroke="#1E3B2A"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="dark:stroke-emerald-400"
        />
        <path d="M420 50 C410 38, 395 42, 390 55" stroke="#D8B25C" strokeWidth="3" strokeLinecap="round" />
        <path d="M420 50 C418 28, 408 22, 402 34" stroke="#D8B25C" strokeWidth="3" strokeLinecap="round" />
        <path d="M420 50 C430 25, 442 28, 440 40" stroke="#D8B25C" strokeWidth="3" strokeLinecap="round" />
        <path d="M420 50 C438 42, 448 55, 442 66" stroke="#D8B25C" strokeWidth="3" strokeLinecap="round" />

        {/* Stalk 5 (Far-right) */}
        <path
          d="M490 230 C500 170, 520 120, 535 75"
          stroke="#1E3B2A"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="dark:stroke-emerald-400"
        />
        <path d="M535 75 C525 62, 510 68, 508 80" stroke="#D8B25C" strokeWidth="3" strokeLinecap="round" />
        <path d="M535 75 C530 50, 522 45, 518 56" stroke="#D8B25C" strokeWidth="3" strokeLinecap="round" />
        <path d="M535 75 C545 48, 558 50, 555 64" stroke="#D8B25C" strokeWidth="3" strokeLinecap="round" />

        {/* Golden seed dots dispersed gently */}
        <circle cx="85" cy="40" r="2.5" fill="#D8B25C" />
        <circle cx="192" cy="58" r="2.5" fill="#D8B25C" />
        <circle cx="288" cy="20" r="3" fill="#D8B25C" />
        <circle cx="418" cy="45" r="2.5" fill="#D8B25C" />
        <circle cx="532" cy="70" r="2.5" fill="#D8B25C" />
      </svg>
    </div>
  );
}
