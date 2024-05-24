import { Ref, RefObject } from 'react';

/**
 * Helper function to use a ref value if it exists.
 *
 * @param ref the ref to use
 * @param cb the operation to perform with the current value
 */
export function withRef<T, R>(ref: RefObject<T>, cb: (value: T) => R) {
	const current = ref.current;
	if (!current) return;
	return cb(current);
}
