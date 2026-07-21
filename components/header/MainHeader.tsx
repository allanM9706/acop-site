'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronRight, Newspaper, PenTool, CalendarDays } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { desktopMenuItems } from '@/lib/constants/MenuItems';

interface MainHeaderProps {
  hasRecentNews?: boolean;
}

export const MainHeader = ({ hasRecentNews = false }: MainHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`
          fixed left-0 w-full z-50
          transition-all duration-500 ease-out
          ${isScrolled ? 'top-0' : 'top-8 sm:top-10'}
          ${isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-lg py-2 sm:py-3' 
            : 'bg-white/95 backdrop-blur-sm shadow-md py-3 sm:py-4'
          }
        `}
      >
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo + Title */}
            <Link
              href="/"
              className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0"
              aria-label="Africana College of Professionals - Home"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="relative overflow-hidden rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300">
                <Image
                  src="/acoplogo.jpg"
                  alt=""
                  width={isScrolled ? 36 : 40}
                  height={isScrolled ? 36 : 40}
                  className="object-contain transition-transform duration-500 group-hover:scale-110 sm:w-12 sm:h-12"
                  priority
                  unoptimized
                />
              </div>
              
              <motion.div
                className="hidden sm:block"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="block text-base lg:text-lg xl:text-xl font-semibold text-gray-800 font-playfair leading-tight">
                  Africana College
                </span>
                <span className="block text-xs lg:text-sm xl:text-base text-primary font-medium tracking-wide">
                  of Professionals
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation - Hidden on mobile/tablet */}
            <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
              {desktopMenuItems.map((item) => {
                const isActive = pathname === item.href;

                // Skip rendering Masomo Portal if it exists
                if (item.id === 'masomo') return null;

                // Special handling for News item with animated badge
                if (item.id === 'news') {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="relative px-3 xl:px-4 py-2 group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-1">
                        <Newspaper className={`w-4 h-4 transition-colors duration-200 ${
                          isActive ? 'text-primary' : 'text-gray-500 group-hover:text-primary'
                        }`} />
                        <span className={`
                          relative font-medium transition-colors duration-200 text-sm xl:text-base
                          ${isActive ? 'text-primary' : 'text-gray-600 group-hover:text-primary'}
                        `}>
                          {item.label}
                        </span>
                        
                        {/* Animated Badge on News Menu Item */}
                        {hasRecentNews && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ 
                              type: "spring",
                              stiffness: 500,
                              damping: 30
                            }}
                            className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-red-500 text-white rounded-full shadow-lg"
                          >
                            ALERT
                          </motion.span>
                        )}
                      </div>
                      
                      <span className="absolute inset-x-3 xl:inset-x-4 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                      
                      {isActive && (
                        <motion.span
                          layoutId="desktopActiveIndicator"
                          className="absolute inset-x-3 xl:inset-x-4 bottom-0 h-0.5 bg-primary rounded-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  );
                }

                if (item.external) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative px-3 xl:px-4 py-2 group"
                    >
                      <span className="relative font-medium text-gray-600 group-hover:text-primary transition-colors duration-200 text-sm xl:text-base">
                        {item.label}
                      </span>
                      <span className="absolute inset-x-3 xl:inset-x-4 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="relative px-3 xl:px-4 py-2 group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className={`
                      relative font-medium transition-colors duration-200 text-sm xl:text-base
                      ${isActive ? 'text-primary' : 'text-gray-600 group-hover:text-primary'}
                    `}>
                      {item.label}
                    </span>
                    
                    {isActive && (
                      <motion.span
                        layoutId="desktopActiveIndicator"
                        className="absolute inset-x-3 xl:inset-x-4 bottom-0 h-0.5 bg-primary rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons - Both visible on all devices */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Workshops Button - Animated with Zoom */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/workshops"
                  className="inline-flex items-center justify-center px-2 sm:px-4 py-1.5 sm:py-2 bg-transparent border border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-100 group whitespace-nowrap"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CalendarDays className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm whitespace-nowrap">Workshops</span>
                </Link>
              </motion.div>

              {/* Get Started Button - Visible on all devices */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Link
                  href="/get-started"
                  className="inline-flex items-center justify-center px-2 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 active:scale-100 group whitespace-nowrap"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-xs sm:text-sm md:text-base whitespace-nowrap">Apply Course</span>
                  <ChevronRight className="hidden sm:block ml-1 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-600 hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} className="sm:w-6 sm:h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} className="sm:w-6 sm:h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              aria-hidden="true"
            />
            
            {/* Slide-in Menu */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto"
              style={{ 
                top: 0,
                height: '100vh',
                paddingTop: isScrolled ? '56px' : 'calc(32px + 56px)',
              }}
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/acoplogo.jpg"
                      alt=""
                      width={40}
                      height={40}
                      className="object-contain rounded-lg"
                      unoptimized
                    />
                    <span className="font-semibold text-gray-800">Menu</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-6">
                  <ul className="space-y-1 px-4">
                    {desktopMenuItems.map((item, index) => {
                      // Skip Masomo Portal
                      if (item.id === 'masomo') return null;
                      
                      const isActive = pathname === item.href;

                      return (
                        <motion.li
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          {item.external ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setMobileMenuOpen(false)}
                              className={`
                                flex items-center justify-between px-4 py-3 rounded-xl
                                transition-all duration-200 group
                                ${isActive 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                                }
                              `}
                            >
                              <span className="font-medium">{item.label}</span>
                              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`
                                flex items-center justify-between px-4 py-3 rounded-xl
                                transition-all duration-200 group
                                ${isActive 
                                  ? 'bg-primary/10 text-primary font-semibold' 
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                                }
                              `}
                            >
                              <div className="flex items-center space-x-2">
                                {item.id === 'news' && <Newspaper className="w-4 h-4" />}
                                <span className="font-medium">{item.label}</span>
                                {item.id === 'news' && hasRecentNews && (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ 
                                      type: "spring",
                                      stiffness: 500,
                                      damping: 30
                                    }}
                                    className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full shadow-md"
                                  >
                                    ALERT
                                  </motion.span>
                                )}
                              </div>
                              {isActive && (
                                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                              )}
                            </Link>
                          )}
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Mobile Register Button */}
                <div className="p-6 border-t border-gray-100 mt-auto">
                  <Link
                    href="https://form.jotform.com/253171134791556"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-center w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                  >
                    <span>Register Now</span>
                    <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from hiding behind fixed headers */}
      <div 
        className="w-full"
        style={{ 
          height: isScrolled 
            ? '56px'
            : 'calc(32px + 56px)'
        }}
      />
    </>
  );
};