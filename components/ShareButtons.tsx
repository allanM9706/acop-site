'use client'

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaLink } from 'react-icons/fa'
import { Bookmark } from 'lucide-react'

interface ShareButtonsProps {
  title: string
  shareText: string
  authorName?: string | null
}

export function ShareButtons({ title, shareText, authorName }: ShareButtonsProps) {
  // Helper function to get current URL
  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href
    }
    return ''
  }

  // Create share text with author name
  const getShareText = () => {
    let text = title
    if (authorName) {
      text = `${title} by ${authorName}`
    }
    return text
  }

  // Get full message for sharing
  const getFullMessage = () => {
    const shareTitle = getShareText()
    return `${shareTitle} - ${shareText}`
  }

  const shareOnFacebook = () => {
    const url = getCurrentUrl()
    const message = getShareText()
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`, '_blank', 'width=600,height=400')
  }

  const shareOnTwitter = () => {
    const url = getCurrentUrl()
    const message = getFullMessage()
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400')
  }

  const shareOnLinkedIn = () => {
    const url = getCurrentUrl()
    const message = getFullMessage()
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(getShareText())}&summary=${encodeURIComponent(shareText)}`, '_blank', 'width=600,height=400')
  }

  const shareOnWhatsApp = () => {
    const url = getCurrentUrl()
    const message = getFullMessage()
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}%20${encodeURIComponent(url)}`, '_blank', 'width=600,height=400')
  }

  const copyToClipboard = async () => {
    const url = getCurrentUrl()
    try {
      await navigator.clipboard.writeText(url)
      // Optional: Show a toast notification instead of alert
      const toast = document.createElement('div')
      toast.textContent = 'Link copied to clipboard!'
      toast.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm z-50 animate-fade-in-out'
      document.body.appendChild(toast)
      setTimeout(() => toast.remove(), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
      alert('Failed to copy link. Please try again.')
    }
  }

  return (
    <>
      {/* Desktop Sticky Left Sidebar - hidden on mobile */}
      <div className="hidden lg:block fixed left-4 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-3 flex flex-col gap-3">
          <button
            onClick={shareOnFacebook}
            className="w-10 h-10 rounded-full bg-[#1877F2] hover:bg-[#1877F2]/80 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Share on Facebook"
          >
            <FaFacebookF className="w-4 h-4" />
          </button>
          <button
            onClick={shareOnTwitter}
            className="w-10 h-10 rounded-full bg-[#1DA1F2] hover:bg-[#1DA1F2]/80 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Share on Twitter"
          >
            <FaTwitter className="w-4 h-4" />
          </button>
          <button
            onClick={shareOnLinkedIn}
            className="w-10 h-10 rounded-full bg-[#0077B5] hover:bg-[#0077B5]/80 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedinIn className="w-4 h-4" />
          </button>
          <button
            onClick={shareOnWhatsApp}
            className="w-10 h-10 rounded-full bg-[#25D366] hover:bg-[#25D366]/80 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Share on WhatsApp"
          >
            <FaWhatsapp className="w-4 h-4" />
          </button>
          <button
            onClick={copyToClipboard}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Copy link"
          >
            <FaLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar - visible only on mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center py-3 px-4">
          <button
            onClick={shareOnFacebook}
            className="flex flex-col items-center gap-1 text-[#1877F2] hover:text-[#1877F2]/80 transition-colors cursor-pointer"
            aria-label="Share on Facebook"
          >
            <FaFacebookF className="w-5 h-5" />
            <span className="text-xs text-gray-600">Facebook</span>
          </button>
          <button
            onClick={shareOnTwitter}
            className="flex flex-col items-center gap-1 text-[#1DA1F2] hover:text-[#1DA1F2]/80 transition-colors cursor-pointer"
            aria-label="Share on Twitter"
          >
            <FaTwitter className="w-5 h-5" />
            <span className="text-xs text-gray-600">Twitter</span>
          </button>
          <button
            onClick={shareOnLinkedIn}
            className="flex flex-col items-center gap-1 text-[#0077B5] hover:text-[#0077B5]/80 transition-colors cursor-pointer"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedinIn className="w-5 h-5" />
            <span className="text-xs text-gray-600">LinkedIn</span>
          </button>
          <button
            onClick={shareOnWhatsApp}
            className="flex flex-col items-center gap-1 text-[#25D366] hover:text-[#25D366]/80 transition-colors cursor-pointer"
            aria-label="Share on WhatsApp"
          >
            <FaWhatsapp className="w-5 h-5" />
            <span className="text-xs text-gray-600">WhatsApp</span>
          </button>
          <button
            onClick={copyToClipboard}
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-orange-600 transition-colors cursor-pointer"
            aria-label="Copy link"
          >
            <FaLink className="w-5 h-5" />
            <span className="text-xs">Copy Link</span>
          </button>
        </div>
      </div>

      {/* Bottom share section for desktop */}
      <div className="hidden lg:block mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 font-medium">{shareText}:</span>
            <div className="flex gap-2">
              <button
                onClick={shareOnFacebook}
                className="p-2 rounded-full bg-[#1877F2] hover:bg-[#1877F2]/80 text-white transition-all duration-300 cursor-pointer"
                aria-label="Share on Facebook"
              >
                <FaFacebookF className="w-3 h-3" />
              </button>
              <button
                onClick={shareOnTwitter}
                className="p-2 rounded-full bg-[#1DA1F2] hover:bg-[#1DA1F2]/80 text-white transition-all duration-300 cursor-pointer"
                aria-label="Share on Twitter"
              >
                <FaTwitter className="w-3 h-3" />
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="p-2 rounded-full bg-[#0077B5] hover:bg-[#0077B5]/80 text-white transition-all duration-300 cursor-pointer"
                aria-label="Share on LinkedIn"
              >
                <FaLinkedinIn className="w-3 h-3" />
              </button>
              <button
                onClick={shareOnWhatsApp}
                className="p-2 rounded-full bg-[#25D366] hover:bg-[#25D366]/80 text-white transition-all duration-300 cursor-pointer"
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp className="w-3 h-3" />
              </button>
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all duration-300 cursor-pointer"
                aria-label="Copy link"
              >
                <FaLink className="w-3 h-3" />
              </button>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
            <Bookmark className="w-4 h-4" />
            Save for later
          </button>
        </div>
      </div>

      {/* Optional: Add CSS for fade animation */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, 10px); }
          15% { opacity: 1; transform: translate(-50%, 0); }
          85% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -10px); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 2s ease-in-out forwards;
        }
      `}</style>
    </>
  )
}