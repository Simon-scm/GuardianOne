'use client';

import { Lock, Shield, Bot } from 'lucide-react';

const solutions = [
  {
    icon: Lock,
    title: 'Privacy-first AI',
    description: 'No tracking. No data sharing. On-device intelligence.',
  },
  {
    icon: Shield,
    title: 'Independent by design',
    description: 'Our business model works for users — not advertisers or platforms.',
  },
  {
    icon: Bot,
    title: 'Your personal security agent',
    description: 'A transparent, explainable AI that operates solely in your interest.',
  },
];

export default function SolutionSection() {
  return (
    <section id="solution-section" className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 -mt-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                className="flex flex-col bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full"
              >
                <div className="mb-4 p-3 rounded-full bg-primary-50 text-primary-600 w-fit">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {solution.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {solution.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

