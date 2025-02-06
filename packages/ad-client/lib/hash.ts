/**
 * MurmurHash3 implementation (32-bit) in TypeScript
 *
 * Based on the original implementation by Austin Appleby
 * https://github.com/aappleby/smhasher
 */

// Constants for hashing

// biome-ignore lint/nursery/noEnum: <explanation>
enum MurmurConstants {
  C1 = 0xcc9e2d51,
  C2 = 0x1b873593,
  R1 = 15,
  R2 = 13,
  M = 5,
  N = 0xe6546b64,
  DEFAULT_SEED = 789,
}

// Configuration interface for hash options
interface HashConfig {
  seed?: number;
  encoding?: 'hex' | 'decimal';
}

// Default configuration
const DEFAULT_CONFIG: Required<HashConfig> = {
  seed: MurmurConstants.DEFAULT_SEED,
  encoding: 'hex',
};

/**
 * Convert string to UTF-8 byte array
 * @param str - Input string to convert
 * @returns UTF-8 byte array
 */
function stringToUTF8Array(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

/**
 * Multiply two 32-bit integers and return lower 32 bits
 * @param m - First number
 * @param n - Second number
 * @returns Lower 32 bits of multiplication
 */
function multiply32(m: number, n: number): number {
  return (m & 0xffff) * n + ((((m >>> 16) * n) & 0xffff) << 16);
}

/**
 * Rotate a 32-bit number left by the specified number of bits
 * @param x - Number to rotate
 * @param r - Number of bits to rotate by
 * @returns Rotated number
 */
function rotateLeft32(x: number, r: number): number {
  return (x << r) | (x >>> (32 - r));
}

/**
 * Process a single 32-bit block
 * @param k - Block to process
 * @returns Processed block
 */
function fmix32(k: number): number {
  let result = k;
  result ^= result >>> 16;
  result = multiply32(result, 0x85ebca6b);
  result ^= result >>> 13;
  result = multiply32(result, 0xc2b2ae35);
  result ^= result >>> 16;
  return result;
}

/**
 * Calculate MurmurHash3 for a string
 * @param key - String to hash
 * @param config - Optional configuration object
 * @returns Hash value as hex string or number
 * @throws Error if invalid encoding is specified
 */
function murmur3(
  key: string | { [key: string]: unknown },
  config?: HashConfig
): string | number {
  const { seed, encoding } = { ...DEFAULT_CONFIG, ...config };
  let keyString: string;
  if (typeof key === 'object') {
    keyString = JSON.stringify(key);
  } else {
    keyString = key;
  }
  const data: Uint8Array = stringToUTF8Array(keyString);
  const blocks: number = Math.floor(data.length / 4);
  let hash: number = seed;

  // Process 4-byte blocks
  for (let i = 0; i < blocks; i++) {
    let k1: number =
      (data[i * 4] & 0xff) |
      ((data[i * 4 + 1] & 0xff) << 8) |
      ((data[i * 4 + 2] & 0xff) << 16) |
      ((data[i * 4 + 3] & 0xff) << 24);

    k1 = multiply32(k1, MurmurConstants.C1);
    k1 = rotateLeft32(k1, MurmurConstants.R1);
    k1 = multiply32(k1, MurmurConstants.C2);

    hash ^= k1;
    hash = rotateLeft32(hash, MurmurConstants.R2);
    hash = multiply32(hash, MurmurConstants.M) + MurmurConstants.N;
  }

  // Process remaining bytes
  let k1 = 0;
  const remainder: number = data.length % 4;
  const offset: number = blocks * 4;

  // biome-ignore lint/style/useDefaultSwitchClause: <explanation>
  switch (remainder) {
    // biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
    case 3:
      k1 ^= data[offset + 2] << 16;
    // biome-ignore lint/suspicious/noFallthroughSwitchClause: <explanation>
    case 2:
      k1 ^= data[offset + 1] << 8;
    case 1:
      // biome-ignore lint/style/useSingleCaseStatement: <explanation>
      k1 ^= data[offset];
      k1 = multiply32(k1, MurmurConstants.C1);
      k1 = rotateLeft32(k1, MurmurConstants.R1);
      k1 = multiply32(k1, MurmurConstants.C2);
      hash ^= k1;
  }

  // Finalization
  hash ^= data.length;
  hash = fmix32(hash);

  // Convert to unsigned 32-bit integer
  hash = hash >>> 0;

  // Return based on specified encoding
  switch (encoding) {
    case 'hex':
      return hash.toString(16).padStart(8, '0');
    case 'decimal':
      return hash;
    default:
      throw new Error(`Invalid encoding: ${encoding}`);
  }
}

/**
 * Create a hash function with fixed configuration
 * @param config - Configuration to apply to all hashes
 * @returns Configured hash function
 */
function createHasher(
  config: HashConfig = {}
): (key: string) => string | number {
  return (key: string) => murmur3(key, config);
}

export { createHasher, murmur3, type HashConfig };
