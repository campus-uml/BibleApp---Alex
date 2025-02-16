import * as matchers from "@testing-library/jest-dom/matchers";
import { config } from "dotenv";
import { expect, vi } from "vitest";
config();

expect.extend(matchers);

global.matchMedia = global.matchMedia || function() {
    return {
      matches: false, // Default: simulate a non-mobile view (can change to true for mobile)
      addListener: vi.fn(),
      removeListener: vi.fn(),
    };
  };
