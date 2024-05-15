declare module 'express-session' {
	interface SessionData {
		user: {
			email: string;
			name: string;
		};
	}
}
