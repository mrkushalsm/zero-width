/**
 * Steganography utilities for encoding/decoding secret messages
 * using invisible Unicode characters (Zero-Width Space and Zero-Width Non-Joiner)
 */

const ZERO_WIDTH_SPACE = '\u200B'; // Binary 1
const ZERO_WIDTH_NON_JOINER = '\u200C'; // Binary 0

/**
 * Convert a string to 8-bit binary representation
 */
export function stringToBinary(str: string): string {
  return Array.from(str)
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join('');
}

/**
 * Convert 8-bit binary string to a string
 */
export function binaryToString(binary: string): string {
  if (binary.length % 8 !== 0) {
    throw new Error('Invalid binary string: length must be multiple of 8');
  }

  let result = '';
  for (let i = 0; i < binary.length; i += 8) {
    const byte = binary.substring(i, i + 8);
    const charCode = parseInt(byte, 2);
    if (charCode === 0) {
      throw new Error('Invalid character encoding: null character detected');
    }
    result += String.fromCharCode(charCode);
  }
  return result;
}

/**
 * Convert binary string to zero-width characters
 * 1 -> Zero-Width Space
 * 0 -> Zero-Width Non-Joiner
 */
export function binaryToZeroWidth(binary: string): string {
  return binary
    .split('')
    .map((bit) => (bit === '1' ? ZERO_WIDTH_SPACE : ZERO_WIDTH_NON_JOINER))
    .join('');
}

/**
 * Convert zero-width characters back to binary
 */
export function zeroWidthToBinary(zeroWidth: string): string {
  return zeroWidth
    .split('')
    .map((char) => (char === ZERO_WIDTH_SPACE ? '1' : '0'))
    .join('');
}

/**
 * Encode a secret message into cover text using invisible Unicode characters
 * The invisible binary data is distributed evenly throughout the cover text
 * to preserve bit order on extraction
 */
export function encodeMessage(secret: string, coverText: string): string {
  if (!secret || !coverText) {
    throw new Error('Both secret message and cover text are required');
  }

  // Convert secret to binary
  const binary = stringToBinary(secret);

  // Convert binary to zero-width characters
  const zeroWidthData = binaryToZeroWidth(binary);

  // Split cover text into characters
  const coverChars = Array.from(coverText);
  const coverLength = coverChars.length;
  const zeroWidthLength = zeroWidthData.length;

  // Distribute zero-width characters evenly throughout cover text
  // This ensures they are extracted in the correct order (left to right)
  const result: string[] = [];

  if (coverLength > 0) {
    // Calculate positions to distribute zero-width chars evenly
    const positions: number[] = [];
    for (let i = 0; i < zeroWidthLength; i++) {
      // Distribute positions proportionally across the cover text
      const position = Math.floor((i / zeroWidthLength) * (coverLength + 1));
      positions.push(position);
    }

    // Build result by interleaving cover characters and zero-width characters
    let coverIdx = 0;
    let zeroWidthIdx = 0;
    let insertedCount = 0;

    for (let i = 0; i < coverLength + zeroWidthLength; i++) {
      // Check if we should insert a zero-width character at this position
      if (zeroWidthIdx < zeroWidthLength && positions[zeroWidthIdx] === insertedCount) {
        result.push(zeroWidthData[zeroWidthIdx]);
        zeroWidthIdx++;
      } else if (coverIdx < coverLength) {
        result.push(coverChars[coverIdx]);
        coverIdx++;
      }
      insertedCount++;
    }

    // Add any remaining cover characters
    while (coverIdx < coverLength) {
      result.push(coverChars[coverIdx]);
      coverIdx++;
    }

    // Add any remaining zero-width characters (should be at the end)
    while (zeroWidthIdx < zeroWidthLength) {
      result.push(zeroWidthData[zeroWidthIdx]);
      zeroWidthIdx++;
    }
  } else {
    // If cover text is empty, just use the zero-width data
    result.push(...zeroWidthData.split(''));
  }

  return result.join('');
}

/**
 * Decode a secret message from encoded text
 * Extracts invisible Unicode characters and converts back to readable text
 */
export function decodeMessage(encodedText: string): string {
  if (!encodedText) {
    throw new Error('Encoded text is required');
  }

  // Extract zero-width characters
  let zeroWidthData = '';
  for (const char of encodedText) {
    if (char === ZERO_WIDTH_SPACE || char === ZERO_WIDTH_NON_JOINER) {
      zeroWidthData += char;
    }
  }

  if (!zeroWidthData) {
    throw new Error('No hidden message found in the provided text');
  }

  // Convert zero-width characters back to binary
  const binary = zeroWidthToBinary(zeroWidthData);

  // Convert binary to string
  const secret = binaryToString(binary);

  return secret;
}
