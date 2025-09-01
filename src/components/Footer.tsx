import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-6 md:py-8">
      <div className="container flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Synvora. All rights reserved.
        </p>
        <Link href="/admin/login" className="text-sm text-muted-foreground hover:text-primary">
          Admin
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
