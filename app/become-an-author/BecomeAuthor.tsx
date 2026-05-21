// app/signup/page.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  User, Mail, Lock, Eye, EyeOff, ArrowRight, 
  Check, X, AlertCircle, Phone, Globe, Twitter, 
  Facebook, Linkedin, Instagram, Youtube, Share2, Sparkles,
  Loader2, LogIn, Award, BookOpen, Users, TrendingUp
} from 'lucide-react';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const errorRef = useRef<HTMLDivElement>(null);
  
  // Form fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    phone: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    youtube: '',
    website: '',
  });

  // Password strength
  const [passwordStrength, setPasswordStrength] = useState({
    hasLength: false,
    hasNumber: false,
    hasUpper: false,
    hasLower: false,
    hasSpecial: false,
  });

  // Scroll to error when it appears
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [error]);

  // Countdown timer for modal
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccessModal && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (showSuccessModal && countdown === 0) {
      window.location.href = 'https://cms.acop.co.ke/wp-login.php?itsec-hb-token=acopcmsportalcollege';
    }
    return () => clearTimeout(timer);
  }, [showSuccessModal, countdown]);

  const checkPasswordStrength = (password: string) => {
    setPasswordStrength({
      hasLength: password.length >= 8,
      hasNumber: /[0-9]/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({ ...formData, password: newPassword });
    checkPasswordStrength(newPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const submitData = {
      username: formData.username,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      phone: formData.phone,
      bio: formData.bio,
      twitter: formData.twitter,
      facebook: formData.facebook,
      linkedin: formData.linkedin,
      instagram: formData.instagram,
      youtube: formData.youtube,
      website: formData.website,
    };

    try {
      const response = await fetch('https://cms.acop.co.ke/wp-json/wp/v2/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.status === 200 && data.success === true) {
        setSuccess('Account created successfully!');
        setShowSuccessModal(true);
      } else {
        setError(data.message || data.data?.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Unable to connect. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    const score = Object.values(passwordStrength).filter(Boolean).length;
    if (score <= 2) return 'bg-red-500';
    if (score <= 3) return 'bg-yellow-500';
    if (score <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    const score = Object.values(passwordStrength).filter(Boolean).length;
    if (score <= 2) return 'Weak';
    if (score <= 3) return 'Fair';
    if (score <= 4) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Account Created! 🎉</h3>
            <p className="text-gray-600 mb-4">
              Your author account has been created successfully.
            </p>
            <div className="bg-orange-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                Redirecting you to the login page in <span className="font-bold text-orange-600">{countdown}</span> seconds...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div 
                  className="bg-gradient-to-r from-orange-600 to-purple-600 h-1.5 rounded-full transition-all duration-1000"
                  style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => {
                window.location.href = 'https://cms.acop.co.ke/wp-login.php?itsec-hb-token=acopcmsportalcollege';
              }}
              className="w-full bg-gradient-to-r from-orange-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-orange-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              Login Now
            </button>
          </div>
        </div>
      )}

    {/* Hero Section */}
<div className="relative bg-gradient-to-r from-orange-600 to-purple-700 overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/authorpage.png"
      alt="Writers and authors collaborating in a modern library space"
      fill
      className="object-cover"
      priority
    />
  </div>
  
  {/* Dark Gradient Overlay for text readability */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-purple-900/70 z-10"></div>
  
  {/* Animated shapes */}
  <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse z-10"></div>
  <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-1000 z-10"></div>
  
  <div className="container mx-auto px-4 py-20 md:py-28 relative z-20">
    <div className="max-w-4xl mx-auto text-center text-white">
      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-medium">Join Our Community</span>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        Become an Author
      </h1>
      <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
        Share your expertise, inspire others, and grow your professional network with Africana College
      </p>
      
      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-8 mt-8">
        <div className="text-center">
          <div className="text-2xl font-bold">50+</div>
          <div className="text-sm text-white/80">Active Authors</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">200+</div>
          <div className="text-sm text-white/80">Published Articles</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">10K+</div>
          <div className="text-sm text-white/80">Monthly Readers</div>
        </div>
      </div>
    </div>
  </div>
  
  {/* Bottom wave */}
  <div className="absolute bottom-0 left-0 right-0 z-10">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-12 text-white fill-current">
      <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
    </svg>
  </div>
</div>

      {/* Benefits Section */}
      <div className="bg-white py-8 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center gap-3 text-gray-600">
              <Award className="w-5 h-5 text-orange-500" />
              <span className="text-sm">Professional Recognition</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Users className="w-5 h-5 text-orange-500" />
              <span className="text-sm">Network with Experts</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <BookOpen className="w-5 h-5 text-orange-500" />
              <span className="text-sm">Build Your Portfolio</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              <span className="text-sm">Grow Your Audience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Info Alert */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Welcome to ACOP Authors Community!</p>
              <p className="text-blue-700 mt-1">You can always update your profile, bio, and social links later from your WordPress dashboard.</p>
            </div>
          </div>

          {/* Error Display with Auto-scroll */}
          {error && (
            <div ref={errorRef} className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-600 font-medium">Registration Error</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Success Display */}
          {success && !showSuccessModal && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-green-600 font-medium">Success!</p>
                <p className="text-green-600 text-sm">{success}</p>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit}>
                {/* Account Information */}
                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-orange-600" />
                    Account Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username *
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="johndoe"
                        required
                      />
                      <p className="text-xs text-gray-400 mt-1">At least 3 characters</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10 transition-all"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                    
                    {formData.password && (
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden mr-2">
                            <div className={`h-full transition-all ${getPasswordStrengthColor()}`} style={{ width: `${(Object.values(passwordStrength).filter(Boolean).length / 5) * 100}%` }} />
                          </div>
                          <span className="text-xs font-medium" style={{ color: getPasswordStrengthColor().replace('bg-', 'text-') }}>
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <div className={`flex items-center gap-1 ${passwordStrength.hasLength ? 'text-green-600' : 'text-gray-400'}`}>
                            {passwordStrength.hasLength ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} 8+ characters
                          </div>
                          <div className={`flex items-center gap-1 ${passwordStrength.hasNumber ? 'text-green-600' : 'text-gray-400'}`}>
                            {passwordStrength.hasNumber ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Number
                          </div>
                          <div className={`flex items-center gap-1 ${passwordStrength.hasUpper ? 'text-green-600' : 'text-gray-400'}`}>
                            {passwordStrength.hasUpper ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Uppercase
                          </div>
                          <div className={`flex items-center gap-1 ${passwordStrength.hasSpecial ? 'text-green-600' : 'text-gray-400'}`}>
                            {passwordStrength.hasSpecial ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} Special character
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Details */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-orange-600" />
                    Profile Details
                  </h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      placeholder="+254 700 000000"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio / About You
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      placeholder="Tell us about yourself, your expertise, and what you'll be writing about..."
                    />
                    <p className="text-xs text-gray-400 mt-1">This will be displayed on your author profile</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-orange-600" />
                    Social Media Profiles
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">Connect your social accounts (optional)</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Twitter className="w-4 h-4" /> Twitter/X
                      </label>
                      <input
                        type="url"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Facebook className="w-4 h-4" /> Facebook
                      </label>
                      <input
                        type="url"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="https://facebook.com/username"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Instagram className="w-4 h-4" /> Instagram
                      </label>
                      <input
                        type="url"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Youtube className="w-4 h-4" /> YouTube
                      </label>
                      <input
                        type="url"
                        name="youtube"
                        value={formData.youtube}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="https://youtube.com/@username"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Personal Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-orange-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Author Account
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Terms */}
                <p className="text-center text-xs text-gray-400 mt-4">
                  By signing up, you agree to our{' '}
                  <Link href="/terms" className="text-orange-600 hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-orange-600 hover:underline">Privacy Policy</Link>
                </p>
              </form>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link 
              href="https://cms.acop.co.ke/wp-login.php?itsec-hb-token=acopcmsportalcollege" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-700 font-medium hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}