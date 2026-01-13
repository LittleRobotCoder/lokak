"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// ============================================================================
// Types
// ============================================================================

type NavSubItem = {
  name: string;
  href: string;
  highlight?: boolean;
};

type NavItem = {
  name: string;
  href: string;
  items: NavSubItem[] | null;
};

type NavItems = {
  [key: string]: NavItem;
};

// ============================================================================
// Constants
// ============================================================================

const NAV_ITEMS: NavItems = {
  about: {
    name: "About",
    href: "/about",
    items: [
      { name: "Mission & Vision", href: "/about" },
      { name: "Organizers", href: "/about#organizers" },
      { name: "Legacy & Impact", href: "/legacy-impact" },
    ],
  },
  summit: {
    name: "Summit",
    href: "/summit",
    items: [
      { name: "Agenda", href: "/summit#agenda" },
      { name: "Speakers", href: "/summit#speakers" },
      { name: "Venue", href: "/summit#venue" },
      { name: "Register", href: "/register", highlight: true },
    ],
  },
  hackathon: {
    name: "Hackathon",
    href: "/hackathon",
    items: null,
  },
  sponsorship: {
    name: "Sponsorship",
    href: "/sponsorship",
    items: null,
  },
  more: {
    name: "More",
    href: "#",
    items: [
      { name: "Blog", href: "/blog" },
      { name: "Contact", href: "/contact" },
    ],
  },
};

const HOVER_OPEN_DELAY = 120;
const HOVER_CLOSE_DELAY = 150;
const NAVBAR_SHOW_DELAY = 5000;
const FADE_TRANSITION_DURATION = 300;
const SCROLL_THRESHOLD = 10;

const DROPDOWN_STYLES = {
  backgroundColor: "rgba(14, 14, 16, 0.95)",
  borderColor: "rgba(255, 255, 255, 0.1)",
  boxShadow:
    "0 8px 32px rgba(108, 99, 255, 0.15), 0 2px 8px rgba(0, 216, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
};

const ACTIVE_INDICATOR_TRANSITION = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
};

// ============================================================================
// Helper Functions
// ============================================================================

function isPathActive(href: string, pathname: string): boolean {
  return pathname === href || pathname.startsWith(href + "/");
}

function getActiveNavKey(pathname: string, navItems: NavItems): string | null {
  // Check exact matches first
  for (const [key, item] of Object.entries(navItems)) {
    if (pathname === item.href) {
      return key;
    }
  }
  // Check prefix matches (more specific first)
  const sortedEntries = Object.entries(navItems).sort(
    (a, b) => b[1].href.length - a[1].href.length
  );
  for (const [key, item] of sortedEntries) {
    if (isPathActive(item.href, pathname)) {
      return key;
    }
  }
  return null;
}

// ============================================================================
// Components
// ============================================================================

