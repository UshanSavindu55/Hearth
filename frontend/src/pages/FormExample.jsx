import React, { useState } from 'react';
import { Button, Input, Textarea, Dropdown, Card, Label } from '../components/common';

const FormExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
    newsletter: false
  });

  const categoryOptions = [
    { value: 'support', label: 'Support' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'bug', label: 'Bug Report' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
            Contact Form Example
          </h1>
          <p className="text-slate-400">
            Demonstrating Label component integration with form inputs
          </p>
        </div>

        <Card className="p-8 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field with Input component that includes Label */}
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400"
              labelVariant="default"
            />

            {/* Email Field */}
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400"
              labelVariant="accent"
            />

            {/* Category Dropdown */}
            <Dropdown
              label="Category"
              options={categoryOptions}
              value={formData.category}
              onChange={(e) => handleChange(e)}
              required
              placeholder="Select a category"
              className="bg-slate-700/50 border-slate-600/50 text-white"
              labelVariant="default"
            />

            {/* Message Textarea */}
            <Textarea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Enter your message here..."
              className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400"
              labelVariant="default"
            />

            {/* Newsletter Checkbox with standalone Label */}
            <div className="flex items-center space-x-3">
              <input
                id="newsletter"
                name="newsletter"
                type="checkbox"
                checked={formData.newsletter}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-600 bg-slate-700/50 rounded"
              />
              <Label htmlFor="newsletter" variant="light">
                Subscribe to our newsletter for mental health tips
              </Label>
            </div>

            {/* Additional Information Section */}
            <div className="border-t border-slate-600 pt-6">
              <Label size="lg" variant="accent" className="mb-4">
                Additional Information
              </Label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" variant="muted" size="sm">
                    Phone Number (Optional)
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="mt-1 bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400"
                  />
                </div>
                
                <div>
                  <Label htmlFor="referral" variant="muted" size="sm">
                    How did you hear about us?
                  </Label>
                  <Input
                    id="referral"
                    name="referral"
                    placeholder="Search engine, friend, etc."
                    className="mt-1 bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
              >
                Send Message
              </Button>
            </div>
          </form>

          {/* Label Usage Guide */}
          <div className="mt-8 pt-6 border-t border-slate-600">
            <Label size="md" variant="accent" className="mb-3">
              Label Component Features:
            </Label>
            <ul className="text-slate-300 text-sm space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                Automatic required indicator (*) when required=true
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                Multiple size variants (xs, sm, md, lg, xl)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                Color variants for different states and themes
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                Disabled state support with reduced opacity
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                Consistent styling across all form components
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FormExample;
