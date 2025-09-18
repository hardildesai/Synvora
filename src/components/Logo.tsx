import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center group" aria-label="Synvora Home">
      <svg 
        width="140" 
        height="48" 
        viewBox="0 0 140 48"
        className="transition-transform group-hover:scale-105"
        aria-hidden="true"
      >
        <text 
            x="50%" 
            y="50%" 
            dominantBaseline="middle" 
            textAnchor="middle" 
            fontFamily="Poppins, sans-serif" 
            fontSize="24" 
            fontWeight="800" 
            fill="hsl(var(--primary-foreground))"
            letterSpacing="1.5"
            className="drop-shadow-[0_2px_4px_hsl(var(--primary)/0.5)]"
        >
            SYNVORA
        </text>
      </svg>
    </Link>
  );
};

export default Logo;
