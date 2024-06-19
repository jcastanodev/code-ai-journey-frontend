export const constantUtil = {
	DEFAULT_URL: "http://localhost:8000",
	AUTH_API_URL: (): string => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return (
				process.env.REACT_APP_AUTH_API_URL ??
				import.meta.env.REACT_APP_AUTH_API_URL ??
				constantUtil.DEFAULT_URL
			);
		} catch (e) {
			return constantUtil.DEFAULT_URL;
		}
	},
};
