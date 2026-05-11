import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-md w-full px-6 py-12 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Zero-Width</h1>
        <p className="text-slate-600 mb-8">
          Hide secret messages in plain text using invisible Unicode characters.
        </p>

        <div className="space-y-4">
          <Link
            href="/encoder"
            className="block w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Encode Message
          </Link>
          <Link
            href="/decoder"
            className="block w-full py-3 px-4 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors"
          >
            Decode Message
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            This tool uses steganography to hide binary data as invisible Unicode characters within visible text.
          </p>
        </div>
      </div>
    </div>
  );
}
