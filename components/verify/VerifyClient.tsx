/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { ShieldCheck, Sparkles, Search, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function VerifyClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const maxRetries = 3;
  const verifyPageUrl = 'https://cms.acop.co.ke/edutain-validate-certificate/';

  // Initialize iframe URL with cache busting
  useEffect(() => {
    const bustedUrl = verifyPageUrl + 
      (verifyPageUrl.includes('?') ? '&' : '?') + 
      '_t=' + Date.now();
    setIframeUrl(bustedUrl);
  }, [retryCount]);

  // Auto-retry logic
  useEffect(() => {
    if (iframeError && retryCount < maxRetries) {
      const timer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setIframeError(false);
        setIsLoading(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [iframeError, retryCount]);

  // Show permanent error after max retries
  const showPermanentError = iframeError && retryCount >= maxRetries;

  // Handle manual retry
  const handleManualRetry = () => {
    setRetryCount(0);
    setIframeError(false);
    setIsLoading(true);
    const bustedUrl = verifyPageUrl + 
      (verifyPageUrl.includes('?') ? '&' : '?') + 
      '_t=' + Date.now();
    setIframeUrl(bustedUrl);
  };

  const shouldShowIframe = iframeUrl !== null && !showPermanentError;

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0 -z-10 h-[500px] opacity-30"
        style={{
          background: 'radial-gradient(circle at 10% 20%, #F8F6FF 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <ShieldCheck size={14} />
            <span>Verify Your Credentials</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Certificate{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Verification
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Enter the unique certificate code to verify its authenticity.
          </p>
        </div>

        {/* Iframe Container */}
        <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-white">
          {/* Decorative Top Bar */}
          <div className="h-1 bg-gradient-to-r from-primary via-secondary to-orange-500" />
          
          {/* Loading Skeleton */}
          {isLoading && !iframeError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck size={24} className="text-primary animate-pulse" />
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-700 font-medium">Loading verification form...</p>
                <p className="text-gray-400 text-sm mt-1">
                  {retryCount > 0 ? `Retry attempt ${retryCount} of ${maxRetries}...` : 'Please wait...'}
                </p>
              </div>
              
              <div className="mt-4 w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full animate-loading-bar" 
                  style={{ width: '60%' }}
                />
              </div>
            </div>
          )}

          {/* Error State */}
          {showPermanentError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10 p-6">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <ShieldCheck size={32} className="text-red-500" />
              </div>
              <p className="text-gray-700 font-medium text-lg">Unable to load verification form</p>
              <p className="text-gray-500 text-sm mt-2 mb-4 max-w-md text-center">
                We&rsquo;re experiencing technical difficulties. Please try again or contact us directly.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleManualRetry}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
                <a
                  href="mailto:info@acop.co.ke"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          )}
          
          {/* Temporary error state */}
          {iframeError && !showPermanentError && retryCount < maxRetries && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-yellow-500/20 border-t-yellow-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 size={24} className="text-yellow-500 animate-pulse" />
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-gray-700 font-medium">Retrying connection...</p>
                <p className="text-gray-400 text-sm mt-1">
                  Attempt {retryCount + 1} of {maxRetries}
                </p>
              </div>
            </div>
          )}
          
          {/* Iframe */}
          {shouldShowIframe && (
            <iframe
              key={iframeUrl}
              src={iframeUrl}
              width="100%"
              height="500"
              className="w-full transition-opacity duration-300"
              style={{ 
                minHeight: '500px', 
                border: 'none',
                opacity: isLoading ? 0 : 1
              }}
              title="ACOP Certificate Verification"
              loading="lazy"
              onLoad={() => {
                setIsLoading(false);
                setIframeError(false);
              }}
              onError={() => {
                setIsLoading(false);
                setIframeError(true);
              }}
            />
          )}
        </div>

        {/* Footer Help Section */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500 bg-white/50 backdrop-blur-sm rounded-2xl px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Official ACOP Verification</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300" />
            <div className="flex items-center gap-2">
              <Sparkles size={14} />
              <span>Need help? Contact </span>
              <a href="mailto:info@acop.co.ke" className="text-primary font-semibold hover:underline">
                info@acop.co.ke
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation for loading bar */}
      <style jsx>{`
        @keyframes loading-progress {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 80%; margin-left: 10%; }
          100% { width: 0%; margin-left: 100%; }
        }
        .animate-loading-bar {
          animation: loading-progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}