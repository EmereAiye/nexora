import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext.tsx';
import { 
  MessageCircle, 
  X, 
  Send, 
  ThumbsUp, 
  ThumbsDown, 
  Headphones, 
  ExternalLink, 
  PhoneCall, 
  CheckCircle2 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'agent' | 'user';
  text: string;
  timestamp: string;
  ticketId?: string;
  showHandoff?: boolean;
}

const QUICK_TOPICS = [
  'What is NEXORA?',
  'Is it free?',
  'Report a problem',
  'List my business',
  'Report a fake listing',
  'Payments',
  'Talk to a person'
];

export const NexoraCareChat: React.FC = () => {
  const { createSupportTicket, addToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [rated, setRated] = useState<'up' | 'down' | null>(null);
  const [currentTicket, setCurrentTicket] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: "Hi, I'm NEXORA Care. What can I help with today?",
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const getBotResponse = (query: string): { reply: string; handoff?: boolean; ticket?: boolean } => {
    const q = query.toLowerCase();

    if (q.includes('what is nexora') || q.includes('about')) {
      return {
        reply: "NEXORA is Nigeria's all-in-one digital platform that connects you to jobs, market prices, verified artisans, transport routes, utilities, and community reports in one place. No need to browse 8 different sites!"
      };
    }
    if (q.includes('is it free') || q.includes('price') || q.includes('cost') || q.includes('fee')) {
      return {
        reply: "Yes! Searching, comparing prices, browsing jobs, reading community alerts, and contacting sellers/providers on NEXORA is 100% free for everyday users. Real employers will also NEVER ask you for interview fees."
      };
    }
    if (q.includes('list my business') || q.includes('storefront') || q.includes('sell')) {
      return {
        reply: "Listing your business on NEXORA is free! You get your own digital storefront with photos, product catalog, customer inquiries, and a verification badge without needing to code a website. Visit the 'For Business' tab to set up."
      };
    }
    if (q.includes('fake listing') || q.includes('fraud') || q.includes('scam')) {
      return {
        reply: "We take trust and safety very seriously. Every listing and review has a 'Report' button. Remember: never pay rent or deposits before inspecting a property in person, and employers on NEXORA never charge application fees.",
        handoff: true
      };
    }
    if (q.includes('problem') || q.includes('issue') || q.includes('bug')) {
      return {
        reply: "Sorry for the inconvenience. Let's document this right away so our local support team can resolve it.",
        ticket: true
      };
    }
    if (q.includes('payment') || q.includes('bank') || q.includes('transfer')) {
      return {
        reply: "Currently, transactions and payments happen directly between you and the verified provider or seller. In-platform escrow payments are coming in Stage 3 of our roadmap."
      };
    }
    if (q.includes('talk to a person') || q.includes('agent') || q.includes('human') || q.includes('call')) {
      return {
        reply: "Connecting you to a human support agent now! Our team replies in chat, phone, or WhatsApp.",
        handoff: true,
        ticket: true
      };
    }

    return {
      reply: "Thank you for asking. I've noted your question. If you'd like more personalized assistance or live resolution, you can connect directly with our Nigerian support desk via WhatsApp or phone.",
      handoff: true
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(query);
      let ticketId: string | undefined = undefined;

      if (response.ticket || response.handoff) {
        ticketId = createSupportTicket('Support Enquiry via Chat', query);
        setCurrentTicket(ticketId);
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: response.handoff ? 'agent' : 'bot',
        text: response.reply,
        timestamp: 'Just now',
        ticketId,
        showHandoff: response.handoff
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleRate = (type: 'up' | 'down') => {
    setRated(type);
    addToast(type === 'up' ? 'Thank you for your positive feedback!' : 'Thank you. We will work to improve.', 'info');
  };

  return (
    <>
      {/* Floating Coral Help Button: bottom-right (above mobile bottom bar) */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-3 bg-[#FF5C6C] hover:bg-[#fa4b5d] text-white rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:scale-95 group font-semibold text-sm cursor-pointer"
            aria-label="Open NEXORA Care support chat"
          >
            <div className="relative">
              <Headphones className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#0FB57F] rounded-full border-2 border-[#FF5C6C]" />
            </div>
            <span>Help</span>
          </button>
        )}
      </div>

      {/* Chat Window: Opens as card above button */}
      {isOpen && (
        <div className="fixed bottom-20 lg:bottom-6 right-2 sm:right-6 w-[calc(100vw-1rem)] sm:w-96 max-h-[82vh] h-[550px] bg-white dark:bg-[#131E45] rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header: "NEXORA Care" with green "Online" indicator & close */}
          <div className="px-5 py-4 bg-[#0E1A3A] text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Headphones className="w-5 h-5 text-[#FF5C6C]" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#0FB57F] rounded-full border-2 border-[#0E1A3A]" title="Online" />
              </div>
              <div>
                <div className="font-display font-bold text-base flex items-center gap-2">
                  <span>NEXORA Care</span>
                  <span className="text-[11px] font-medium bg-[#0FB57F]/20 text-[#0FB57F] px-1.5 py-0.2 rounded-full">
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">Fast customer support & inquiries</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70 dark:bg-[#0A1230]/70">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#0E1A3A] dark:bg-[#26397F] text-white rounded-br-xs'
                      : 'bg-white dark:bg-[#1E2C60] text-slate-800 dark:text-slate-100 shadow-xs border border-slate-200/60 dark:border-white/5 rounded-bl-xs'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Ticket and Handoff Card if created */}
                {msg.ticketId && (
                  <div className="mt-2 w-[85%] p-3 rounded-2xl bg-white dark:bg-[#1E2C60] border border-[#0FB57F]/30 shadow-xs text-xs space-y-2">
                    <div className="flex items-center justify-between text-[#0FB57F] font-bold">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Support Ticket Created
                      </span>
                      <span className="font-mono">#{msg.ticketId}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      Viewable in your Account Dashboard. An agent will respond promptly.
                    </p>
                  </div>
                )}

                {msg.showHandoff && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <a
                      href="https://wa.me/2348000000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#25D366] text-white text-xs font-semibold rounded-full hover:opacity-90 shadow-xs"
                    >
                      <ExternalLink className="w-3 h-3" /> Chat on WhatsApp
                    </a>
                    <a
                      href="tel:+2348000000000"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white text-xs font-semibold rounded-full hover:bg-slate-300 dark:hover:bg-white/20"
                    >
                      <PhoneCall className="w-3 h-3" /> Call Support
                    </a>
                  </div>
                )}

                <span className="text-[10px] text-slate-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white dark:bg-[#1E2C60] px-3.5 py-2 rounded-2xl w-fit shadow-xs border border-slate-200/50">
                <span className="w-2 h-2 rounded-full bg-[#0FB57F] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#FFB627] animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-[#FF5C6C] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Topics (Tappable chips) */}
          <div className="px-3 py-2 bg-white dark:bg-[#131E45] border-t border-slate-100 dark:border-white/5 overflow-x-auto whitespace-nowrap flex gap-1.5 no-scrollbar">
            {QUICK_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => handleSendMessage(topic)}
                className="inline-block px-3 py-1 bg-slate-100 dark:bg-white/10 hover:bg-[#0FB57F]/10 hover:text-[#0FB57F] dark:hover:text-[#FFB627] text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full transition-colors shrink-0"
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Feedback thumbs row after conversation */}
          {messages.length > 2 && (
            <div className="px-4 py-1.5 bg-slate-50 dark:bg-[#0E1A3A] border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs text-slate-500">
              <span>Was this helpful?</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRate('up')}
                  className={`p-1 rounded-md transition-colors ${rated === 'up' ? 'text-[#0FB57F]' : 'hover:text-slate-800 dark:hover:text-white'}`}
                  title="Thumbs Up"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleRate('down')}
                  className={`p-1 rounded-md transition-colors ${rated === 'down' ? 'text-[#FF5C6C]' : 'hover:text-slate-800 dark:hover:text-white'}`}
                  title="Thumbs Down"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Input Box with Send Button */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-[#131E45] border-t border-slate-200/80 dark:border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask anything or describe an issue..."
              className="flex-1 bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-full px-4 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0FB57F]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 rounded-full bg-[#FF5C6C] hover:bg-[#fa4b5d] text-white disabled:opacity-40 transition-opacity shrink-0 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
