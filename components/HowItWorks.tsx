'use client';

import { Search, Brain, Eye } from 'lucide-react';

const steps = [
  {
    number: '1',
    icon: Search,
    title: 'Local Analysis',
    description: 'GuardianOne analyzes links, pages, and content directly on your device.',
  },
  {
    number: '2',
    icon: Brain,
    title: 'Intelligence Layer',
    description: 'AI models detect threats, scams, and manipulation attempts.',
  },
  {
    number: '3',
    icon: Eye,
    title: 'Transparent Decisions',
    description: 'Every alert is explainable. No black-box behavior.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works-section" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col items-center text-center"
              >
                <div className="mb-6 relative">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xl">
                    {step.number}
                  </div>
                  <div className="absolute -top-2 -right-2 p-2 rounded-full bg-white border-2 border-primary-100">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

