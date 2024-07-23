import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logger } from "@utils/logger";
import { ChatBotInterface, ChatBotMessageInterface, ChatBotTemplateInterface } from "@interfaces/ai/chatBot/ChatBotInterface";

const initialState: ChatBotInterface = {
    templates: [],
    history: [],
};

export const ChatBotSlice = createSlice({
    name: "ChatBot",
    initialState,
    reducers: {
        setHistory: (state, action: PayloadAction<ChatBotMessageInterface[]>) => {
            logger.info("setHistory: ", action.payload);
            state.history = action.payload;
        },
        addMessage: (state, action: PayloadAction<ChatBotMessageInterface>) => {
            logger.info("addMessage: ", action.payload);
            state.history = [...state.history, action.payload];
        },
        setCurrentTemplate: (state, action: PayloadAction<ChatBotTemplateInterface | undefined>) => {
            logger.info("setCurrentTemplate: ", action.payload);
            state.currentTemplate = action.payload;
        },
        setCurrentTemplateByName: (state, action: PayloadAction<string>) => {
            logger.info("setCurrentTemplate: ", action.payload);
            const newCurrentTemplate = state.templates.find((template) => template.name === action.payload);
            if (newCurrentTemplate) {
                state.currentTemplate = newCurrentTemplate;
            } else {
                state.currentTemplate = undefined;
            }
        },
        setTemplates: (state, action: PayloadAction<ChatBotTemplateInterface[]>) => {
            logger.info("setTemplates: ", action.payload);
            state.templates = action.payload;
        },
        addTemplate: (state, action: PayloadAction<ChatBotTemplateInterface>) => {
            logger.info("addTemplate: ", action.payload);
            state.templates = [...state.templates, action.payload];
        },
    },
});

export const { setHistory, addMessage, setCurrentTemplate, setCurrentTemplateByName, setTemplates, addTemplate } = ChatBotSlice.actions;

export default ChatBotSlice.reducer;
