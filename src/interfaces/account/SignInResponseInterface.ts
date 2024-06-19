interface SignInResponseInterface {
	state: boolean;
	code: string;
	message: string;
	data: {
		token: string;
		expiresIn: string;
		user: {
			_id: string;
			name: string;
			email: string;
			password: string;
			verified: string;
		};
	};
}

export type { SignInResponseInterface };
