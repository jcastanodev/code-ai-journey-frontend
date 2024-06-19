import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AIPlaygroundInterface } from "@interfaces/ai/AIPlaygroundInterface";
import { logger } from "@utils/logger";

const initialState: AIPlaygroundInterface = {
    apiKey: "",
};

export const AIPlaygroundSlice = createSlice({
    name: "AIPlayground",
    initialState,
    reducers: {
        setApiKey: (state, action: PayloadAction<string>) => {
            logger.debug("setApiKey: ", action.payload);
            state.apiKey = action.payload;
        },
    },
});

export const { setApiKey } = AIPlaygroundSlice.actions;

export default AIPlaygroundSlice.reducer;
