import { MessageCircle } from 'lucide-react';
import { contactInfo } from '@/lib/data';

export default function WhatsAppButton() {
  const href = `https://wa.me/${contactInfo.phoneRaw.replace(/[^0-9]/g, '')}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-success text-white shadow-deep transition-all hover:scale-110 active:scale-95"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-success/40 animate-pulse-ring" />
      <MessageCircle className="relative h-6 w-6" />
    </a>
  );
}
