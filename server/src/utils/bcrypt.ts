import bc from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Hashes the given string with the default amount of salt rounds.
 *
 * @param str the string to hash
 * @returns the hashed string, with the salt included
 */
export async function createHash(str: string) {
	return await bc.hash(str, SALT_ROUNDS);
}

/**
 * Compares the given plaintext string to the given hashed string.
 *
 * @param plaintext the plaintext string
 * @param hashed the hashed string to compare against
 * @returns whether the two strings match
 */
export async function compareToHashed(plaintext: string, hashed: string) {
	return await bc.compare(plaintext, hashed);
}
