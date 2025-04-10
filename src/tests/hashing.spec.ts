import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword } from '../../$lib/server/hashing.ts';

describe('verify test1', () => {
	it('tests verifyPassword for true', () => {
		expect(verifyPassword('password', hashPassword('password'))).toBe(true);
	});
});

describe('verify test2', () => {
	it('tests verifyPassword for false', () => {
		expect(verifyPassword('notpassword', hashPassword('password'))).toBe(false);
	});
});

