import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword } from '$lib/server/auth/hashing';
import { generateSecureToken } from '$lib/server/auth/session';

describe('verify hashpassword', () => {
	test('tests hashPassowrd should return a string', () => {
		expect(hashPassword('password')).toBeString();
	});
});
describe('verifyPassword test1', () => {
	it('tests verifyPassword for true', () => {
		expect(verifyPassword('password', hashPassword('password'))).toBe(true);
	});
});

describe('verifyPassword test2', () => {
	it('tests verifyPassword for false', () => {
		expect(verifyPassword('notpassword', hashPassword('password'))).toBe(false);
	});
});
describe('verify session token', () => {
	test('tests generateSecureToken should return a string', () => {
		expect(generateSecureToken()).toBeString();
	});
});