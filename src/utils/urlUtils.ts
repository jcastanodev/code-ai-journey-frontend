export const urlUtils = {
	getFragment: (url: string): string | undefined => {
		const urlFragment = url.split("#");
		return urlFragment.length > 0 ? urlFragment[1] : undefined;
	},
};
