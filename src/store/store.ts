import { configureStore, StateFromReducersMapObject } from "@reduxjs/toolkit";
import accountReducer from "@store/reducers/accountReducer";
import appSettingReducer from "@store/reducers/appSettingReducer";
import AIPlaygroundReducer from "./reducers/ai/AIPlaygroundReducer";
import { logger } from "@utils/logger";
import ChatBotReducer from "./reducers/ai/chatBot/ChatBotReducer";
import MapsReducer from "./reducers/MapsReducer";

const reducer = {
	appSetting: appSettingReducer,
	account: accountReducer,
	aiPlayground: AIPlaygroundReducer,
	chatBot: ChatBotReducer,
	maps: MapsReducer,
};

export type RootState = StateFromReducersMapObject<typeof reducer>;

export function loadState(): RootState | undefined {
	try {
		logger.info("loadState");
		const serializedState = localStorage.getItem("redux");
		logger.info("serializedState: ", serializedState);
		if (!serializedState) {
			return undefined;
		}

		return JSON.parse(serializedState) as RootState;
	} catch (e) {
		logger.error("error serializedState: ", e);

		return undefined;
	}
}

export function saveState(state: RootState): void {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem("redux", serializedState);
	} catch (e) {
		logger.error("saveState error", e);
	}
}

export const store = configureStore({
	reducer,
	devTools: true,
	preloadedState: loadState(),
});

export type AppDispatch = typeof store.dispatch;
