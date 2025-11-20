/**
 * LeadForm component - Captures user contact information
 * Integrates with backend API to create Brevo CRM contacts and send emails
 */

import { useState, FormEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface FormStatus {
  loading: boolean;
  success: string | null;
  error: string | null;
}

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<FormStatus>({
    loading: false,
    success: null,
    error: null,
  });

  const { toast } = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      // Dynamic import to avoid bundling server-side code
      const { processLead } = await import('@/api/order');
      const result = await processLead(formData);

      if (result.success) {
        setStatus({
          loading: false,
          success: 'Thank you! Your details have been received.',
          error: null,
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
        });

        toast({
          title: 'Success!',
          description: 'Your details have been received. We\'ll be in touch soon.',
        });
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      const errorMessage = 'Failed to submit. Please try again.';
      setStatus({ loading: false, success: null, error: errorMessage });

      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-100"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 font-['Oswald']">
        Get in Touch
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            className="block text-sm font-medium mb-2 text-gray-700"
            htmlFor="firstName"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2 text-gray-700"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium mb-2 text-gray-700"
          htmlFor="email"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-sm font-medium mb-2 text-gray-700"
          htmlFor="phone"
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <div className="mb-6">
        <label
          className="block text-sm font-medium mb-2 text-gray-700"
          htmlFor="message"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={status.loading}
        className="w-full py-3 text-lg font-semibold"
        size="lg"
      >
        {status.loading ? 'Submitting...' : 'Submit'}
      </Button>

      {status.success && (
        <p className="mt-4 text-green-600 text-center font-medium">
          {status.success}
        </p>
      )}

      {status.error && (
        <p className="mt-4 text-red-600 text-center font-medium">
          {status.error}
        </p>
      )}
    </form>
  );
}
