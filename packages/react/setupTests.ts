import { TextEncoder } from 'node:util';
import '@testing-library/jest-dom/vitest';

globalThis.TextEncoder = TextEncoder;

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});
