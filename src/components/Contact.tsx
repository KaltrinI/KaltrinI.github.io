import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const Contact: React.FC = () => {

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.error('Execute recaptcha not available');
      return;
    }

    // Execute the recaptcha with an action, e.g., 'contact_form'
    const token = await executeRecaptcha('contact_form');
    console.log('Recaptcha token:', token);

    // Now, include the token in your submission payload to verify on the server
    // Example:
    /*
    const response = await fetch('/api/verify-captcha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, ...formData }),
    });
    const data = await response.json();
    if (data.success) {
      // Proceed with further submission logic...
    } else {
      alert('Captcha verification failed. Please try again.');
    }
    */

    // For now, we simply log the token and the form data.
    console.log('Form data:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <section id="contact" className="py-12">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">Contact Me</h2>
        <p className="text-lg mb-8">Feel free to reach out to me for collaboration, questions, or opportunities!</p>
        <form className="space-y-6 max-w-lg mx-auto" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-left">Name</label>
            <input type="text" id="name" name="name" required className="w-full p-3 border border-gray-300 rounded-lg" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email" className="block text-left">Email</label>
            <input type="email" id="email" name="email" required className="w-full p-3 border border-gray-300 rounded-lg" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="message" className="block text-left">Message</label>
            <textarea id="message" name="message" rows={4} required className="w-full p-3 border border-gray-300 rounded-lg" onChange={handleChange}></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-700 text-white p-3 rounded-lg hover:bg-blue-800">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
