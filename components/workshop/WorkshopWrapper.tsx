'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import WorkshopLogin from './WorkshopLogin';
import WorkshopRoom from './WorkshopRoom';
import SessionModal from './SessionModal';

interface WorkshopWrapperProps {
  meetingLink: string;
  workshopTitle?: string;
  workshopDate?: string;
  workshopTime?: string;
  facilitator?: string;
  coordinator?: string;
}

export default function WorkshopWrapper({
  meetingLink,
  workshopTitle = 'Workshop',
  workshopDate = '20th - 22nd July 2026',
  workshopTime = '6:00 p.m. - 8:00 p.m. (EAT)',
  facilitator = 'Dr. Susan Gitau',
  coordinator = 'Alice Songok',
}: WorkshopWrapperProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [showModal, setShowModal] = useState(false);
  const [extendCount, setExtendCount] = useState(0);
  const [isExtending, setIsExtending] = useState(false);

  // Check access on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/verify-workshop-password', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();

        if (data.authenticated) {
          setIsAuthenticated(true);
          setTimeRemaining(60);
        } else {
          setIsAuthenticated(false);
          if (data.redirect) {
            router.push('/workshop');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Countdown timer
  useEffect(() => {
    if (!isAuthenticated) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        // Show modal when 15 seconds remaining
        if (prev === 15 && !showModal && extendCount < 3) {
          setShowModal(true);
        }

        if (prev <= 1) {
          handleAccessExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAuthenticated, showModal, extendCount]);

  // Check access validity every 5 seconds
  useEffect(() => {
    if (!isAuthenticated) return;

    const checkSession = async () => {
      try {
        const response = await fetch('/api/verify-workshop-password', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();

        if (!data.authenticated) {
          handleAccessExpired();
        }
      } catch (error) {
        console.error('Access check failed:', error);
      }
    };

    const interval = setInterval(checkSession, 5000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleAccessExpired = async () => {
    try {
      await fetch('/api/verify-workshop-password', {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsAuthenticated(false);
      setShowModal(false);
      setTimeRemaining(0);
      router.push('/workshop');
    }
  };

  const handleExtendAccess = async () => {
    setIsExtending(true);
    try {
      const response = await fetch('/api/extend-workshop-session', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setTimeRemaining(60);
        setExtendCount((prev) => prev + 1);
        setShowModal(false);
      } else {
        handleAccessExpired();
      }
    } catch (error) {
      console.error('Extension failed:', error);
      handleAccessExpired();
    } finally {
      setIsExtending(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/verify-workshop-password', {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsAuthenticated(false);
      setShowModal(false);
      setTimeRemaining(0);
      router.push('/workshop');
    }
  };

  const handleLoginSuccess = async () => {
    setIsAuthenticated(true);
    setShowModal(false);
    setTimeRemaining(60);
    setExtendCount(0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!meetingLink) {
    return notFound();
  }

  if (isAuthenticated) {
    return (
      <>
        {/* Access Expiry Modal */}
        {showModal && (
          <SessionModal
            timeRemaining={timeRemaining}
            onExtend={handleExtendAccess}
            onLogout={handleLogout}
            extendCount={extendCount}
            maxExtends={3}
            isExtending={isExtending}
          />
        )}

        {/* Timer in Corner */}
        <div className="fixed bottom-4 right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-200 z-40">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${timeRemaining > 30 ? 'bg-green-500' : timeRemaining > 15 ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'}`} />
            <div>
              <p className="text-xs text-gray-500">You will be logged out in</p>
              <p className={`font-bold text-sm ${timeRemaining <= 15 ? 'text-red-600' : 'text-gray-800'}`}>
                {timeRemaining}s
              </p>
            </div>
          </div>
        </div>

        <WorkshopRoom
          meetingLink={meetingLink}
          onLogout={handleLogout}
          workshopTitle={workshopTitle}
          workshopDate={workshopDate}
          workshopTime={workshopTime}
          facilitator={facilitator}
          coordinator={coordinator}
        />
      </>
    );
  }

  return <WorkshopLogin onSuccess={handleLoginSuccess} workshopTitle={workshopTitle} />;
}