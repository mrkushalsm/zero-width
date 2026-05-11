# Zero-Width Steganography

A modern web application for encoding and decoding secret messages using invisible Unicode characters. Hide confidential text within normal-looking cover text - perfect for covert communication!

## 🎯 What is This?

**Steganography** is the art of hiding messages in plain sight. This app uses Unicode's invisible characters to embed binary-encoded secrets into ordinary text. To the naked eye, the text looks completely normal - but the hidden message is preserved and can be decoded later.

### The Magic ✨
- **Secret Message** → Convert to binary → Map to invisible Unicode characters → **Inject into cover text**
- **Encoded Text** (looks normal) → **Extract invisible characters** → Convert from binary → **Reveal secret**

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production
```bash
npm run build
npm start
```

## 📖 How to Use

### Encoding a Message
1. Go to `/encoder`
2. Enter your **Secret Message** (e.g., "Hello secret world!")
3. Enter **Cover Text** (e.g., "Hello world")
4. Click **Encode Message**
5. Copy the output (invisible characters are embedded)
6. Share the encoded text - it looks like normal text!

### Decoding a Message
1. Go to `/decoder`
2. Paste the **Encoded Text** (with hidden message)
3. Click **Decode Message**
4. Your secret is revealed! 🎉

## 🔧 Technical Details

### Technology Stack
- **Framework**: Next.js 16.2.6 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Runtime**: React 19.2.4

For detailed architecture and algorithm explanation, see [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## 📁 Project Structure

```
app/
├── page.tsx              # Home page with navigation
├── encoder/page.tsx      # Encoder interface
├── decoder/page.tsx      # Decoder interface
└── layout.tsx            # Root layout

lib/
├── steganography.ts      # Core encoding/decoding logic
└── steganography.test.ts # Test reference file

public/                   # Static assets
```

## 🧪 Example

**Encoding:**
- Secret: `"Test"`
- Cover: `"Hello world"`
- Result: `"Hello world"` (with 32 invisible characters embedded)

**Decoding:**
- Input: `"Hello world"` (from above)
- Result: `"Test"` ✓

## 🔐 Security Notes

⚠️ **Important**: This is **steganography** (hiding), not **cryptography** (securing).
- Messages are embedded but not encrypted
- For sensitive data, combine with encryption for maximum security
- This is a proof-of-concept demonstration
- Invisible characters are preserved through copy-paste operations

## 📚 Documentation

- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Technical details, algorithm explanation, and performance notes

## 🛠️ Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### File Structure
- `app/` - Next.js App Router pages and layouts
- `lib/` - Utility functions and core logic
- `public/` - Static assets
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `next.config.ts` - Next.js configuration

## 🚀 Deployment

This app is ready to deploy to any platform that supports Next.js:
- **Vercel** (recommended) - [Deploy now](https://vercel.com/new)
- **Netlify**
- **Docker** containers
- **Traditional servers** (Node.js)

## 📝 License

MIT - Feel free to use and modify!