function DesktopDropdown({
  item,
  isActive,
  onClose,
  pathname,
}: {
  item: NavItem;
  isActive: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isActive, onClose]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!item.items) return null;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 min-w-[200px] rounded-xl border overflow-hidden z-50 backdrop-blur-3xl"
          style={DROPDOWN_STYLES}
          onMouseEnter={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
          }}
          onMouseLeave={() => {
            timeoutRef.current = setTimeout(() => onClose(), HOVER_CLOSE_DELAY);
          }}
        >
          <div className="py-2">
            {item.items.map((subItem, idx) => {
              const isHighlighted = subItem.highlight === true;
              const isSubItemActive = isPathActive(subItem.href, pathname);

              return (
                <Link
                  key={idx}
                  href={subItem.href}
                  onClick={onClose}
                  className={cn(
                    "block px-4 py-2.5 pl-8 text-sm transition-all duration-200 relative group",
                    isHighlighted
                      ? "bg-gradient-to-r from-[#6C63FF]/10 to-[#402A95]/10 text-[#6C63FF] font-medium border-t border-b border-white/5 my-1"
                      : "text-foreground/80 hover:text-foreground hover:bg-white/[0.05]"
                  )}
                >
                  {/* Left accent line/dot */}
                  <span
                    className={cn(
                      "absolute left-3 top-1/2 -translate-y-1/2 rounded-full transition-all duration-200",
                      isSubItemActive
                        ? "bg-gradient-to-r from-[#6C63FF] to-[#00D8FF] w-1.5 h-4"
                        : isHighlighted
                        ? "bg-[#6C63FF] w-1 h-1"
                        : "bg-foreground/30 group-hover:bg-foreground/60 w-1 h-1"
                    )}
                  />
                  {subItem.name}
                  {isHighlighted && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider opacity-60">
                      CTA
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileAccordion({
  item,
  isOpen,
  onToggle,
  pathname,
  onNavClick,
}: {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  pathname: string;
  onNavClick: (href: string) => (e: React.MouseEvent) => void;
}) {
  const hasItems = item.items && item.items.length > 0;
  const isActive = isPathActive(item.href, pathname);

  return (
    <div>
      {hasItems ? (
        <>
          <button
            onClick={onToggle}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 text-sm transition-colors rounded-lg",
              isActive
                ? "text-foreground bg-white/40"
                : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"
            )}
            aria-expanded={isOpen}
            aria-haspopup="menu"
          >
            <span>{item.name}</span>
            <svg
              className={cn(
                "w-4 h-4 transition-transform",
                isOpen && "rotate-180"
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pl-4 pb-2 space-y-1">
                  {item.items?.map((subItem, idx) => {
                    const isHighlighted = subItem.highlight === true;
                    return (
                      <Link
                        key={idx}
                        href={subItem.href}
                        onClick={(e) => {
                          onNavClick(subItem.href)(e);
                          onToggle();
                        }}
                        className={cn(
                          "block px-4 py-2 text-sm rounded-md transition-colors",
                          isHighlighted
                            ? "bg-gradient-to-r from-[#6C63FF]/20 to-[#402A95]/20 text-[#6C63FF] font-medium border border-[#6C63FF]/30"
                            : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03]"
                        )}
                      >
                        {subItem.name}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <Link
          href={item.href}
          onClick={onNavClick(item.href)}
          className={cn(
            "block px-4 py-3 text-sm transition-colors rounded-lg",
            isActive
              ? "text-foreground bg-white/[0.08]"
              : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"
          )}
        >
          {item.name}
        </Link>
      )}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export default function Navbar({
  startAnimation,
}: {
  startAnimation?: boolean;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenSections, setMobileOpenSections] = useState<Set<string>>(
    new Set()
  );
  const hoverTimeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), NAVBAR_SHOW_DELAY);
    return () => clearTimeout(timer);
  }, [startAnimation]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  useEffect(() => {
    return () => {
      hoverTimeoutRef.current.forEach((timeout) => clearTimeout(timeout));
      hoverTimeoutRef.current.clear();
    };
  }, []);

  const onNavClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === href) {
      setOpen(false);
      return;
    }
    setTimeout(() => {
      router.push(href);
      setOpen(false);
    }, FADE_TRANSITION_DURATION);
  };

  const toggleMobileSection = (key: string) => {
    setMobileOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleDropdownHover = (key: string, shouldOpen: boolean) => {
    const existingTimeout = hoverTimeoutRef.current.get(key);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }
    const delay = shouldOpen ? HOVER_OPEN_DELAY : HOVER_CLOSE_DELAY;
    const timeout = setTimeout(() => {
      setOpenDropdown(shouldOpen ? key : null);
    }, delay);
    hoverTimeoutRef.current.set(key, timeout);
  };

  const navButtonsVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: startAnimation ? 0.3 : 0.6,
      },
    },
  };

  const navButtonVariant = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.22, ease: "easeOut" },
    },
  };

  const activeNavKey = getActiveNavKey(pathname, NAV_ITEMS);

  const navbarBoxShadow = scrolled
    ? "0 8px 40px rgba(108, 99, 255, 0.15), 0 1px 0 rgba(255, 255, 255, 0.08) inset"
    : "0 4px 30px rgba(108, 99, 255, 0.1), 0 1px 0 rgba(255, 255, 255, 0.05) inset";

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          ref={menuRef}
          initial={{
            opacity: 0,
            scaleX: 0.28,
            x: "-50%",
            y: -8,
            paddingTop: 0,
            paddingBottom: 0,
          }}
          animate={{
            opacity: 1,
            scaleX: 1,
            x: "-50%",
            y: -8,
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
          }}
          exit={{
            opacity: 0,
            scaleX: 0.28,
            x: "-50%",
            y: -8,
            paddingTop: 0,
            paddingBottom: 0,
          }}
          transition={{
            opacity: { duration: 0.28, ease: "easeInOut" },
            scaleX: {
              delay: 0.06,
              duration: 0.48,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
            paddingTop: {
              delay: 0.14,
              duration: 0.42,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
            paddingBottom: {
              delay: 0.14,
              duration: 0.42,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          }}
          className="fixed top-4 left-1/2 z-[60] backdrop-blur-xl bg-black/[0.4] text-white rounded-2xl shadow-2xl px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between max-w-7xl border border-white/10 w-[95%] transition-all duration-300"
          style={{
            boxShadow: navbarBoxShadow,
            animation: "rainbow-glow 6s ease-in-out infinite",
            transformOrigin: "center top",
            willChange: "transform, opacity",
          }}
        >
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={onNavClick("/")}
            >
              <Image
                src="/images/logo.png"
                alt="Lokaksema"
                width={40}
                height={40}
                className="h-10 w-10 block lg:hidden"
                priority
              />
              <Image
                src="/images/logo.png"
                alt="Lokaksema"
                width={96}
                height={24}
                className="h-6 w-auto hidden lg:block"
                priority
              />
              <span className="hidden sm:inline font-semibold tracking-tight text-foreground">
                Lokaksema 2026
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden lg:flex items-center gap-1"
            variants={navButtonsVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(NAV_ITEMS).map(([key, item]) => {
              const isActive = activeNavKey === key;
              const isOpen = openDropdown === key;

              if (item.items) {
                return (
                  <motion.div
                    key={key}
                    variants={navButtonVariant}
                    className="relative"
                    onMouseEnter={() => handleDropdownHover(key, true)}
                    onMouseLeave={() => handleDropdownHover(key, false)}
                  >
                    <button
                      onClick={() => setOpenDropdown(isOpen ? null : key)}
                      className={cn(
                        "px-4 py-2 text-sm transition-all duration-200 rounded-lg relative group",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                        "hover:bg-white/[0.06] hover:shadow-[0_2px_8px_rgba(108,99,255,0.15)] hover:-translate-y-[1px] hover:scale-[1.02]"
                      )}
                      aria-haspopup="menu"
                      aria-expanded={isOpen}
                    >
                      {item.name}
                      <span className="ml-1 inline-block text-[10px] opacity-60">
                        ▾
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-8 bg-gradient-to-r from-[#6C63FF] to-[#00D8FF] rounded-full shadow-[0_0_8px_rgba(108,99,255,0.5)]"
                          initial={false}
                          transition={ACTIVE_INDICATOR_TRANSITION}
                        />
                      )}
                    </button>
                    <DesktopDropdown
                      item={item}
                      isActive={isOpen}
                      onClose={() => setOpenDropdown(null)}
                      pathname={pathname}
                    />
                  </motion.div>
                );
              } else {
                return (
                  <motion.div
                    key={key}
                    variants={navButtonVariant}
                    className="relative group"
                  >
                    <Link
                      href={item.href}
                      onClick={onNavClick(item.href)}
                      className={cn(
                        "px-4 py-2 text-sm transition-all duration-200 rounded-lg relative",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                        "hover:shadow-[0_2px_8px_rgba(108,99,255,0.15)] hover:-translate-y-[1px] hover:scale-[1.02]"
                      )}
                    >
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-8 bg-gradient-to-r from-[#6C63FF] to-[#00D8FF] rounded-full shadow-[0_0_8px_rgba(108,99,255,0.5)]"
                          initial={false}
                          transition={ACTIVE_INDICATOR_TRANSITION}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              }
            })}

            {/* Register CTA */}
            <motion.div variants={navButtonVariant} className="ml-2">
              <Link
                href="/register"
                className="inline-flex items-center justify-center min-h-[40px] px-5 py-2 text-sm font-medium text-white rounded-full relative overflow-hidden transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 active:scale-95 bg-gradient-to-br from-[#6C63FF] to-[#402A95] hover:shadow-[0_8px_24px_rgba(108,99,255,0.4),0_4px_12px_rgba(0,216,255,0.2)]"
                onClick={onNavClick("/register")}
              >
                Register
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 hover:text-foreground hover:bg-white/[0.05] transition-colors"
            onClick={() => setOpen(!open)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.5 }}
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[calc(100%+12px)] left-0 right-0 rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-[70] backdrop-blur-3xl"
                style={DROPDOWN_STYLES}
              >
                <div className="p-4 space-y-1">
                  {/* Register CTA at top */}
                  <Link
                    href="/register"
                    onClick={onNavClick("/register")}
                    className="block text-center min-h-[48px] px-5 py-3 text-sm font-medium text-white rounded-full relative overflow-hidden transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 active:scale-95 bg-gradient-to-br from-[#6C63FF] to-[#402A95] hover:shadow-[0_8px_24px_rgba(108,99,255,0.4),0_4px_12px_rgba(0,216,255,0.2)] mb-4"
                  >
                    Register
                  </Link>

                  {/* Navigation Items */}
                  {Object.entries(NAV_ITEMS).map(([key, item]) => (
                    <MobileAccordion
                      key={key}
                      item={item}
                      isOpen={mobileOpenSections.has(key)}
                      onToggle={() => toggleMobileSection(key)}
                      pathname={pathname}
                      onNavClick={onNavClick}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
