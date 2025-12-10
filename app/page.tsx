'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import HowItWorks from '@/components/HowItWorks';
import PhilosophySection from '@/components/PhilosophySection';
import WaitlistForm from '@/components/WaitlistForm';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-0">
        <ProblemSection />
        <SolutionSection />
      </div>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center">
          <HowItWorks />
        </div>
        <div className="flex-1 flex items-center">
          <PhilosophySection />
        </div>
      </div>
      <section
        id="waitlist-section"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Join Waitlist
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Be among the first to experience privacy-first security AI.
          </p>
          <WaitlistForm buttonText="Join Waitlist" />
        </div>
      </section>
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600 text-sm">
            Contact: <a href="mailto:contact@guardianone.dev" className="text-gray-900 hover:text-gray-700 underline">contact@guardianone.dev</a>
          </p>
        </div>
      </footer>
    </main>
  );
}

