import { bytesToHex as toHex, randomBytes } from '@noble/hashes/utils';
import {argon2id} from "@noble/hashes/argon2";

export function hashPassword(password: string): string {
	const salt = toHex(randomBytes(32));

	const result = argon2id(password, salt, { t: 2, m: 19456, p: 1 });

	return `${toHex(result)}.${salt}`
}

export function verifyPassword(password: string, hash: string): boolean {
	const split = hash.split('.');

	if (split.length != 2)
		return false;

	const result = argon2id(password, split[1], { t: 2, m: 19456, p: 1 });

	return toHex(result) == split[0];
}