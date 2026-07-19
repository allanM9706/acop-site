"use client";

import { useEffect, useRef, useState } from "react";

export function StudentConversionForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
        "8d0817d9-373a-4a01-a512-234d542fab1e"
      );
      container.setAttribute("data-portal-id", "144428117");

      ref.current.appendChild(container);

      setTimeout(() => setLoading(false), 1500);
    };

    const existingScript = document.querySelector(
      'script[src="https://js-eu1.hsforms.net/forms/embed/144428117.js"]'
    );

    if (existingScript) {
      // ✅ Script already present → just render
      renderForm();
      return;
    }

    // ❗ First load (refresh case)
    const script = document.createElement("script");
    script.src = "https://js-eu1.hsforms.net/forms/embed/144428117.js";
    script.defer = true;

    script.onload = renderForm;

    document.body.appendChild(script);
  }, []);

  return (
    <div className="w-full px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 bg-white rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 text-center sm:text-left">
        Register for September 2026 Intake
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6 text-center sm:text-left">
        Interested in joining Africana College? Fill out this form and our
        admissions team will contact you.
      </p>

      {loading && (
        <div className="flex flex-col items-center justify-center py-8 sm:py-12">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-orange-600 border-t-transparent animate-spin"></div>
          </div>
          <p className="mt-3 sm:mt-4 text-gray-500 text-xs sm:text-sm">Loading form...</p>
        </div>
      )}

      <div
        ref={ref}
        style={{ display: loading ? "none" : "block" }}
        className="hs-form-wrapper w-full"
      />

      <style jsx global>{`
        /* HubSpot Form Mobile Responsiveness - Full Width */
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
        
        /* Override HubSpot default styles for full width */
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
        }
        
        .hs-form-frame .hs-form .hs-form-field {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 100% !important;
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
        }
        
        .hs-form-frame .hs-form .hs-form-required {
          color: #e53e3e !important;
        }
        
        .hs-form-frame .hs-form .hs-error-msgs {
          font-size: 0.75rem !important;
        }
        
        /* Force full width on all screen sizes */
        .hs-form-frame .hs-form .hs-dependent-field {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        
        .hs-form-frame .hs-form .hs-dependent-field .hs-form-field {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 100% !important;
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
        
        /* Fix for file upload */
        .hs-form-frame .hs-form .hs-input[type="file"] {
          padding: 8px !important;
          font-size: 14px !important;
        }
        
        /* Fix for select dropdown */
        .hs-form-frame .hs-form select.hs-input {
          -webkit-appearance: none !important;
          appearance: none !important;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e") !important;
          background-repeat: no-repeat !important;
          background-position: right 12px center !important;
          background-size: 16px !important;
          padding-right: 40px !important;
        }
        
        /* Mobile-specific full width */
        @media (max-width: 640px) {
          .hs-form-frame {
            padding: 0 !important;
            margin: 0 !important;
          }
          
          .hs-form-frame .hs-form .hs-input {
            font-size: 16px !important; /* Prevents iOS zoom */
            padding: 14px 12px !important;
            min-height: 48px !important;
          }
          
          .hs-form-frame .hs-form .hs-form-field {
            margin-bottom: 16px !important;
            padding: 0 !important;
          }
          
          .hs-form-frame .hs-form .hs-submit .actions input {
            padding: 16px !important;
            font-size: 16px !important;
            min-height: 52px !important;
          }
          
          .hs-form-frame .hs-form .hs-form-required {
            font-size: 14px !important;
          }
          
          .hs-form-frame .hs-form label {
            font-size: 14px !important;
            font-weight: 600 !important;
          }
          
          .hs-form-frame .hs-form .hs-error-msgs {
            font-size: 12px !important;
          }
          
          .hs-form-frame .hs-form .hs-error-msgs label {
            font-size: 12px !important;
          }
          
          /* Remove any padding that might constrain the form */
          .hs-form-frame .hs-form .hs-form-field .hs-input {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }
          
          /* Ensure textarea is full width */
          .hs-form-frame .hs-form textarea.hs-input {
            width: 100% !important;
            min-height: 100px !important;
          }
          
          /* Fix checkbox and radio on mobile */
          .hs-form-frame .hs-form .hs-form-booleancheckbox-display {
            gap: 10px !important;
          }
          
          .hs-form-frame .hs-form .hs-form-booleancheckbox-display span {
            font-size: 13px !important;
            line-height: 1.4 !important;
          }
          
          /* Make sure form container has no padding restrictions */
          .hs-form-wrapper {
            padding: 0 !important;
            margin: 0 !important;
          }
          
          .hs-form-wrapper .hs-form-frame {
            padding: 0 !important;
            margin: 0 !important;
          }
        }
        
        /* Tablet adjustments */
        @media (min-width: 641px) and (max-width: 1024px) {
          .hs-form-frame .hs-form .hs-input {
            padding: 12px !important;
            font-size: 15px !important;
          }
          
          .hs-form-frame .hs-form .hs-submit .actions input {
            padding: 14px !important;
            font-size: 15px !important;
          }
        }
        
        /* Ensure form container doesn't constrain width */
        .hs-form-wrapper {
          overflow: visible !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        
        .hs-form-wrapper .hs-form-frame {
          overflow: visible !important;
          width: 100% !important;
        }
        
        /* Fix for any hidden overflow */
        .hs-form-frame .hs-form {
          overflow: visible !important;
        }
      `}</style>

      <div className="mt-4 sm:mt-6 text-xs text-gray-400 text-center px-2">
        By submitting this form, you agree to receive communication from
        Africana College of Professionals about programs, events, and
        admissions.
      </div>
    </div>
  );
}