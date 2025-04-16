import { describe, it, expect } from 'vitest';
import { toUTCDateString } from '$lib/server/dateHelper'

describe('test string convert', () => {
    const utcTime = '2025-4-16T01:00:00.000z';
    const date = new Date(utcTime);
	test('tests toUTCDateString', () => {
		expect(toUTCDateString(date)).toBe('Wed Apr 16 2025');
	});
});