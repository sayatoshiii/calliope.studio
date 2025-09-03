export const uuid = {
  v4: () => {
    const randomBytes = getBytesBrowser(16) ?? getBytesServer(16);
    if (!randomBytes)
      throw new Error('No secure RNG available in this environment... samsung smart fridge???');

    randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40;
    randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80;

    return Array.from({ length: 16 })
      .map((_, i) => `${HEX[randomBytes[i]]}${i === 3 || i === 5 || i === 7 || i === 9 ? '-' : ''}`)
      .join('');
  }
};

const HEX = Array.from({ length: 256 }).map((_, i) => (i + 0x100).toString(16).slice(1));

const getBytesBrowser = (length: number) => {
  if (typeof crypto === 'undefined' || !crypto?.getRandomValues) return false;
  return crypto.getRandomValues(new Uint8Array(length));
};

const getBytesServer = (length: number) => {
  if (typeof require !== 'function') return false;
  return require('crypto').randomBytes(length);
};
