'use client'
import { useRouter, usePathname } from 'next/navigation';

export default function ScrollLink({ href, children }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e) => {
    e.preventDefault();
    const [path, hash] = href.split('#');

    if (pathname !== path) {
      // navigate to the page first
      router.push(path);
      // give the page a small delay to render
      setTimeout(() => {
        if (hash) {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1000); // adjust delay if needed
    } else {
      // already on the page, just scroll
      if (hash) {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="px-5 py-3 hover:text-blue-500 transition duration-500"
    >
      {children}
    </a>
  );
}
