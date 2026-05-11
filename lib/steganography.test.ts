// Quick test to verify steganography functions work correctly
import { 
  stringToBinary, 
  binaryToString, 
  encodeMessage, 
  decodeMessage 
} from './steganography';

console.log('=== Testing Steganography Functions ===\n');

// Test 1: String to Binary and back
console.log('Test 1: String ↔ Binary Conversion');
const testString = 'hi';
const binary = stringToBinary(testString);
console.log(`  Input: "${testString}"`);
console.log(`  Binary: ${binary}`);
console.log(`  Binary length: ${binary.length} bits (${binary.length / 8} bytes)`);
const recovered = binaryToString(binary);
console.log(`  Recovered: "${recovered}"`);
console.log(`  ✓ Pass: ${testString === recovered}\n`);

// Test 2: Encode and Decode with simple inputs
console.log('Test 2: Encode and Decode');
const secret = 'hello';
const cover = 'Hello World';
try {
  const encoded = encodeMessage(secret, cover);
  console.log(`  Secret: "${secret}"`);
  console.log(`  Cover text: "${cover}"`);
  console.log(`  Encoded length: ${encoded.length} characters`);
  console.log(`  Encoded (visible part): "${encoded.replace(/[\u200B\u200C]/g, '')}"`);
  
  // Count invisible characters
  const zeroWidthCount = (encoded.match(/[\u200B\u200C]/g) || []).length;
  console.log(`  Invisible characters: ${zeroWidthCount}`);
  
  const decoded = decodeMessage(encoded);
  console.log(`  Decoded: "${decoded}"`);
  console.log(`  ✓ Pass: ${secret === decoded}\n`);
} catch (err) {
  console.log(`  ✗ Failed: ${err}\n`);
}

// Test 3: Longer secret message
console.log('Test 3: Longer Secret Message');
const longSecret = 'This is a secret!';
const longCover = 'The quick brown fox jumps over the lazy dog.';
try {
  const encoded = encodeMessage(longSecret, longCover);
  const decoded = decodeMessage(encoded);
  console.log(`  Secret: "${longSecret}"`);
  console.log(`  Decoded: "${decoded}"`);
  console.log(`  ✓ Pass: ${longSecret === decoded}\n`);
} catch (err) {
  console.log(`  ✗ Failed: ${err}\n`);
}

// Test 4: Special characters
console.log('Test 4: Special Characters');
const specialSecret = 'Test@123!';
const specialCover = 'Cover text here';
try {
  const encoded = encodeMessage(specialSecret, specialCover);
  const decoded = decodeMessage(encoded);
  console.log(`  Secret: "${specialSecret}"`);
  console.log(`  Decoded: "${decoded}"`);
  console.log(`  ✓ Pass: ${specialSecret === decoded}\n`);
} catch (err) {
  console.log(`  ✗ Failed: ${err}\n`);
}

console.log('=== All Tests Complete ===');
