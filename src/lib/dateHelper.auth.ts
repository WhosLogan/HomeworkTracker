import { describe, it, expect } from 'vitest';
import { toUTCDateString } from '$lib/server/dateHelper'

const date = new Date(2025, 3, 16, 10, 0, 0, 0);

describe('test string convert', () => {
	test('tests toUTCDateString', () => {
		expect(toUTCDateString(date)).toBe('Wed Apr 16 2025');
	});
});