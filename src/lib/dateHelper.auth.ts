import { describe, it, expect } from 'vitest';
import { toUTCDateString } from '$lib/server/dateHelper'

describe('test string convert', () => {
	test('tests toUTCDateString', () => {
        const date = new Date(2025, 3, 16, 10, 0, 0, 0);
		expect(toUTCDateString(date)).toBe('Wed Apr 16 2025');
	});
});