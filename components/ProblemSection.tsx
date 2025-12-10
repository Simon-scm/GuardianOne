'use client';

import { ShieldAlert, Eye, UserX } from 'lucide-react';

const problems = [
  {
    icon: ShieldAlert,
    text: 'AI-powered phishing & social engineering are rising.',
  },
  {
    icon: Eye,
    text: 'BigTech tracks everything you do online.',
  },
  {
    icon: UserX,
    text: 'Most users navigate the digital world unprotected.',
  },
];

export default function ProblemSection() {
  return (
    <section id="problem-section" className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-8 rounded-lg bg-gray-900 text-white h-full"
              >
                <div className="mb-4 p-3 rounded-full bg-red-500/20 text-red-400">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-white text-lg font-medium">{problem.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

