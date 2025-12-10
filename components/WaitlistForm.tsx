'use client';

import { useState } from 'react';
import UsageTypeModal from './UsageTypeModal';

interface WaitlistFormProps {
  buttonText?: string;
  className?: string;
}

export default function WaitlistForm({ 
  buttonText = 'Join Waitlist',
  className = '' 
}: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showUsageModal, setShowUsageModal] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }

    if (!validateEmail(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmittedEmail(email.trim());
      setEmail('');
      setShowUsageModal(true);
      setMessage({ type: 'success', text: 'Thank you! We\'ll be in touch soon.' });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to join waitlist. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900 placeholder-gray-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isLoading ? 'Joining...' : buttonText}
        </button>
      </div>
      {message && (
        <p
          className={`mt-3 text-sm text-center ${
            message.type === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message.text}
        </p>
      )}
      <UsageTypeModal
        isOpen={showUsageModal}
        onClose={() => setShowUsageModal(false)}
        email={submittedEmail}
        onSuccess={() => {
          setMessage({ type: 'success', text: 'Thank you! We\'ll be in touch soon.' });
        }}
      />
    </form>
  );
}

