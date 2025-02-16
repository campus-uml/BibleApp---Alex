import * as matchers from "@testing-library/jest-dom/matchers";
import { config } from "dotenv";
import { expect } from "vitest";
config();

expect.extend(matchers);
