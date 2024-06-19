import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountInterface } from "@interfaces/account/AccountInterface";
import { logger } from "@utils/logger";
import { CustomEntityInterface } from "@interfaces/customEntity/CustomEntity.interface";

export interface CustomEntityState {
	isLogged: boolean;
	token: string;
	data?: AccountInterface;
}

const initialState: CustomEntityState = {
	isLogged: false,
	token: "",
};

export const customEntitySlice = createSlice({
	name: "customEntity",
	initialState,
	reducers: {
		fetch: (state, action: PayloadAction<CustomEntityInterface>) => {
			logger.debug("fetch: ", action.payload.name);
		},
		create: (state) => {
			logger.debug("create: ");
		},
	},
});

export const { fetch, create } = customEntitySlice.actions;

export default customEntitySlice.reducer;
