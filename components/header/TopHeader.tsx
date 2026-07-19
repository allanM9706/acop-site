'use client';

import React from 'react';
import Link from 'next/link';
import {
  PhoneIcon,
  MailIcon,
  UserIcon,
  UsersIcon,
  LaptopIcon,
  ShieldCheckIcon,
} from 'lucide-react';

export const TopHeader = () => {
  return (
    <div
      className="
        fixed top-0 left-0 w-full z-40
        bg-linear-to-r from-purple-100 via-purple-50 to-purple-100
        border-b border-primary/20
        h-8 sm:h-10
      "
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center text-xs sm:text-sm">
        <div className="flex items-center space-x-4">
          <a href="tel:+254756234165" className="flex items-center hover:text-primary whitespace-nowrap">
            <PhoneIcon size={14} className="mr-1 flex-shrink-0" />
            <span>+254 756 234165</span>
          </a>

          <span className="hidden sm:inline text-gray-400">|</span>

          <a href="mailto:info@acop.co.ke" className="hidden sm:flex items-center hover:text-primary whitespace-nowrap">
            <MailIcon size={14} className="mr-1 flex-shrink-0" />
            <span>info@acop.co.ke</span>
          </a>
        </div>

        <div className="flex items-center space-x-4">
          {/* Scholarship Link */}
          <a href="#scholarship" className="flex items-center hover:text-primary whitespace-nowrap">
            <UserIcon size={14} className="mr-1 flex-shrink-0" />
            <span className="hidden sm:inline">Scholarship</span>
          </a>

          {/* Alumni Link */}
          <a href="#alumni" className="flex items-center hover:text-primary whitespace-nowrap">
            <UsersIcon size={14} className="mr-1 flex-shrink-0" />
            <span className="hidden sm:inline">Alumni</span>
          </a>

          {/* Certificate Verification Link - Using Next.js Link */}
          <Link
            href="/verify"
            className="flex items-center hover:text-primary whitespace-nowrap font-medium text-primary"
          >
            <ShieldCheckIcon size={14} className="mr-1 flex-shrink-0" />
            <span className="hidden sm:inline">Verify Certificate</span>
          </Link>

          {/* Masomo Portal */}
          <a
            href="https://moodle-200882-0.cloudclusters.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-primary whitespace-nowrap"
          >
            <LaptopIcon size={14} className="mr-1 flex-shrink-0" />
            <span className="hidden sm:inline">Masomo Portal</span>
          </a>

          {/* CMS Portal */}
          <a 
            href="https://cms.acop.co.ke/acopcmsportalcollege"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-primary whitespace-nowrap"
          >
            <LaptopIcon size={14} className="mr-1 flex-shrink-0" />
            <span className="hidden sm:inline">CMS Portal</span>
          </a>

          {/* CRM Portal */}
          <a 
            href="https://app-eu1.hubspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-primary whitespace-nowrap"
          >
            <LaptopIcon size={14} className="mr-1 flex-shrink-0" />
            <span className="hidden sm:inline">CRM Portal</span>
          </a>
        </div>
      </div>
    </div>
  );
};