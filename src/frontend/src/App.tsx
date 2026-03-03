import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type MenuCategory =
  | "All"
  | "North Indian"
  | "South Indian"
  | "Chinese"
  | "Fast Food"
  | "Beverages";

interface MenuItem {
  name: string;
  category: Exclude<MenuCategory, "All">;
  price: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const MENU_ITEMS: MenuItem[] = [
  { name: "Butter Chicken", category: "North Indian", price: 220 },
  { name: "Paneer Butter Masala", category: "North Indian", price: 180 },
  { name: "Dal Tadka", category: "North Indian", price: 120 },
  { name: "Masala Dosa", category: "South Indian", price: 90 },
  { name: "Idli Sambar", category: "South Indian", price: 70 },
  { name: "Hakka Noodles", category: "Chinese", price: 130 },
  { name: "Manchurian", category: "Chinese", price: 150 },
  { name: "Burger", category: "Fast Food", price: 80 },
  { name: "Pizza", category: "Fast Food", price: 150 },
  { name: "Cold Coffee", category: "Beverages", price: 60 },
  { name: "Fresh Lime", category: "Beverages", price: 40 },
];

const MENU_TABS: MenuCategory[] = [
  "All",
  "North Indian",
  "South Indian",
  "Chinese",
  "Fast Food",
  "Beverages",
];

const CATEGORY_COLORS: Record<Exclude<MenuCategory, "All">, string> = {
  "North Indian": "bg-amber-100 text-amber-800",
  "South Indian": "bg-green-100 text-green-800",
  Chinese: "bg-red-100 text-red-800",
  "Fast Food": "bg-orange-100 text-orange-800",
  Beverages: "bg-blue-100 text-blue-800",
};

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useFadeInObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.12 },
    );

    const elements = document.querySelectorAll(".fade-in-section");
    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home", ocid: "nav.home_link" },
    { href: "#about", label: "About", ocid: "nav.about_link" },
    { href: "#menu", label: "Menu", ocid: "nav.menu_link" },
    { href: "#gallery", label: "Gallery", ocid: "nav.gallery_link" },
    { href: "#contact", label: "Contact", ocid: "nav.contact_link" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-[oklch(0.97_0.02_80)]"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 text-2xl font-bold text-primary tracking-tight"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            <span className="text-accent">🌿</span>
            White Oak
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-ocid={link.ocid}
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/8"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            data-ocid="nav.hamburger_button"
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-primary/10 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <title>Close menu</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <title>Open menu</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile nav dropdown */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <ul className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-ocid={link.ocid}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/8 rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("/assets/generated/hero-banner.dim_1400x700.jpg")',
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto animate-fade-in">
        <div
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6"
          style={{
            animation: "fadeInUp 0.8s ease-out forwards",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          🍽️ Multi-Cuisine Family Restaurant
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          style={{
            animation: "fadeInUp 0.8s ease-out 0.2s forwards",
            opacity: 0,
            fontFamily: "Outfit, sans-serif",
          }}
        >
          Delicious Food at
          <span className="block text-[oklch(0.82_0.14_75)]">
            Affordable Prices
          </span>
        </h1>

        <p
          className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto"
          style={{
            animation: "fadeInUp 0.8s ease-out 0.4s forwards",
            opacity: 0,
          }}
        >
          Multi-cuisine family restaurant in Sadar Bazaar, New Delhi
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{
            animation: "fadeInUp 0.8s ease-out 0.6s forwards",
            opacity: 0,
          }}
        >
          <a
            href="#menu"
            data-ocid="hero.view_menu_button"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-xl text-base hover:bg-primary/90 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            View Menu
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <title>Scroll down</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  const highlights = [
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Family Dining",
      desc: "A warm, welcoming space perfect for every family occasion.",
    },
    {
      icon: "🌿",
      title: "Fresh Ingredients",
      desc: "We source the freshest produce daily for every dish we serve.",
    },
    {
      icon: "⚡",
      title: "Fast Service",
      desc: "Hot meals delivered to your table promptly, every time.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="fade-in-section">
            <span className="text-sm font-semibold text-accent uppercase tracking-widest">
              Our Story
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-6"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              About White Oak
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              White Oak is a budget-friendly multi-cuisine restaurant nestled in
              the heart of Sadar Bazaar, New Delhi. We bring together the rich
              flavours of North Indian, South Indian, Chinese, and Fast Food
              under one roof — all at prices that are easy on the pocket.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Whether you're here for a quick meal or a leisurely family dinner,
              we promise fresh ingredients, friendly service, and a warm
              atmosphere every time.
            </p>
          </div>

          {/* Highlight cards */}
          <div className="grid gap-5">
            {highlights.map((h, i) => (
              <div
                key={h.title}
                className={`fade-in-section fade-in-delay-${i + 1} flex items-start gap-4 bg-[oklch(0.97_0.02_80)] rounded-xl p-5 border border-border hover:shadow-md transition-shadow duration-300`}
              >
                <div className="text-3xl flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  {h.icon}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base mb-1">
                    {h.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Menu ─────────────────────────────────────────────────────────────────────

function Menu() {
  const [activeTab, setActiveTab] = useState<MenuCategory>("All");

  const tabOcids: Record<MenuCategory, string> = {
    All: "menu.all_tab",
    "North Indian": "menu.north_indian_tab",
    "South Indian": "menu.south_indian_tab",
    Chinese: "menu.chinese_tab",
    "Fast Food": "menu.fast_food_tab",
    Beverages: "menu.beverages_tab",
  };

  const filtered =
    activeTab === "All"
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="menu" className="py-20 bg-[oklch(0.97_0.02_80)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 fade-in-section">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">
            What We Offer
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground mt-2"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Our Menu
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            From hearty curries to light snacks, explore flavours from across
            India and beyond.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 fade-in-section">
          {MENU_TABS.map((tab) => (
            <button
              type="button"
              key={tab}
              data-ocid={tabOcids[tab]}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-white text-foreground/70 border-border hover:border-primary/40 hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              data-ocid={`menu.item.${index + 1}`}
              className="bg-white rounded-xl border border-border p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[item.category]}`}
                  >
                    {item.category}
                  </span>
                  <h3 className="font-bold text-foreground text-base mt-2.5 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-xl font-bold text-primary">
                    ₹{item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function Gallery() {
  const galleryItems = [
    {
      src: "/assets/generated/hero-banner.dim_1400x700.jpg",
      label: "Our Spread",
      large: true,
    },
    {
      src: "/assets/generated/gallery-north-indian.dim_600x400.jpg",
      label: "North Indian",
    },
    {
      src: "/assets/generated/gallery-south-indian.dim_600x400.jpg",
      label: "South Indian",
    },
    {
      src: "/assets/generated/gallery-chinese.dim_600x400.jpg",
      label: "Chinese",
    },
    {
      src: "/assets/generated/gallery-fastfood.dim_600x400.jpg",
      label: "Fast Food",
    },
    {
      src: "/assets/generated/gallery-beverages.dim_600x400.jpg",
      label: "Beverages",
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 fade-in-section">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">
            Visual Feast
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground mt-2"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Gallery
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            A glimpse of the delicious food and warm ambience at White Oak.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 fade-in-section">
          {galleryItems.map((item, i) => (
            <div
              key={item.label}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
              style={{ minHeight: i === 0 ? "320px" : "160px" }}
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{
                  position: "absolute",
                  inset: 0,
                  height: "100%",
                  width: "100%",
                }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-semibold text-sm">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const contactInfo = [
    {
      icon: "📍",
      label: "Address",
      value:
        "3/5, Desh Bandhu Gupta Rd, Bazar Sangatrashan, Multani Dhanda, Sadar Bazaar, New Delhi, Delhi 110055",
    },
    { icon: "📞", label: "Phone", value: "+91 98765 43210" },
    { icon: "✉️", label: "Email", value: "info@whiteoakrestaurant.in" },
    { icon: "🕐", label: "Hours", value: "Mon–Sun: 9:00 AM – 10:30 PM" },
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 fade-in-section">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">
            Find Us
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground mt-2"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Contact Us
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            We'd love to hear from you. Drop by or get in touch.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Info */}
          <div className="fade-in-section">
            <div className="grid gap-5 mb-8">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-start gap-4 bg-[oklch(0.97_0.02_80)] rounded-xl p-4 border border-border"
                >
                  <span className="text-2xl flex-shrink-0">{info.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-0.5">
                      {info.label}
                    </p>
                    <p className="text-foreground text-sm font-medium">
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="fade-in-section rounded-2xl overflow-hidden border border-border shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.7!2d77.2110!3d28.6590!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd3b1e5c3e7b%3A0x1e5c3e7b1e5c3e7b!2sDesh+Bandhu+Gupta+Rd%2C+Sadar+Bazaar%2C+New+Delhi%2C+Delhi+110055!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="White Oak Restaurant Location"
              data-ocid="contact.map_marker"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "whiteoak";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              🌿 White Oak
            </h3>
            <p className="text-white/60 text-sm">
              Delicious Food at Affordable Prices
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["Home", "About", "Menu", "Gallery", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              data-ocid="footer.facebook_link"
              aria-label="Follow us on Facebook"
              onClick={() => {}}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <title>Facebook</title>
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </button>
            <button
              type="button"
              data-ocid="footer.instagram_link"
              aria-label="Follow us on Instagram"
              onClick={() => {}}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <title>Instagram</title>
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-white/50 text-sm">
          <p>© {year} White Oak. All Rights Reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  // Register IntersectionObserver for fade-in animations across all sections
  useFadeInObserver();

  return (
    <div className="min-h-screen font-outfit">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
