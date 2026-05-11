'use client';

import { useState } from 'react';
import Link from 'next/link';
import { encodeMessage } from '@/lib/steganography';

export default function EncoderPage() {
  const [secret, setSecret] = useState('');
  const [coverText, setCoverText] = useState('');
  const [encoded, setEncoded] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    setError('');
    setCopied(false);

    try {
      const result = encodeMessage(secret, coverText);
      setEncoded(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encoding failed');
      setEncoded('');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(encoded);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy to clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium mb-4 inline-block"
          >
            ← Back
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Encoder</h1>
          <p className="text-slate-300">
            Hide your secret message within visible text
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Secret Message Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Secret Message
            </label>
            <textarea
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter your secret message..."
              className="w-full h-24 p-3 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-xs text-slate-500 mt-1">
              {secret.length} characters
            </p>
          </div>

          {/* Cover Text Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Cover Text
            </label>
            <textarea
              value={coverText}
              onChange={(e) => setCoverText(e.target.value)}
              placeholder="Enter the visible text that will hide your message..."
              className="w-full h-24 p-3 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-xs text-slate-500 mt-1">
              {coverText.length} characters
            </p>
          </div>

          {/* Encode Button */}
          <button
            onClick={handleEncode}
            disabled={!secret || !coverText}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            Encode Message
          </button>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-300 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Encoded Output */}
          {encoded && (
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Encoded Text
              </label>
              <textarea
                value={encoded}
                readOnly
                className="w-full h-24 p-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 placeholder:text-slate-400 resize-none"
              />
              <p className="text-xs text-slate-500 mt-1">
                Your secret message is now hidden within this text as invisible characters.
              </p>
              <button
                onClick={handleCopy}
                className="mt-3 w-full py-2 px-4 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                {copied ? '✓ Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>1. Your secret message is converted to binary</li>
              <li>2. Binary digits are mapped to invisible Unicode characters</li>
              <li>3. These invisible characters are randomly injected into the cover text</li>
              <li>4. To someone reading it, it looks like normal text</li>
              <li>5. Copy the encoded text and share it - the secret is hidden!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
