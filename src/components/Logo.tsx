import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="p-2 bg-primary/80 text-primary-foreground rounded-lg group-hover:bg-primary transition-colors">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4H7zM7 7h10v10H7V7z"
          />
        </svg>
      </div>
      <span className="text-xl font-bold font-headline text-primary-foreground bg-primary/80 dark:bg-primary/50 px-3 py-2 rounded-lg">
        Synvora
      </span>
    </Link>
  );
};

export default Logo;
