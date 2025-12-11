'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface UsageTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onSuccess?: () => void;
}

export default function UsageTypeModal({
  isOpen,
  onClose,
  email,
  onSuccess,
}: UsageTypeModalProps) {
  const [selectedType, setSelectedType] = useState<'private' | 'business' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!selectedType) {
      onClose();
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          usageType: selectedType,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update usage type');
      }

      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      console.error('Error updating usage type:', error);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Tell us more (optional)
        </h3>
        <p className="text-gray-600 mb-6 text-sm">
          How do you plan to use GuardianOne?
        </p>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => setSelectedType('private')}
            disabled={isSubmitting}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              selectedType === 'private'
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <div className="font-medium text-gray-900">Private Use</div>
            <div className="text-sm text-gray-600 mt-1">
              For personal security and privacy
            </div>
          </button>

          <button
            onClick={() => setSelectedType('business')}
            disabled={isSubmitting}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              selectedType === 'business'
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <div className="font-medium text-gray-900">Business Use</div>
            <div className="text-sm text-gray-600 mt-1">
              For company or organizational use
            </div>
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedType}
            className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}

