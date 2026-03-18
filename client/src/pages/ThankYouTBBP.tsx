/**
 * Thank-You page for "The Bible's Big Picture Guide" lead magnet.
 * Route: /ty-tbbp
 *
 * Shown after a visitor submits the lead magnet form.
 * Confirms delivery, provides a direct PDF download, and presents
 * the Book One upsell with a SamCart slide-in checkout.
 */

import { BookOpen, Download, ArrowRight, CheckCircle2, Star } from "lucide-react";
import { useEffect } from "react";

const GUIDE_PDF_URL =
  "https://assets.cdn.filesafe.space/3D7QNFhkh5INfr6IVK5T/media/69ba2374ad027630ca652157.pdf";

const SAMCART_SLIDE_SCRIPT =
  "https://static.samcart.com/checkouts/sc-slide-script.js";

const SAMCART_CHECKOUT_URL =
  "https://continuum.chronologicalbibleacademy.com/#samcart-slide-open-right";

const NEXT_STEPS = [
  {
    step: "1",
    title: "Download Your Free Guide",
    description:
      `Click the button above to open "The Bible's Big Picture Guide" as a PDF. You can read it on any device or print it for easy reference.`,
  },
  {
    step: "2",
    title: "Check Your Inbox",
    description:
      "We've also sent the guide to your email so you'll always have it handy. Check your spam folder if you don't see it within a few minutes.",
  },
  {
    step: "3",
    title: "Start with the 7-Step Continuum",
    description:
      "The guide walks you through the entire Bible as one connected story. Begin with the overview on page one and let the big picture come into focus.",
  },
];

const BOOK_FEATURES = [
  "Instant Ebook Access (PDF, ePub, & SeekDocs)",
  "Bonus: Chronological Reading Plan",
  `Bonus: "Bible's Big Picture" Guide`,
];

export default function ThankYouTBBP() {
  // Load the SamCart slide-in checkout script once on mount
  useEffect(() => {
    if (document.querySelector(`script[src="${SAMCART_SLIDE_SCRIPT}"]`)) return;
    const script = document.createElement("script");
    script.src = SAMCART_SLIDE_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      // Leave the script in place — removing it mid-session breaks the overlay
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1F3B] text-white font-sans selection:bg-[#d4af37] selection:text-[#0B1F3B]">

      {/* Minimal nav */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="container mx-auto flex items-center gap-3">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663047046836/hif67mmfrxXgLDxyBaPs4s/cba_logo_cropped_61583c5c.png"
            alt="CBA Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="font-serif font-bold text-lg tracking-wide">
            Chronological Bible Academy
          </span>
        </div>
      </header>

      {/* Hero confirmation */}
      <section className="py-20 px-6 text-center">
        <div className="container mx-auto max-w-2xl">

          {/* Success badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-sm font-medium text-[#d4af37] mb-8">
            <CheckCircle2 className="w-4 h-4" />
            You're all set!
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">
            Your Free Guide Is{" "}
            <span className="text-[#d4af37] italic">Ready</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Thank you for requesting{" "}
            <strong className="text-white">
              "The Bible's Big Picture Guide."
            </strong>{" "}
            Click below to download your copy and start seeing the Bible as one
            connected story.
          </p>

          {/* Primary CTA */}
          <a
            href={GUIDE_PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#d4af37] hover:bg-[#b5952f] text-[#0B1F3B] px-10 py-4 rounded-md font-bold text-lg transition-colors shadow-[0_0_32px_rgba(212,175,55,0.25)] hover:shadow-[0_0_48px_rgba(212,175,55,0.4)] mb-4"
          >
            <Download className="w-5 h-5" />
            Download the Guide (PDF)
          </a>

          <p className="text-gray-500 text-sm">
            Opens in a new tab · No account required
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/10 mx-6 md:mx-auto md:max-w-3xl" />

      {/* Next steps */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-12">
            Here's What to Do Next
          </h2>

          <div className="space-y-6">
            {NEXT_STEPS.map(({ step, title, description }) => (
              <div
                key={step}
                className="flex gap-5 p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#d4af37]/30 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center font-serif font-bold text-[#d4af37] text-lg">
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg mb-1">{title}</h3>
                  <p className="text-gray-400 leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/10 mx-6 md:mx-auto md:max-w-3xl" />

      {/* Upsell — Book One with SamCart slide-in */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">

          {/* Section label */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-sm font-medium text-[#d4af37]">
              <Star className="w-3.5 h-3.5 fill-[#d4af37]" />
              For New Christians Seeking Clarity
            </div>
          </div>

          {/* Headline — mirrored from continuum.chronologicalbibleacademy.com */}
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-center leading-tight mb-4">
            The Bible Finally{" "}
            <span className="text-[#d4af37] italic">Makes Sense</span>
          </h2>

          <p className="text-gray-300 text-lg text-center leading-relaxed mb-10 max-w-2xl mx-auto">
            A New Christian's Guide to Understanding the Bible as One Connected
            Story — Using a Simple Chronological Study System.
          </p>

          {/* Offer card */}
          <div className="rounded-2xl border border-[#d4af37]/30 bg-white/5 overflow-hidden">
            {/* Card header */}
            <div className="bg-[#d4af37]/10 border-b border-[#d4af37]/20 px-8 py-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                Special Offer
              </span>
            </div>

            <div className="px-8 py-10 md:flex md:items-center md:gap-10">
              {/* Book details */}
              <div className="flex-1 mb-8 md:mb-0">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-5 h-5 text-[#d4af37]" />
                  <span className="font-serif font-bold text-xl text-white">
                    The Bible Finally Makes Sense
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-5">
                  The complete guide to seeing Scripture as one connected story.
                </p>
                <ul className="space-y-2">
                  {BOOK_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-[#d4af37] mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price + CTA */}
              <div className="text-center md:text-right flex-shrink-0">
                <div className="text-4xl font-bold text-white mb-1">$27.00</div>
                <p className="text-gray-500 text-xs mb-5">One-time payment</p>

                {/* SamCart slide-in trigger — href must contain #samcart-slide-open-right */}
                <a
                  href={SAMCART_CHECKOUT_URL}
                  className="inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#b5952f] text-[#0B1F3B] px-8 py-3 rounded-md font-bold text-base transition-colors shadow-[0_0_24px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.35)]"
                >
                  Get Instant Access
                  <ArrowRight className="w-4 h-4" />
                </a>

                <p className="text-gray-500 text-xs mt-3">
                  30-Day Money-Back Guarantee
                </p>
              </div>
            </div>
          </div>

          {/* Guarantee note */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Read it for 30 days. If you don't feel more confident in your
            understanding of Scripture, simply email for a full refund — and
            keep the book.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center">
        <div className="container mx-auto">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Chronological Bible Academy. All rights reserved.
          </p>
          <a
            href="/"
            className="text-gray-500 hover:text-[#d4af37] text-sm transition-colors mt-2 inline-block"
          >
            ← Back to Home
          </a>
        </div>
      </footer>

    </div>
  );
}
