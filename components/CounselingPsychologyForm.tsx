/* eslint-disable react-hooks/set-state-in-effect */
// components/CounselingPsychologyForm.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function CounselingPsychologyForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (!ref.current) return;

    ref.current.innerHTML = "";

    const renderForm = () => {
      if (!ref.current) return;

      const container = document.createElement("div");
      container.className = "hs-form-frame";
      container.setAttribute("data-region", "eu1");
      container.setAttribute(
        "data-form-id",
        "85a52276-60f5-4d88-a124-2667441ffc68" // Your Counseling Psychology form ID
      );
      container.setAttribute("data-portal-id", "144428117");

      ref.current.appendChild(container);

      setTimeout(() => setLoading(false), 1500);
    };

    const existingScript = document.querySelector(
      'script[src="https://js-eu1.hsforms.net/forms/embed/144428117.js"]'
    );

    if (existingScript) {
      renderForm();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://js-eu1.hsforms.net/forms/embed/144428117.js";
    script.defer = true;

    script.onload = renderForm;

    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full">
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-orange-600 border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-500 text-sm">Loading application form...</p>
        </div>
      )}

      <div
        ref={ref}
        style={{ display: loading ? "none" : "block" }}
        className="hs-form-wrapper w-full"
      />

      <style jsx global>{`
        /* HubSpot Form Styles */
        .hs-form-frame {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 100% !important;
        }
        
        .hs-form-frame iframe {
          width: 100% !important;
          min-width: 100% !important;
          max-width: 100% !important;
        }
        
        .hs-form-frame .hs-form {
          width: 100% !important;
          max-width: 100% !important;
        }
        
        .hs-form-frame .hs-form fieldset {
          max-width: 100% !important;
          width: 100% !important;
          min-width: 100% !important;
        }
        
        .hs-form-frame .hs-form .hs-input {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 100% !important;
          box-sizing: border-box !important;
          padding: 10px 12px !important;
          border: 1px solid #d1d5db !important;
          border-radius: 8px !important;
          font-size: 14px !important;
          transition: border-color 0.2s !important;
        }
        
        .hs-form-frame .hs-form .hs-input:focus {
          border-color: #f97316 !important;
          outline: none !important;
          box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1) !important;
        }
        
        .hs-form-frame .hs-form .hs-form-field {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 100% !important;
          margin-bottom: 20px !important;
        }
        
        .hs-form-frame .hs-form .hs-submit {
          width: 100% !important;
        }
        
        .hs-form-frame .hs-form .hs-submit .actions {
          width: 100% !important;
        }
        
        .hs-form-frame .hs-form .hs-submit .actions input {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 100% !important;
          background: linear-gradient(to right, #f97316, #7c3aed) !important;
          color: white !important;
          padding: 14px !important;
          font-size: 16px !important;
          font-weight: 600 !important;
          border: none !important;
          border-radius: 8px !important;
          cursor: pointer !important;
          transition: opacity 0.2s !important;
        }
        
        .hs-form-frame .hs-form .hs-submit .actions input:hover {
          opacity: 0.9 !important;
        }
        
        .hs-form-frame .hs-form .hs-form-required {
          color: #e53e3e !important;
        }
        
        .hs-form-frame .hs-form .hs-error-msgs {
          font-size: 0.75rem !important;
          color: #e53e3e !important;
        }
        
        .hs-form-frame .hs-form label {
          font-weight: 600 !important;
          font-size: 14px !important;
          color: #1f2937 !important;
          margin-bottom: 4px !important;
          display: block !important;
        }
        
        .hs-form-frame .hs-form .hs-error-msgs label {
          font-size: 12px !important;
          color: #e53e3e !important;
        }
        
        .hs-form-frame .hs-form .hs-form-booleancheckbox-display {
          display: flex !important;
          align-items: flex-start !important;
          gap: 8px !important;
        }
        
        .hs-form-frame .hs-form .hs-form-booleancheckbox-display input {
          width: auto !important;
          flex-shrink: 0 !important;
          margin-top: 2px !important;
        }
        
        .hs-form-frame .hs-form .hs-form-booleancheckbox-display span {
          font-size: 14px !important;
        }
        
        .hs-form-frame .hs-form select.hs-input {
          -webkit-appearance: none !important;
          appearance: none !important;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") !important;
          background-repeat: no-repeat !important;
          background-position: right 12px center !important;
          background-size: 16px !important;
          padding-right: 40px !important;
        }
        
        .hs-form-frame .hs-form textarea.hs-input {
          min-height: 100px !important;
          resize: vertical !important;
        }
        
        @media (max-width: 640px) {
          .hs-form-frame .hs-form .hs-input {
            font-size: 16px !important;
            padding: 12px !important;
          }
          
          .hs-form-frame .hs-form .hs-submit .actions input {
            padding: 16px !important;
            font-size: 16px !important;
          }
          
          .hs-form-frame .hs-form label {
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}