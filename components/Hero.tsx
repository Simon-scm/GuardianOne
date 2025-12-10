'use client';

import WaitlistForm from './WaitlistForm';

export default function Hero() {
  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 -z-10" />
      
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Your Personal Security AI.
          <br />
          <span className="text-gray-600">100% Privacy. Zero Tracking. Always on your side.</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          An independent, privacy-first AI that protects you — not corporations, not BigTech.
        </p>
        
        <WaitlistForm buttonText="Join Waitlist" />
      </div>
    </section>
  );
}

