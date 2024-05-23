import { type RouterOptions } from "express";
import type { Options } from "./types";
import createRouter from "./router";
export default createRouter;
export { createRouter };
/**
 * Routing middleware
 *
 * ```ts
 * app.use("/", await router())
 * ```
 *
 * @param options An options object (optional)
 */
export declare const router: (options?: Options & {
    routerOptions?: RouterOptions;
}) => Promise<import("express-serve-static-core").Router>;
export { Options };
