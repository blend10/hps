import Link from "next/link";
import Image from "next/image";
import FooterWordmarkLazy from "./FooterWordmarkLazy";

// hrefs point at the real routes under src/app/*. "Our Technology" has no page
// yet, so it is marked `disabled` and renders as a non-clickable label (mirrors
// the header mega-menu) instead of linking to a 404.
const navColumns = [
  {
    title: "Company",
    links: [
      { label: "About HPS", href: "/aboutUs" },
      { label: "Our Technology", href: "/technology", disabled: true },
      { label: "Careers", href: "/company" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Gladiator", href: "/product/gladiator" },
      { label: "Riot Helmet 1.0", href: "/product/riot" },
      { label: "Lift Airborne AV2.2", href: "/product/airborne" },
    ],
  },
  {
    title: "Get in Touch",
    links: [
      { label: "Latest News", href: "/news" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto container px-6 md:px-8">
        {/* Top bar: go-to-top · rule · logo · rule · linkedin */}
        <div className="flex items-center gap-3 pt-9 sm:gap-4 md:gap-6">
          <a
            href="#top"
            className="flex shrink-0 items-center gap-2 text-[11px] md:text-sm font-medium uppercase tracking-tight text-[#C7CAD1] transition-colors hover:text-white"
          >
            <Image
              src="/top.svg"
              alt="Go to top"
              width={13}
              height={13}
              className="h-3 w-3"
            />
            Go to top
          </a>

          <span className="h-px flex-1 bg-neutral-700/70" />

          <Image
            src="/hpsFooterLogo.svg"
            alt="High Protection Systems"
            width={136}
            height={87}
            className="h-12 w-auto shrink-0 sm:h-auto"
          />

          <span className="h-px flex-1 bg-neutral-700/70" />

          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="HPS on LinkedIn"
            className="shrink-0 opacity-90 transition-opacity hover:opacity-100"
          >
            <Image
              src="/linkedinLogo.svg"
              alt=""
              width={28}
              height={28}
              className="h-6 w-6"
            />
          </a>
        </div>

        {/* Brand statement + navigation */}
        <div className="flex flex-col gap-12 pt-14 pb-12 lg:flex-row lg:justify-between">
          <div className="">
            <h2 className="text-3xl font-semibold tracking-tight md:text-[50px]">
              High Protection Systems
              <sup className="ml-0.5 text-lg font-semibold md:text-[30px]">™</sup>
            </h2>
            <p className="mt-5  leading-relaxed text-[#C7CAD1]">
              HPS delivers next-generation ballistic and tactical helmets
              engineered <br className="hidden lg:inline" /> for elite military, law enforcement, and special
              forces. Built on motorsport <br className="hidden lg:inline" /> safety excellence and proven
              through thousands of real-world operations.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12 lg:gap-16">
            {navColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[11px] md:text-[16px] font-medium uppercase tracking-tight text-white">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) =>
                    link.disabled ? (
                      <li key={link.label}>
                        <span
                          aria-disabled="true"
                          title="Coming soon"
                          className="cursor-not-allowed text-sm text-[#6b6b6b]"
                        >
                          {link.label}
                        </span>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm  text-[#C7CAD1] transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col gap-4 border-b-2 border-neutral-800 py-6 text-[13px] font-medium uppercase tracking-tight text-[#8a8a8a] sm:flex-row sm:items-center sm:justify-between sm:text-[16px]">
          <p>© High Protection Systems 2026 — All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="transition-colors hover:text-neutral-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-neutral-300"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Oversized wordmark, clipped at the page edge. Hover reveals the
            image-filled variant under a torch/spotlight. Lazy-loaded (ssr:false)
            so this decorative, hover-only JS stays off the critical path. */}
        <FooterWordmarkLazy />
      </div>
    </footer>
  );
};

export default Footer;
