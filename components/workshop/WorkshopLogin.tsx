/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { LockKeyhole, Eye, EyeOff, ShieldCheck, Calendar, Clock, ImageIcon } from 'lucide-react';

interface WorkshopLoginProps {
  onSuccess: () => void;
  workshopTitle?: string;
  workshopDate?: string;
  workshopTime?: string;
  agendaItems?: string[];
  featuredImage?: string | null;
}

const WorkshopLogin = ({ 
  onSuccess, 
  workshopTitle = 'Workshop',
  workshopDate = 'Date TBD',
  workshopTime = 'Time TBD',
  agendaItems = [],
  featuredImage = null
}: WorkshopLoginProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  console.log('🔍 [Login] FeaturedImage received:', featuredImage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/verify-workshop-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        {/* Workshop Featured Image - Using regular img tag */}
        <div className="text-center mb-4">
          <div className="flex justify-center mb-3">
            {featuredImage ? (
              <div className="relative w-full max-w-xs h-36 rounded-xl overflow-hidden shadow-lg bg-gray-100">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
                    <ImageIcon className="w-10 h-10 text-gray-300" />
                  </div>
                )}
                <img
                  src={featuredImage}
                  alt={workshopTitle}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  onLoad={() => {
                    console.log('✅ [Login] Image loaded successfully');
                    setImageLoading(false);
                  }}
                  onError={() => {
                    console.error('❌ [Login] Image failed to load');
                    setImageLoading(false);
                  }}
                />
              </div>
            ) : (
              <div className="w-full max-w-xs h-36 bg-gradient-to-r from-purple-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl font-bold">📅</span>
              </div>
            )}
          </div>
          <h1 className="text-xl font-bold text-gray-800">Workshop Access</h1>
          <p className="text-gray-600 text-xs mt-0.5">
            Enter the password to access the workshop
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-full bg-purple-100">
              <LockKeyhole className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-gray-600">
              Password Protected
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
                Workshop Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter workshop password"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                    error ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all`}
                  disabled={isLoading}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !password.trim()}
              className={`w-full py-2.5 px-4 rounded-xl font-semibold text-white text-sm transition-all cursor-pointer ${
                isLoading || !password.trim()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-orange-500 hover:opacity-90 transform hover:scale-[1.02]'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Verifying...
                </span>
              ) : (
                'Access Workshop'
              )}
            </button>
          </form>

          {agendaItems.length > 0 && (
            <div className="mt-4 bg-white/80 backdrop-blur-sm rounded-xl p-3 text-left border border-purple-100 shadow-sm">
              <p className="text-xs font-semibold text-purple-700 mb-1.5 flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                Today&apos;s Agenda
              </p>
              <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                {agendaItems.map((item, index) => (
                  <li key={index} className="text-xs">{item}</li>
                ))}
              </ul>
              <div className="mt-1.5 flex items-center gap-2 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                <span>{workshopTime}</span>
              </div>
            </div>
          )}

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              This workshop is for registered participants only.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Need help? Contact{' '}
              <a href="mailto:info@acop.co.ke" className="text-purple-600 hover:underline cursor-pointer">
                info@acop.co.ke
              </a>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="w-3 h-3 text-green-500" />
            <span>Secure &amp; Encrypted Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopLogin;