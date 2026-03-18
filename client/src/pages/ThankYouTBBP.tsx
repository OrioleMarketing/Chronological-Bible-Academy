/**
 * Thank-You page for "The Bible's Big Picture Guide" lead magnet.
 * Route: /ty-tbbp
 *
 * Shown after a visitor submits the lead magnet form.
 * Confirms delivery and provides a direct download link to the PDF.
 */

import { BookOpen, Download, ArrowRight, CheckCircle2 } from "lucide-react";

const GUIDE_PDF_URL =
  "https://assets.cdn.filesafe.space/3D7QNFhkh5INfr6IVK5T/media/69ba2374ad027630ca652157.pdf";

const NEXT_STEPS = [
  {
    step: "1",
    title: "Download Your Free Guide",
    description:
      'Click the button below to open "The Bible\'s Big Picture Guide" as a PDF. You can read it on any device or print it for easy reference.',
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

export default function ThankYouTBBP() {
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

      {/* Upsell — Book One */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <BookOpen className="w-10 h-10 text-[#d4af37] mx-auto mb-5 opacity-80" />
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
            Ready to Go Deeper?
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-lg mx-auto">
            The guide gives you the big picture. <strong className="text-white">Book One</strong> walks you
            through every chapter of the Bible using the same 7-Step Continuum
            framework — so the whole story finally clicks into place.
          </p>
          <a
            href="https://continuum.chronologicalbibleacademy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-transparent border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0B1F3B] px-8 py-3 rounded-md font-bold transition-colors"
          >
            Get Book One
            <ArrowRight className="w-4 h-4" />
          </a>
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
