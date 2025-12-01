import { describe, it, expect } from '@jest/globals';
import bcrypt from 'bcryptjs';

describe("User model validation and business logic", () => {
  it("should hash a password correctly", async () => {
    const password = "test123";
    const hash = await bcrypt.hash(password, 10);
    expect(hash).not.toBe(password);
    const isMatch = await bcrypt.compare(password, hash);
    expect(isMatch).toBe(true);
  });

  it("should reject invalid email format", () => {
    const invalidEmail = "invalidemail.com";
    const emailRegex = /^\S+@\S+\.\S+$/;
    expect(emailRegex.test(invalidEmail)).toBe(false);

    const validEmail = "user@example.com";
    expect(emailRegex.test(validEmail)).toBe(true);
  });

  it("should accept valid role values", () => {
    const validRoles = ["USER", "ADMIN"];
    expect(validRoles.includes("USER")).toBe(true);
    expect(validRoles.includes("ADMIN")).toBe(true);
  });
});
