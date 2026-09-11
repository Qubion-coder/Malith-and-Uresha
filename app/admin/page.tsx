'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    // Get the base URL when component mounts
    setBaseUrl(window.location.origin);
  }, []);

  const handleGenerate = () => {
    if (!guestName.trim()) {
      alert('Please enter a guest name');
      return;
    }
    
    const params = new URLSearchParams();
    params.set('prefix', prefix);
    params.set('name', guestName.trim());
    
    setGeneratedLink(`${baseUrl}/?${params.toString()}`);
    setCopiedLink(false);
    setCopiedMessage(false);
  };

  const getFullMessage = () => {
    if (!generatedLink) return '';
    return `Dear ${prefix} ${guestName} ❤️\n\nWith joyful hearts, we warmly invite you and your family to celebrate one of the most special days of our lives as we begin our journey together.\n\nPlease view our wedding invitation and all the event details through the link below 🌐:\n\n${generatedLink}\n\nYour presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.\n\nWith love,\n❤️ Malith & Uresha`;
  };

  const copyLink = async () => {
    if (!generatedLink) return;
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  const copyFullMessage = async () => {
    const msg = getFullMessage();
    if (!msg) return;
    try {
      await navigator.clipboard.writeText(msg);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch (err) {
      console.error('Failed to copy message', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-serif text-center text-[#4a332f] mb-8">Wedding Invitation Link Generator</h1>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Prefix</label>
              <select
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white text-gray-900 focus:ring-2 focus:ring-[#bd6f56] focus:border-transparent outline-none transition-all"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Mr. & Mrs.">Mr. & Mrs.</option>
                <option value="Family">Family</option>
                <option value="Dear">Dear</option>
              </select>
            </div>
            
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Guest Name</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Sanjaya"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white text-gray-900 focus:ring-2 focus:ring-[#bd6f56] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGenerate}
              className="px-8 py-3 bg-[#bd6f56] text-white font-bold rounded-xl hover:bg-[#a65f49] transition-colors shadow-md"
            >
              Generate Link
            </button>
          </div>

          {generatedLink && (
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Invitation Message</h2>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-gray-800 whitespace-pre-wrap font-sans text-sm leading-relaxed mb-6">
                {getFullMessage()}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={copyLink}
                  className="flex-1 px-6 py-3 bg-white border-2 border-[#bd6f56] text-[#bd6f56] font-bold rounded-xl hover:bg-orange-50 transition-colors"
                >
                  {copiedLink ? '✓ Link Copied!' : 'Copy Link Only'}
                </button>
                <button
                  onClick={copyFullMessage}
                  className="flex-1 px-6 py-3 bg-[#bd6f56] text-white font-bold rounded-xl hover:bg-[#a65f49] transition-colors shadow-md"
                >
                  {copiedMessage ? '✓ Message Copied!' : 'Copy Full Message'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
