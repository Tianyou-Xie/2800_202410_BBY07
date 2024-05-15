declare module 'express-session' {
	interface SessionData {
		user: {
			id: string;
			email: string;
			userName: string;
		};
	}
}
