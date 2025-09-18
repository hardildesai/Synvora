import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center group">
      <div 
        className="relative w-40 h-12"
      >
        <Image 
          src="/logo.png" 
          alt="Synvora Logo" 
          fill
          style={{ objectFit: "contain" }}
          className="transition-transform group-hover:scale-105"
          priority
        />
      </div>
    </Link>
  );
};

export default Logo;
