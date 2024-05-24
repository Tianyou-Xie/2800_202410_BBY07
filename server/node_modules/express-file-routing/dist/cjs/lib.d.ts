import type { File, Route } from "./types";
/**
 * Recursively walk a directory and return all nested files.
 *
 * @param directory The directory path to walk recursively
 * @param tree The tree of directories leading to the current directory
 *
 * @returns An array of all nested files in the specified directory
 */
export declare const walkTree: (directory: string, tree?: string[]) => File[];
/**
 * Generate routes from an array of files by loading them as modules.
 *
 * @param files An array of files to generate routes from
 *
 * @returns An array of routes
 */
export declare const generateRoutes: (files: File[]) => Promise<Route[]>;
