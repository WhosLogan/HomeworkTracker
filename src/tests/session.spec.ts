import { describe, it, expect } from 'vitest';
import { generateSecureToken } from '$lib/server/auth/hashing';

describe('verify test1', () => {
	it('tests verifyPassword for true', () => {
		expect(verifyPassword('password', hashPassword('password'))).toBe(true);
	});
});
