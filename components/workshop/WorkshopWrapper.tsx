'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import WorkshopLogin from './WorkshopLogin';
import WorkshopRoom from './WorkshopRoom';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie.split(';');
      const authCookie = cookies.find(cookie => cookie.trim().startsWith('workshop_authenticated='));
      if (authCookie) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    document.cookie = 'workshop_authenticated=; path=/; max-age=0';
    setIsAuthenticated(false);
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
      <WorkshopRoom
        meetingLink={meetingLink}
        onLogout={handleLogout}
        workshopTitle={workshopTitle}
        workshopDate={workshopDate}
        workshopTime={workshopTime}
        facilitator={facilitator}
        coordinator={coordinator}
      />
    );
  }

  return <WorkshopLogin onSuccess={handleLoginSuccess} workshopTitle={workshopTitle} />;
}