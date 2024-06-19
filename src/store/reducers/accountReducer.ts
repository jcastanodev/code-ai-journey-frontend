import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountInterface } from "@interfaces/account/AccountInterface";
import { SignInRequestInterface } from "@interfaces/account/SignInRequestInterface";
import { logger } from "@utils/logger";
import { DiscordAccountInterface } from "@interfaces/account/DiscordAccountInterface";

// Define a type for the slice state
export interface AccountState {
	isLogged: boolean;
	token: string;
	data?: AccountInterface;
	discord?: DiscordAccountInterface;
}

// Define the initial state using that type
const initialState: AccountState = {
	isLogged: false,
	token: "",
};

export const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		signInAccount: (state, action: PayloadAction<SignInRequestInterface>) => {
			logger.debug("signIn account: ", action.payload.email);
			// use user and password to sign in
			state.token = "token";
			state.isLogged = true;
			state.data = {
				email: action.payload.email,
			};
		},
		saveDiscordAccount: (state, action: PayloadAction<DiscordAccountInterface>) => {
			logger.debug("saveDiscord on account: ", action.payload.code);
			state.discord = {
				code: action.payload.code,
				guild_id: action.payload.guild_id,
			};
		},
		logoutAccount: (state) => {
			logger.debug("logout account");
			state.token = "";
			state.isLogged = false;
			state.data = undefined;
		},
	},
});

export const { signInAccount, saveDiscordAccount, logoutAccount } = accountSlice.actions;

export default accountSlice.reducer;
