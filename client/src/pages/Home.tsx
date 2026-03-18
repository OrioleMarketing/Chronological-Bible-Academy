/**
 * Chronological Bible Academy — Main Landing Page
 *
 * Design Philosophy: Classic Theological Gravitas
 * - Color Palette: Deep Navy (#0B1F3B) background, Gold (#d4af37) accent
 * - Typography: Playfair Display (serif) for headings, Inter for body
 * - Layout: Full-width sections with centered content, asymmetric card grids
 * - Signature Elements: Gold pulse badge, step-numbered framework cards, tilted book mockup
 * - Interaction: Smooth color transitions on hover, subtle shadow glows on CTAs
 */

import { BookOpen, GraduationCap, Users, ArrowRight, CheckCircle2, ChevronRight, ChevronDown, Menu, X, CheckCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";

export default function Academy() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Track scroll position for sticky nav styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const handleNavClick = () => setMobileMenuOpen(false);

  // ── Waitlist form state ──────────────────────────────────────────────────
  const [waitlistName, setWaitlistName] = useState("");
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistDone, setWaitlistDone] = useState(false);
  const waitlistMutation = trpc.forms.submitWaitlist.useMutation({
    onSuccess: () => { setWaitlistDone(true); setWaitlistName(""); setWaitlistEmail(""); },
  });

  // ── Lead magnet form state ───────────────────────────────────────────────
  const [leadFirstName, setLeadFirstName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadDone, setLeadDone] = useState(false);
  const leadMutation = trpc.forms.submitLeadMagnet.useMutation({
    onSuccess: () => { setLeadDone(true); setLeadFirstName(""); setLeadEmail(""); },
  });

  return (
    <div className="min-h-screen bg-[#0B1F3B] text-white font-sans selection:bg-[#d4af37] selection:text-[#0B1F3B]">

      {/* Navigation — sticky, scroll-aware */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1F3B]/90 backdrop-blur-md shadow-[0_2px_24px_rgba(0,0,0,0.4)] border-b border-white/10"
          : "bg-transparent"
      }`}>
      <nav className="container mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/hif67mmfrxXgLDxyBaPs4s/cba_logo_cropped_61583c5c.png" alt="CBA Logo" className="h-12 w-12 object-contain" />
          <span className="font-serif font-bold text-xl tracking-wide">Chronological Bible Academy</span>
        </div>
        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#framework" className="hover:text-[#d4af37] transition-colors">The Framework</a>
          <a href="#resources" className="hover:text-[#d4af37] transition-colors">Resources</a>
          <a href="#about" className="hover:text-[#d4af37] transition-colors">About</a>
          <a href="#faq" className="hover:text-[#d4af37] transition-colors">FAQ</a>
          <a href="/files" className="hover:text-[#d4af37] transition-colors">File Manager</a>
        </div>
        {/* Desktop CTA */}
        <a href="https://continuum.chronologicalbibleacademy.com" className="hidden md:inline-flex bg-[#d4af37] hover:bg-[#b5952f] text-[#0B1F3B] px-6 py-2.5 rounded-md font-bold text-sm transition-colors">
          Get The Book
        </a>
        {/* Mobile: hamburger button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-white hover:text-[#d4af37] hover:bg-white/10 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-all duration-300 md:hidden ${
          mobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#0B1F3B] border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/hif67mmfrxXgLDxyBaPs4s/cba_logo_cropped_61583c5c.png"
                alt="CBA Logo"
                className="h-9 w-9 object-contain"
              />
              <span className="font-serif font-bold text-sm tracking-wide text-white">CBA</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="flex items-center justify-center w-9 h-9 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer nav links */}
          <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
            {[
              { href: "#framework", label: "The Framework" },
              { href: "#resources", label: "Resources" },
              { href: "#about", label: "About" },
              { href: "#faq", label: "FAQ" },
              { href: "/files", label: "File Manager" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={handleNavClick}
                className="flex items-center justify-between px-4 py-3.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/8 transition-colors group"
              >
                {label}
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#d4af37] transition-opacity" />
              </a>
            ))}
          </nav>

          {/* Drawer CTA */}
          <div className="px-6 py-6 border-t border-white/10">
            <a
              href="https://continuum.chronologicalbibleacademy.com"
              onClick={handleNavClick}
              className="flex items-center justify-center gap-2 w-full bg-[#d4af37] hover:bg-[#b5952f] text-[#0B1F3B] px-6 py-3 rounded-md font-bold text-sm transition-colors shadow-[0_0_20px_rgba(212,175,55,0.25)]"
            >
              <BookOpen className="w-4 h-4" />
              Get The Book
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=2874&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3B]/50 to-[#0B1F3B]"></div>

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[#d4af37] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
            Helping New Believers &amp; Seeking Christians
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
            The Bible Finally{" "}
            <span className="text-[#d4af37] italic">Makes Sense.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Understand the Bible as one connected story through a simple, chronological framework — from Creation to Restoration.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://continuum.chronologicalbibleacademy.com" className="w-full sm:w-auto bg-[#d4af37] hover:bg-[#b5952f] text-[#0B1F3B] px-8 py-4 rounded-md font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <BookOpen className="w-5 h-5" />
              Get Book One
            </a>
            <a href="#courses" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-md font-bold text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-sm border border-white/10">
              <GraduationCap className="w-5 h-5" />
              Join Course Waitlist
            </a>
          </div>
        </div>
      </section>

      {/* The Framework Section */}
      <section id="framework" className="py-24 bg-[#0B1F3B] relative border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white">The 7-Step Continuum</h2>
            <p className="text-xl text-gray-400">
              The entire Bible follows one storyline. These seven movements show you how it all fits together — from the first page to the last.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Top Row: 4 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Creation", desc: "God creates a perfect world and places humanity at the center of His story." },
                { step: "2", title: "Rebellion", desc: "Humanity chooses its own way, and sin fractures the relationship with God." },
                { step: "3", title: "Promise", desc: "God makes unconditional promises to Abraham — a rescue plan is set in motion." },
                { step: "4", title: "People", desc: "God forms a nation, gives the Law, and walks with Israel through the Old Testament." },
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-xl border bg-white/5 border-white/10 relative overflow-hidden group hover:bg-white/10 transition-colors">
                  <div className="text-6xl font-serif font-bold opacity-10 absolute right-4 top-4 text-white">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white relative z-10">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Bottom Row: 3 Cards Centered */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:w-3/4 mx-auto">
              {[
                { step: "5", title: "KING", desc: "Jesus — the true King — fulfills every promise and defeats sin on the cross.", highlight: true },
                { step: "6", title: "Church", desc: "The Holy Spirit empowers believers to carry the gospel to the ends of the earth." },
                { step: "7", title: "Restoration", desc: "God makes all things new — the story that began in a garden ends in an eternal city." },
              ].map((item, i) => (
                <div key={i} className={`p-8 rounded-xl border ${item.highlight ? 'bg-[#d4af37]/10 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.15)]' : 'bg-white/5 border-white/10'} relative overflow-hidden group hover:bg-white/10 transition-colors`}>
                  <div className={`text-6xl font-serif font-bold opacity-10 absolute right-4 top-4 ${item.highlight ? 'text-[#d4af37]' : 'text-white'}`}>
                    {item.step}
                  </div>
                  <h4 className={`text-xl font-bold mb-3 relative z-10 ${item.highlight ? 'text-[#d4af37]' : 'text-white'}`}>{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed relative z-10">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[#071529] relative border-t border-white/10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[#d4af37] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
              What Readers Are Saying
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Lives Changed by the Framework</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "I've been a Christian for 20 years and never truly understood how the Old Testament connected to Jesus. The 7-Step Continuum changed everything for me. I finally see the whole story.",
                name: "Sarah M.",
                role: "New Believer, Texas",
                stars: 5,
              },
              {
                quote: "This is the resource I wish I had when I first started reading the Bible. Bruce has a gift for making complex theology feel simple and accessible. I've already recommended it to my entire small group.",
                name: "James T.",
                role: "Small Group Leader, Ohio",
                stars: 5,
              },
              {
                quote: "I was skeptical at first — I've tried Bible reading plans before and always gave up. But the chronological framework gave me a roadmap. For the first time, I actually finished reading through the whole Bible.",
                name: "Rachel K.",
                role: "Seeking Christian, California",
                stars: 5,
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-6 hover:bg-white/8 transition-colors"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {/* Quote */}
                <blockquote className="text-gray-300 leading-relaxed flex-1 text-[0.95rem]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                {/* Attribution */}
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-bold text-sm font-serif">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources / Pathways */}
      <section id="resources" className="py-24 bg-gray-50 text-[#0B1F3B]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Your Learning Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you want to read at your own pace or join a guided community, we have the resources to help you grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* The Book */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col">
              <div className="h-48 bg-[#0B1F3B] relative flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=2874&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="relative z-10 text-center">
                  <BookOpen className="w-12 h-12 text-[#d4af37] mx-auto mb-3" />
                  <h3 className="text-2xl font-serif font-bold text-white">The Kingdom Continuum Series</h3>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">Book One Available Now</div>
                <p className="text-gray-600 mb-6 flex-1">
                  Your launchpad into deeper study. "The Bible Finally Makes Sense" walks you through the entire Bible using the 7-Step Continuum. It's the perfect starting point for new believers.
                </p>
                <a href="https://continuum.chronologicalbibleacademy.com" className="inline-flex items-center gap-2 text-[#0B1F3B] font-bold hover:text-[#d4af37] transition-colors group">
                  Get the Book <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* The Courses */}
            <div id="courses" className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col">
              <div className="h-48 bg-[#0B1F3B] relative flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2874&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="relative z-10 text-center">
                  <Users className="w-12 h-12 text-[#d4af37] mx-auto mb-3" />
                  <h3 className="text-2xl font-serif font-bold text-white">Academy Courses</h3>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="inline-block bg-[#d4af37]/20 text-[#0B1F3B] text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">In Development</div>
                <p className="text-gray-600 mb-6 flex-1">
                  Walk through every era of Scripture with expert teaching, guided reflection, and a community of like-minded believers. From beginner foundations to advanced mastery.
                </p>

                {waitlistDone ? (
                  <div className="mt-auto flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-green-800 font-semibold text-sm">You're on the list! We'll notify you when courses launch.</p>
                  </div>
                ) : (
                  <form
                    className="mt-auto space-y-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      waitlistMutation.mutate({ fullName: waitlistName, email: waitlistEmail });
                    }}
                  >
                    <p className="text-sm font-bold text-[#0B1F3B]">Join the Waitlist:</p>
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      value={waitlistName}
                      onChange={(e) => setWaitlistName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0B1F3B] text-[#0B1F3B]"
                    />
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Email address"
                        required
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#0B1F3B] text-[#0B1F3B]"
                      />
                      <button
                        type="submit"
                        disabled={waitlistMutation.isPending}
                        className="bg-[#0B1F3B] text-white px-4 py-2 rounded-md font-bold hover:bg-[#1a365d] transition-colors disabled:opacity-60 flex items-center gap-1.5"
                      >
                        {waitlistMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        Join
                      </button>
                    </div>
                    {waitlistMutation.isError && (
                      <p className="text-red-600 text-xs">{waitlistMutation.error.message}</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet Section */}
      <section className="py-20 bg-[#0B1F3B] text-white relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=2874&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm shadow-2xl">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-48 h-64 bg-white rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.2)] border-4 border-white flex flex-col relative overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-[#0B1F3B] text-white p-3 text-center border-b-2 border-[#d4af37]">
                    <h4 className="font-serif font-bold text-sm">The 7-Step Framework</h4>
                  </div>
                  <div className="flex-1 p-4 flex flex-col gap-2 bg-gray-50">
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <div key={num} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#d4af37] text-[#0B1F3B] text-[8px] font-bold flex items-center justify-center">{num}</div>
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
                </div>
              </div>

              <div className="w-full md:w-2/3 space-y-6 text-center md:text-left">
                <div className="inline-block bg-[#d4af37]/20 text-[#d4af37] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Free Download</div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold">Get The Bible's Big Picture Guide</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Stop playing "Bible Roulette." Download this beautiful, print-ready guide to keep in your Bible. It shows you exactly how the entire story connects from Creation to Restoration across 7 Major Stages and 16 Key Movements.
                </p>
                {leadDone ? (
                  <div className="flex items-center gap-3 bg-[#d4af37]/10 border border-[#d4af37]/40 rounded-lg px-5 py-4 mt-2">
                    <CheckCircle className="w-6 h-6 text-[#d4af37] flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold">Guide on its way!</p>
                      <p className="text-gray-400 text-sm">Check your inbox — your free guide is headed to you now.</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <form
                      className="flex flex-col sm:flex-row gap-3 pt-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        leadMutation.mutate({ firstName: leadFirstName, email: leadEmail });
                      }}
                    >
                      <input
                        type="text"
                        placeholder="First name"
                        required
                        value={leadFirstName}
                        onChange={(e) => setLeadFirstName(e.target.value)}
                        className="w-full sm:w-40 px-5 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        required
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        className="flex-1 px-5 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                      />
                      <button
                        type="submit"
                        disabled={leadMutation.isPending}
                        className="bg-[#d4af37] hover:bg-[#b5952f] text-[#0B1F3B] px-6 py-3 rounded-md font-bold transition-colors shadow-lg whitespace-nowrap disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {leadMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        Send My Guide
                      </button>
                    </form>
                    {leadMutation.isError && (
                      <p className="text-red-400 text-xs mt-1">{leadMutation.error.message}</p>
                    )}
                    <p className="text-xs text-gray-500 text-center md:text-left">We respect your privacy. Unsubscribe at any time.</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Author */}
      <section id="about" className="py-24 bg-white text-[#0B1F3B] border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden border-4 border-[#d4af37] shadow-xl">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/hif67mmfrxXgLDxyBaPs4s/017-6A8W2zA1uss_92559790.jpeg"
                alt="Bruce A Mayo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-serif font-bold mb-2">Bruce A. Mayo, MTh</h2>
              <p className="text-[#d4af37] font-bold tracking-wide uppercase text-sm mb-6">Author &amp; Founder</p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                With a Master of Theology and years of teaching experience, Bruce created the Chronological Bible Academy to help new believers and seeking Christians understand the Bible as one connected story.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed italic border-l-4 border-[#d4af37] pl-4">
                "My goal isn't to give you a seminary degree. My goal is to give you the roadmap so that when you open the Bible, you actually understand what you're reading."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-[#071529] text-white border-t border-white/10">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[#d4af37] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#d4af37]"></span>
              Common Questions
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Is this for beginners?",
                a: "Absolutely. The Chronological Bible Academy was built specifically for new believers and seeking Christians who feel overwhelmed by the Bible. No seminary background required — just a desire to understand God's story.",
              },
              {
                q: "What's included in Book One?",
                a: '"The Bible Finally Makes Sense" walks you through the entire Bible using the 7-Step Continuum framework. It covers all 66 books, showing how each one fits into the larger story from Creation to Restoration. It\'s available now in digital and print formats.',
              },
              {
                q: "When do the Academy courses launch?",
                a: "Courses are currently in development. Join the waitlist above and you\'ll be the first to know when enrollment opens — including any early-bird pricing available exclusively to waitlist members.",
              },
              {
                q: "How is this different from a Bible reading plan?",
                a: "Most reading plans give you a schedule but no roadmap. The 7-Step Continuum gives you the big picture first — so when you read any passage, you already know where it fits in the story. It\'s the difference between reading a map and wandering through a forest.",
              },
              {
                q: "What is the 7-Step Continuum?",
                a: "It\'s the framework at the heart of everything we teach. The entire Bible follows one storyline across seven movements: Creation, Rebellion, Promise, People, King, Church, and Restoration. Once you see it, you can\'t unsee it — and every passage suddenly makes sense.",
              },
              {
                q: "Is the free guide really free?",
                a: "Yes, completely. Enter your first name and email above and we\'ll send you the full print-ready Big Picture Guide at no cost. No credit card, no catch.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left bg-white/5 hover:bg-white/8 transition-colors group"
                >
                  <span className="font-semibold text-white group-hover:text-[#d4af37] transition-colors pr-4">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#d4af37] flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === i ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="px-6 py-5 text-gray-400 leading-relaxed border-t border-white/10">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1F3B] text-white py-12 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/hif67mmfrxXgLDxyBaPs4s/cba_logo_cropped_61583c5c.png" alt="CBA Logo" className="h-12 w-12 opacity-50 object-contain" />
          </div>
          <p className="text-gray-400 mb-4">© {new Date().getFullYear()} Chronological Bible Academy. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
