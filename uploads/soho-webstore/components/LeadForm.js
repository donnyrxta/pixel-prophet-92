import { useState } from 'react';

/**
 * LeadForm component renders a form to capture user information such as
 * name, email, phone and message. On submission the form data is sent
 * to `/api/lead` which integrates with Brevo to create a contact and
 * trigger acknowledgement emails. Provide validation feedback and
 * display a success message when the form is successfully submitted.
 */
export default function LeadForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setStatus({ loading: false, success: 'Thank you! Your details have been received.', error: null });
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      setStatus({ loading: false, success: null, error: 'Failed to submit. Please try again.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow-md text-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Get in touch</h2>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1" htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1" htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <label className="block text-sm font-medium mt-4 mb-1" htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="block text-sm font-medium mt-4 mb-1" htmlFor="phone">Phone</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label className="block text-sm font-medium mt-4 mb-1" htmlFor="message">Message</label>
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows="4"
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={status.loading}
        className="mt-6 w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {status.loading ? 'Submitting...' : 'Submit'}
      </button>
      {status.success && <p className="mt-4 text-green-600 text-center">{status.success}</p>}
      {status.error && <p className="mt-4 text-red-600 text-center">{status.error}</p>}
    </form>
  );
}
