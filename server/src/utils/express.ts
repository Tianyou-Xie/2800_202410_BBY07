import Joi from 'joi';
import { Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

/**
 * Represents the basic information included in a JSON response.
 */
interface BaseResponseBody {
	/** Whether the operation was a success or not, infered from the status. */
	success: boolean;

	/** The status code of the response. */
	statusCode: number;

	/** The status message of the response. */
	statusMessage: string;
}

interface SuccessResponseBody extends BaseResponseBody {
	success: true;

	/** The message to send along with the response, if needed. */
	message?: string;

	/** The value to send along with the response, if there is one. */
	value?: unknown;
}

interface FailureResponseBody extends BaseResponseBody {
	success: false;

	/** The error message provided to the client. */
	error: string;
}

/**
 * Represents the data sent with a response when using the resolver.
 */
type ResponseBody = SuccessResponseBody | FailureResponseBody;

/**
 * Utility class to resolve Express responses with a reponse body
 * template.
 */
export class Resolver {
	/**
	 * Represents the current body of this response resolver.
	 * This will be used when sending the request.
	 */
	private body: ResponseBody = Resolver.responseOf(StatusCodes.OK);

	/**
	 * Creates a new resolver with the specified response object.
	 * By default, the response is that of a `200 OK` status code.
	 */
	public constructor(private readonly res: Response) {}

	/**
	 * Indicates that the request went okay, and provided a value.
	 *
	 * @see {@link StatusCodes.OK}
	 * @param value the value to send along with the response
	 * @param message the optional message to send along with the response
	 */
	public okWith(value: unknown, message?: string) {
		this.body = Resolver.responseOf(StatusCodes.OK, message, value);
		this.send();
	}

	/**
	 * Indicates that the request went okay, but no value is provided.
	 *
	 * @see {@link StatusCodes.OK}
	 * @param message the optional message to send along with the response
	 */
	public ok(message?: string) {
		this.body = Resolver.responseOf(StatusCodes.OK, message);
		this.send();
	}

	/**
	 * Indicates that the request resulted in a resource creation.
	 *
	 * @see {@link StatusCodes.CREATED}
	 * @param value the optional value to send along with the response
	 * @param message the optional message to send along with the response
	 */
	public created(value?: unknown, message?: string) {
		this.body = Resolver.responseOf(StatusCodes.CREATED, message, value);
		this.send();
	}

	/**
	 * Indicates that, due to client error, the server cannot handle this request.
	 *
	 * @see {@link StatusCodes.BAD_REQUEST}
	 * @param message the message specifying further details about the failure
	 */
	public badRequest(message: string) {
		this.body = Resolver.responseOf(StatusCodes.BAD_REQUEST, message);
		this.send();
	}

	/**
	 * Semantically indicates that the client is not "authenticated",
	 * the identity of the client is unknown to the server.
	 *
	 * @see {@link StatusCodes.UNAUTHORIZED}
	 * @param message the message specifying further details about the failure
	 */
	public unauthorized(message?: string) {
		this.body = Resolver.responseOf(StatusCodes.UNAUTHORIZED, message);
		this.send();
	}

	/**
	 * Indicates that the client cannot access the resource they are trying
	 * to access with this request, but the server is aware of the identity
	 * of the client.
	 *
	 * @see {@link StatusCodes.FORBIDDEN}
	 * @param message the message specifying further details about the failure
	 */
	public forbidden(message?: string) {
		this.body = Resolver.responseOf(StatusCodes.FORBIDDEN, message);
		this.send();
	}

	/**
	 * Indicates that the server encountered some sort of error while processing
	 * the request.
	 *
	 * @see {@link StatusCodes.INTERNAL_SERVER_ERROR}
	 * @param message the message specifying further details about the failure
	 */
	public error(message?: string) {
		this.body = Resolver.responseOf(StatusCodes.INTERNAL_SERVER_ERROR, message);
		this.send();
	}

	/**
	 * Indicates that there is no resource where the client is trying
	 * to access one.
	 *
	 * @see {@link StatusCodes.NOT_FOUND}
	 * @param message the message specifying further details about the failure
	 */
	public notFound(message?: string) {
		this.body = Resolver.responseOf(StatusCodes.NOT_FOUND, message);
		this.send();
	}

	/**
	 * Indicates that there was a conflict with the current state of the resource.
	 *
	 * @see {@link StatusCodes.CONFLICT}
	 * @param message the  message specifying details about the conflict origins
	 */
	public conflict(message: string) {
		this.body = Resolver.responseOf(StatusCodes.CONFLICT, message);
		this.send();
	}

	/**
	 * Sends the response with the specified custom, but typed, body.
	 *
	 * @param body the body to send the response with
	 */
	public custom(body: ResponseBody) {
		this.body = body;
		this.send();
	}

	/**
	 * Sends the response, specifying the code and attaching the body.
	 * Only sends if the request is still writable.
	 *
	 * This is only needed if you need to send the default response on initiation,
	 * all other methods automatically send the response.
	 */
	public send() {
		if (this.res.writable) this.res.status(this.body.statusCode).json(this.body);
	}

	/**
	 * Returns a response body based on the specified code and details.
	 *
	 * @param code the status code of the response
	 * @param message the details of the response, depending on the status code, this will be `error` or `message`.
	 * @param value the value of the response, only inserted if the response is a success
	 * @returns the constructed response body
	 */
	public static responseOf(code: number | StatusCodes, message?: string, value?: unknown): ResponseBody {
		const statusCode = code;
		const statusMessage = getReasonPhrase(code);
		// Status code range: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
		const success = code < 300;

		const base = { statusCode, statusMessage, value };
		if (success) return { ...base, success: true, message };
		else return { ...base, success: false, error: message ?? statusMessage };
	}
}

/**
 * Creates a new resolver for the given response.
 *
 * This does not send the response, you must either use `send` or one
 * of the utility methods provided.
 *
 * @returns the resolver
 */
export function Resolve(res: Response) {
	return new Resolver(res);
}

/**
 * Given the specified request parameters, and a schema, this will ensure that the body of the request matches the schema.
 *
 * If it does not match, it will resolve the response with a status of `400`, with the Joi validation message as the error.
 *
 * @param req the request object
 * @param res the response object
 * @param schema the schema to validate the body against
 * @returns the validated value of the schema, or nothing if the validation failed and the response was resolved
 */
export function assertRequestBody<T>(req: Request, res: Response, schema: Joi.Schema<T>) {
	const bodyValidationResult = schema.validate(req.body);
	if (bodyValidationResult.error) return Resolve(res).badRequest(bodyValidationResult.error.message);
	else return bodyValidationResult.value;
}
