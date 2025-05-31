import React, { useState } from 'react';
import { CheckCircle, Heart, Brain, Users, Mail, Sparkles } from 'lucide-react';

export default function MemulioWaitlist() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    signupFor: '',
    describes: '',
    earlyAccess: false,
    struggle: '',
    updates: true
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.signupFor) {
      newErrors.signupFor = 'Please select an option';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send data to your API
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-orange-500 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">You're on the list! 🎉</h2>
          <p className="text-gray-600 mb-6">
            Thank you for joining Memulio! We'll notify you the moment we're ready to help you or your loved ones.
          </p>
          <div className="bg-gradient-to-r from-purple-100 to-orange-100 rounded-2xl p-4">
            <p className="text-sm text-gray-700">
              Keep an eye on your inbox for updates and early access opportunities.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-orange-500 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-6 transform hover:scale-110 transition-transform duration-300">
            <Brain className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            Welcome to <span className="bg-gradient-to-r from-orange-300 to-yellow-300 bg-clip-text text-transparent">Memulio</span>
          </h1>
          <p className="text-xl text-purple-100 mb-2">Memory support that grows with you</p>
          <div className="flex items-center justify-center space-x-2 text-orange-200">
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="text-lg">Be among the first to experience the future of memory care</span>
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 backdrop-blur-sm">
          <div className="space-y-8">
            {/* Full Name */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                What's your name? <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-6 py-4 text-lg border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all transform hover:scale-105 ${
                  errors.fullName ? 'border-red-500 shake' : 'border-gray-200 focus:border-purple-500'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-2 animate-pulse">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Email Address <span className="text-red-500">*</span>
              </label>
              <p className="text-gray-600 mb-3 flex items-center">
                {/* <Mail className="w-4 h-4 mr-2 text-purple-500" /> */}
                We'll let you know the moment Memulio is ready.
              </p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-6 py-4 text-lg border-2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 transition-all transform hover:scale-105 ${
                  errors.email ? 'border-red-500' : 'border-gray-200 focus:border-purple-500'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-2 animate-pulse">{errors.email}</p>}
            </div>

            {/* Signup For */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Are you signing up for yourself or someone else? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Myself', 'For a parent/grandparent', 'For someone I care for', 'Just curious'].map((option) => (
                  <label key={option} className="flex items-center p-4 border-2 rounded-2xl cursor-pointer hover:bg-purple-50 transition-all transform hover:scale-105 hover:shadow-lg">
                    <input
                      type="radio"
                      name="signupFor"
                      value={option}
                      checked={formData.signupFor === option}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-purple-600 mr-3"
                    />
                    <span className="text-gray-700 font-medium">{option}</span>
                  </label>
                ))}
              </div>
              {errors.signupFor && <p className="text-red-500 text-sm mt-2 animate-pulse">{errors.signupFor}</p>}
            </div>

            {/* What describes you */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                What best describes you?
              </label>
              <p className="text-gray-600 mb-3">So we can tailor the experience...</p>
              <select
                name="describes"
                value={formData.describes}
                onChange={handleInputChange}
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all hover:scale-105"
              >
                <option value="">Select an option (optional)</option>
                <option value="Adult managing your memory">Adult managing your memory</option>
                <option value="Senior looking to stay independent">Senior looking to stay independent</option>
                <option value="Family member">Family member (e.g., child/grandchild)</option>
                <option value="Caregiver or nurse">Caregiver or nurse</option>
                <option value="Healthcare provider">Healthcare provider</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Early Access */}
            <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
              <label className="flex items-start space-x-4 cursor-pointer">
                <input
                  type="checkbox"
                  name="earlyAccess"
                  checked={formData.earlyAccess}
                  onChange={handleInputChange}
                  className="w-6 h-6 text-purple-600 rounded mt-1"
                />
                <div>
                  <span className="text-lg font-semibold text-gray-800 flex items-center">
                    {/* <Users className="w-5 h-5 mr-2 text-orange-500" /> */}
                    Would you like early access to FamilyLink?
                  </span>
                  <p className="text-gray-600 mt-1">Our family collaboration feature that lets trusted family members help manage calendars, set reminders, update medication schedules, and stay connected with your loved one's daily needs.</p>
                </div>
              </label>
            </div>

            {/* Struggle */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                What's one thing you or your loved one struggles to remember?
              </label>
              <p className="text-gray-600 mb-3">Birthdays? Meds? Names? Tell us (optional)</p>
              <textarea
                name="struggle"
                value={formData.struggle}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all resize-none hover:scale-105"
                placeholder="Share what you'd like help remembering..."
              />
            </div>

            {/* Updates */}
            <div className="bg-gradient-to-r from-purple-50 to-orange-50 rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
              <label className="flex items-start space-x-4 cursor-pointer">
                <input
                  type="checkbox"
                  name="updates"
                  checked={formData.updates}
                  onChange={handleInputChange}
                  className="w-6 h-6 text-purple-600 rounded mt-1"
                />
                <div>
                  <span className="text-lg font-semibold text-gray-800 flex items-center">
                    {/* <Heart className="w-5 h-5 mr-2 text-red-500 animate-pulse" /> */}
                    Would you like to get updates about our launch and features?
                  </span>
                  <p className="text-gray-600 mt-1">Yes, send me Memulio updates</p>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 text-white font-bold py-6 px-8 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 active:scale-95"
            >
              <span>Join the Waitlist</span>
              <Sparkles className="w-6 h-6 animate-spin" />
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 flex items-center justify-center">
              🔒 Your information is safe with us. We'll never share your details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}