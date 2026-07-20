'use client';

import React, { useState } from 'react';
import { Calendar, Clock, LogOut, Video, Sparkles, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

interface WorkshopRoomProps {
  meetingLink: string;
  onLogout: () => void;
  workshopTitle?: string;
  workshopDate?: string;
  workshopTime?: string;
  facilitator?: string;
  coordinator?: string;
}

const WorkshopRoom = ({
  meetingLink,
  onLogout,
  workshopTitle = 'Workshop',
  workshopDate = '20th - 22nd July 2026',
  workshopTime = '6:00 p.m. - 8:00 p.m. (EAT)',
  facilitator = 'Dr. Susan Gitau',
  coordinator = 'Alice Songok',
}: WorkshopRoomProps) => {
  const [copied, setCopied] = useState(false);

  const copyMeetingLink = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Image
              src="/acoplogo.jpg"
              alt="Africana College of Professionals"
              width={60}
              height={60}
              className="h-auto cursor-pointer"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Workshop Room</h1>
              <p className="text-sm text-gray-500">{workshopTitle}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Meeting Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-orange-500 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Join Your Workshop</h2>
            <p className="text-white/90 text-sm">
              You are now authenticated. Click the button below to join the workshop session.
            </p>
          </div>

          {/* Meeting Info */}
          <div className="p-6 space-y-6">
            {/* Meeting Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                <Calendar className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-semibold text-gray-800">{workshopDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl">
                <Clock className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="font-semibold text-gray-800">{workshopTime}</p>
                </div>
              </div>
            </div>

            {/* Join Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg cursor-pointer"
              >
                <Video className="w-5 h-5" />
                Join Workshop Now
              </a>
              <button
                onClick={copyMeetingLink}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors cursor-pointer"
              >
                {copied ? '✅ Copied!' : 'Copy Link'}
              </button>
            </div>

            {/* Meeting Link */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Workshop Link</p>
              <p className="text-sm text-purple-600 break-all font-mono">
                {meetingLink}
              </p>
            </div>
          </div>
        </div>

        {/* Workshop Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" />
            Workshop Details
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong>Facilitator:</strong> {facilitator}
            </p>
            <p>
              <strong>Program Coordinator:</strong> {coordinator}
            </p>
            <p>
              <strong>Organizer:</strong> Africana College of Professionals in collaboration with Royal Minds Educational and Counselling Consultancy
            </p>
            <p className="text-xs text-gray-400 mt-4">
              <ShieldCheck className="w-4 h-4 inline mr-1 text-green-500" />
              This is a secure, authenticated workshop page. Only registered participants have access.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <p>© 2026 Africana College of Professionals. All rights reserved.</p>
          <p className="mt-1">
            Need help? Contact{' '}
            <a href="mailto:info@acop.co.ke" className="text-purple-600 hover:underline cursor-pointer">
              info@acop.co.ke
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkshopRoom;