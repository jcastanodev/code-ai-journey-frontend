export const MapsUtil = {
	shortAddress: (address: string): string => {
        const addressFragment = address.split(",");
        if ((addressFragment.length - 2) >= 0) {
            return addressFragment.slice(0, addressFragment.length - 2).join(",");
        }
		return address;
	},
};
