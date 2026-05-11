'use client';

import { useState } from 'react';
import Link from 'next/link';
import { decodeMessage } from '@/lib/steganography';

export default function DecoderPage() {
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');
  const [error, setError] = useState('');

  const handleDecode = () => {
    setError('');
    setDecoded('');

    try {
      const result = decodeMessage(encoded);
      setDecoded(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Decoding failed');
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
          <h1 className="text-4xl font-bold text-white mb-2">Decoder</h1>
          <p className="text-slate-300">
            Reveal hidden messages from encoded text
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Encoded Text Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Paste Encoded Text
            </label>
            <textarea
              value={encoded}
              onChange={(e) => setEncoded(e.target.value)}
              placeholder="Paste the text that contains a hidden message..."
              className="w-full h-32 p-3 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
            <p className="text-xs text-slate-500 mt-1">
              {encoded.length} characters
            </p>
          </div>

          {/* Decode Button */}
          <button
            onClick={handleDecode}
            disabled={!encoded}
            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            Decode Message
          </button>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-300 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Decoded Output */}
          {decoded && (
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Secret Message Revealed!
              </label>
              <div className="w-full p-4 border border-green-300 rounded-lg bg-green-50">
                <p className="text-lg text-slate-900 font-mono wrap-break-word whitespace-pre-wrap">
                  {decoded}
                </p>
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">
                ✓ Successfully extracted the hidden message
              </p>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">How it works:</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>1. The encoded text contains both visible and invisible characters</li>
              <li>2. The invisible characters form a binary pattern</li>
              <li>3. This binary is converted back to the original secret message</li>
              <li>4. Only the hidden message is displayed - the cover text is discarded</li>
            </ul>
          </div>

          {/* Tips */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-2">Tips:</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• Make sure you copy the entire encoded text (including invisible characters)</li>
              <li>• The invisible characters are preserved when copy-pasting</li>
              <li>• Only the exact same text will decode correctly</li>
              <li>• The decoder will show an error if there are no hidden characters</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
