import { useState, useEffect } from 'react';
import { X, Copy, Share2, Check } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

export function FeedbackBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('feedbackBannerDismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('feedbackBannerDismissed', 'true');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Check out Ajay Labour Service - Verified labour services in Tinsukia & Doomdooma! ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-labour-blue/10 border-b border-labour-blue/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1">
            <Share2 className="h-5 w-5 text-labour-blue flex-shrink-0" />
            <p className="text-sm font-medium text-foreground">
              Help us improve! Share your feedback before we launch.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 rounded-full bg-labour-blue/10 hover:bg-labour-blue/20 px-4 py-2 text-sm font-medium text-labour-blue transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-2 rounded-full bg-green-600/10 hover:bg-green-600/20 px-4 py-2 text-sm font-medium text-green-700 transition-colors"
            >
              <SiWhatsapp className="h-4 w-4" />
              <span>Share</span>
            </button>

            <button
              onClick={handleDismiss}
              className="rounded-full p-2 hover:bg-labour-blue/10 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
