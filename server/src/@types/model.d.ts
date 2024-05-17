import { Types } from 'mongoose';

type AllowedTypes = undefined | string | boolean | number | Types.ObjectId | Date;
type TypeToPrimitive<T extends AllowedTypes> = T extends Types.ObjectId ? string : T extends Date ? number : T;

/**
 * Utility type to convert interfaces that represent a Mongoose document
 * into a JSON document.
 *
 * This represents a document as it may be submitted by a client for insertion.
 */
export type RawDocument<T> = {
	[K in keyof T]: T[K] extends AllowedTypes ? TypeToPrimitive<T[K]> : T[K] extends object ? RawDocument<T[K]> : never;
};
