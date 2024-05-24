/**
 * Returns the given string with all whitespace dashed out
 * and in lower case.
 *
 * @param s the string to slugify
 * @returns the slugified string
 */
export function createSlug(s: string) {
	return s.toLowerCase().replace(/\s+/g, '-');
}
