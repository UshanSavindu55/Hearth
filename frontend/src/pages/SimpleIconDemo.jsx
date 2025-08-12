import React, { useState } from 'react';
import { MdEmail, MdLock, MdSearch, MdPerson, MdPhone } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { Input, Card } from '../components/common';

const SimpleIconDemo = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    search: '',
    name: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
            Simple Input with Icons
          </h1>
          <p className="text-slate-400 text-lg">
            Just add an icon prop to display an icon in your input
          </p>
        </div>

        <Card className="p-8 bg-slate-800/60 backdrop-blur-xl border border-slate-700/50">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-6">Example Form</h2>
            
            <Input
              label="Search"
              name="search"
              placeholder="Search for anything..."
              icon={<MdSearch className="w-5 h-5" />}
              value={formData.search}
              onChange={handleChange}
              className="bg-white text-slate-700 placeholder-slate-400"
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              icon={<MdEmail className="w-5 h-5" />}
              value={formData.email}
              onChange={handleChange}
              className="bg-white text-slate-700 placeholder-slate-400"
            />

            <Input
              label="Full Name"
              name="name"
              placeholder="Enter your name"
              icon={<FaUser className="w-4 h-4" />}
              value={formData.name}
              onChange={handleChange}
              className="bg-white text-slate-700 placeholder-slate-400"
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="(555) 123-4567"
              icon={<MdPhone className="w-5 h-5" />}
              value={formData.phone}
              onChange={handleChange}
              className="bg-white text-slate-700 placeholder-slate-400"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              icon={<MdLock className="w-5 h-5" />}
              value={formData.password}
              onChange={handleChange}
              className="bg-white text-slate-700 placeholder-slate-400"
            />

            <Input
              label="Input without Icon"
              name="noicon"
              placeholder="This input has no icon"
              className="bg-white text-slate-700 placeholder-slate-400"
            />
          </div>

          {/* Code Example */}
          <div className="mt-8 pt-6 border-t border-slate-600">
            <h3 className="text-lg font-semibold text-white mb-4">Usage</h3>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <pre className="text-slate-300 text-sm overflow-x-auto">
{`import { MdEmail, MdLock } from 'react-icons/md';
import { Input } from '../components/common';

// Simple usage - just add icon prop
<Input 
  label="Email" 
  icon={<MdEmail className="w-5 h-5" />}
  placeholder="Enter email" 
/>

<Input 
  label="Password" 
  type="password"
  icon={<MdLock className="w-5 h-5" />}
  placeholder="Enter password" 
/>`}
              </pre>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SimpleIconDemo;
