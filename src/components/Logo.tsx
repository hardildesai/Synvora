import { Music } from 'lucide-react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="p-2 bg-primary/80 text-primary-foreground rounded-lg group-hover:bg-primary transition-colors">
        <Music className="w-6 h-6" />
      </div>
      <span className="text-xl font-bold font-headline text-primary-foreground bg-primary/80 dark:bg-primary/50 px-3 py-2 rounded-lg">
        RhythmPass
      </span>
    </Link>
  );
};

export default Logo;
