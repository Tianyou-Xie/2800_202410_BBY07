/**
 * Escapes any special characters that would modify a regular expression.
 *
 * Source: https://github.com/component/escape-regexp/blob/master/index.js
 *
 * @param str the string to escape
 * @returns the escaped string
 */
export function escapeRegex(str: string) {
	return str.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&');
}
