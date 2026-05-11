# Architecture & Technical Details

## Project Structure

```
app/
├── page.tsx              # Home page - navigation hub
├── encoder/page.tsx      # Encoder UI - client component
├── decoder/page.tsx      # Decoder UI - client component
└── layout.tsx            # Root layout with metadata

lib/
└── steganography.ts      # Core encoding/decoding functions

public/                   # Static assets
```

## Core Algorithm

### Encoding Flow
1. **Binary Conversion**: Secret text → 8-bit binary
   - Example: "A" (ASCII 65) → "01000001"
   
2. **Zero-Width Mapping**: Binary → Invisible Unicode
   - `1` → U+200B (Zero-Width Space)
   - `0` → U+200C (Zero-Width Non-Joiner)
   
3. **Distribution**: Evenly spread invisible chars throughout cover text
   - Calculated positions to preserve bit order on extraction
   - Sequential distribution (not random) ensures correct decoding

4. **Concatenation**: Merge cover text with injected invisible characters

### Decoding Flow
1. **Extraction**: Scan text for invisible Unicode characters
2. **Binary Reconstruction**: U+200B → "1", U+200C → "0"
3. **ASCII Conversion**: 8-bit chunks → characters
4. **Return**: Decoded secret message

## Key Functions

### `stringToBinary(str: string): string`
Converts each character to 8-bit binary representation.
```
"hi" → "0110100001101001" (16 bits)
```

### `binaryToZeroWidth(binary: string): string`
Maps binary digits to invisible Unicode characters.
```
"01010100" → "​‌​‌​‌‌‌" (invisible!)
```

### `encodeMessage(secret: string, coverText: string): string`
Main encoding function - orchestrates binary conversion, zero-width mapping, and distribution.

### `decodeMessage(encodedText: string): string`
Main decoding function - extracts invisible chars and reverses the process.

## Technical Decisions

### Sequential Distribution (Not Random)
- Invisible characters are placed at calculated positions proportional to cover text length
- Ensures extraction order matches insertion order
- Previous implementation used random positions (bug) - now fixed

### Client-Side Only
- All processing in browser via React hooks (useState)
- No server calls needed
- Invisible characters survive copy-paste operations

### 8-Bit ASCII
- Each character uses exactly 8 bits (1 byte)
- Supports standard ASCII (0-127), extended ASCII (0-255)
- Expandable to Unicode if needed

## Performance Characteristics

| Operation | Complexity | Notes |
|-----------|-----------|-------|
| Binary conversion | O(n) | n = length of secret |
| Distribution | O(n + m) | n = secret bits, m = cover length |
| Extraction | O(n) | n = total encoded text length |
| Overall | O(n + m) | Linear time |

## Testing Strategy

Manual test cases verify:
- Single character secrets
- Multi-character secrets  
- Special characters
- Edge cases (very long/short cover text)
- Encode → Decode round-trip correctness

Example test:
```
Secret: "Test"
Cover: "Hello world"
Encoded: "Hello world" (32 invisible bits injected)
Decoded: "Test" ✓
```

## Browser Compatibility

- Modern browsers with Unicode support
- Tested on: Chrome, Firefox, Safari, Edge
- Zero-width characters preserved in:
  - Copy/paste operations
  - Text inputs/textareas
  - clipboard API

## Security Considerations

- **Steganography only**: Hides data, doesn't encrypt it
- **Deniability**: Encoded text appears normal
- **Not cryptographic**: Don't use for sensitive data without encryption
- **Observable bits**: Binary pattern could be analyzed if detected
