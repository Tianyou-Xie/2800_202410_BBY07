import morgan from 'morgan';
import pc from 'picocolors';

/**
 * Middleware to log requests with some parameters to the console. Used for
 * debugging and inspection.
 */
export const requestLogger = morgan((tokens, req, res) => {
	const responseCode = parseInt(tokens.status(req, res) || '');
	const responseTime = parseInt(tokens['response-time'](req, res) || '');
	return `${pc.blue(tokens.method(req, res))} ${pc.bold('@')} ${pc.blue(tokens.url(req, res))} ${pc.bold('|>')} ${
		isNaN(responseCode)
			? pc.strikethrough(pc.red('Response Code'))
			: responseCode < 200
			? pc.blue(responseCode)
			: responseCode < 400
			? pc.green(responseCode)
			: pc.red(responseCode)
	} in ${
		isNaN(responseTime)
			? pc.strikethrough(pc.red('Response Time'))
			: responseTime < 100
			? pc.green(responseTime)
			: responseTime < 150
			? pc.yellow(responseTime)
			: pc.red(responseTime)
	}ms`;
});
