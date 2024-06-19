import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logger } from "@utils/logger";

// Define a type for the slice state
export interface AppSettingState {
	isDarkMode: boolean;
}

// Define the initial state using that type
const initialState: AppSettingState = {
	isDarkMode: false,
};

export const appSettingSlice = createSlice({
	name: "appSetting",
	initialState,
	reducers: {
		toogleDarkMode: (state) => {
			logger.debug("toogleDarkMode");
			state.isDarkMode = !state.isDarkMode;
		},
		setDarkMode: (state, action: PayloadAction<boolean>) => {
			logger.debug("setDarkMode to ", action.payload);
			state.isDarkMode = action.payload;
		},
	},
});

export const { toogleDarkMode, setDarkMode } = appSettingSlice.actions;

export default appSettingSlice.reducer;
