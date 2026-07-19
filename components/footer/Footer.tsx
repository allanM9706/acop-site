"use client";

import React, { useState, useEffect } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setLoading(true);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;

    const script = document.createElement("script");
    script.src = "https://js-eu1.hsforms.net/forms/embed/144428117.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      const check = setInterval(() => {
        const iframe = document.querySelector(".hs-form-frame iframe");
        if (iframe) {
          setLoading(false);
          clearInterval(check);
        }
      }, 200);
    };

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [open]);

  return (
    <>
      {/* ================= FOOTER ================= */}
      <footer className="bg-primary text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand */}
            <div>
              <h3 className="font-playfair text-xl font-bold mb-4">
                Africana College
              </h3>
              <p className="text-white/80 mb-4">
                Transforming lives through faith-based education and professional excellence.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-accent">
                  <FacebookIcon size={20} />
                </a>
                <a href="#" className="text-white hover:text-accent">
                  <InstagramIcon size={20} />
                </a>
                <a href="#" className="text-white hover:text-accent">
                  <LinkedinIcon size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-playfair text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-white/80 hover:text-accent">Home</Link></li>
                <li><Link href="/courses" className="text-white/80 hover:text-accent">Courses</Link></li>
                <li><Link href="/admissions" className="text-white/80 hover:text-accent">Admissions</Link></li>
                <li>
                  <Link
                    href="https://form.jotform.com/253172041859559"
                    target="_blank"
                    className="text-white/80 hover:text-accent"
                  >
                    Contact
                  </Link>
                </li>
                {/* Certificate Verification Link - NEW */}
                <li>
                  <Link
                    href="/verify"
                    className="text-white/80 hover:text-accent flex items-center gap-2"
                  >
                    <ShieldCheckIcon size={16} />
                    Verify Certificate
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-accent">Student Portal</a>
                </li>
                <li>
                  <Link
                    href="https://cms.acop.co.ke/acopcmsportalcollege"
                    target="_blank"
                    className="text-white/80 hover:text-accent"
                  >
                    CMS Portal
                  </Link>
                </li>
                {/* ACOP CRM - New Menu Item */}
                <li>
                  <a
                    href="https://app-eu1.hubspot.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-accent flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                    </svg>
                    CRM Portal
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-playfair text-xl font-bold mb-4">Contact Info</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPinIcon size={18} className="mr-2 mt-1" />
                  <span className="text-white/80">Kianjau House 4th Floor, Thika</span>
                </li>
                <li className="flex items-center">
                  <PhoneIcon size={18} className="mr-2" />
                  <a href="tel:+254756234165" className="text-white/80 hover:text-accent">
                    +254 756 234165
                  </a>
                </li>
                <li className="flex items-center">
                  <MailIcon size={18} className="mr-2" />
                  <a href="mailto:info@acop.co.ke" className="text-white/80 hover:text-accent">
                    info@acop.co.ke
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-playfair text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-white/80 mb-4">
                Subscribe to receive updates on new courses and events.
              </p>
              <button
                onClick={handleOpen}
                className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-full font-medium w-full cursor-pointer"
              >
                Subscribe
              </button>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-6 text-center text-white/70 text-sm">
            © 2025 Africana College of Professionals – Educating in Truth and Light.
          </div> 
        </div>
      </footer>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative overflow-y-auto max-h-[90vh]">
            
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="cursor-pointer absolute top-2 right-2 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Modal Image */}
            <div className="w-full h-40 relative mb-4 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/newsletter.jpg"
                alt="Newsletter"
                fill
                className="object-cover"
              />
            </div>

            {/* Loading Spinner */}
            {loading && (
              <div className="flex justify-center items-center py-10">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* HubSpot Form */}
            <div
              className={`hs-form-frame transition-all duration-300 ${
                loading ? "opacity-0" : "opacity-100"
              }`}
              data-region="eu1"
              data-form-id="0eb22cc9-fe0e-47ea-b629-64b41b9db2b2"
              data-portal-id="144428117"
            ></div>
          </div>
        </div>
      )}
    </>
  );
};