'use client';

import React, { useEffect } from 'react';
import { Clock, LogOut, RefreshCw, AlertTriangle } from 'lucide-react';

interface SessionModalProps {
  timeRemaining: number;
  onExtend: () => void;
  onLogout: () => void;
  extendCount: number;
  maxExtends: number;
  isExtending: boolean;
}

const SessionModal = ({
  timeRemaining,
  onExtend,
  onLogout,
  extendCount,
  maxExtends,
  isExtending,
}: SessionModalProps) => {
  // Prevent clicks outside the modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      return;
    }
  };

  // Prevent ESC key from closing modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return;
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const canExtend = extendCount < maxExtends;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Animated border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 animate-color-spread" />

        {/* Decorative Timer */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-red-100 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping opacity-25" />
              <div className="flex flex-col items-center">
                <Clock className="w-8 h-8 text-red-500" />
                <span className="text-xs font-bold text-red-500 mt-1">{timeRemaining}s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
            You Will Be Logged Out Soon
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            You will be logged out in <span className="font-bold text-red-600">{timeRemaining} seconds</span>.
          </p>
          {extendCount > 0 && (
            <p className="text-xs text-gray-400 mt-1">
              Extended {extendCount} time{extendCount > 1 ? 's' : ''} (max {maxExtends} extensions)
            </p>
          )}
        </div>

        {/* Extend Button */}
        <button
          onClick={onExtend}
          disabled={!canExtend || isExtending}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all transform hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2 ${
            !canExtend || isExtending
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-orange-500 hover:opacity-90 shadow-lg'
          }`}
        >
          {isExtending ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Extending...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              {canExtend ? `Stay Logged In (${maxExtends - extendCount} left)` : 'No Extensions Left'}
            </>
          )}
        </button>

        {!canExtend && (
          <p className="text-xs text-yellow-600 text-center mt-2">
            ⚠️ You&apos;ll be logged out in {timeRemaining}s.
          </p>
        )}

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-xs text-gray-400">or</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full py-3 px-4 rounded-xl font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout Now
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          You will be logged out automatically if you don&apos;t extend.
        </p>
      </div>
    </div>
  );
};

export default SessionModal;