export interface ChatBotInterface {
    currentTemplate?: ChatBotTemplateInterface;
    templates: ChatBotTemplateInterface[];
    history: ChatBotMessageInterface[];
}

export interface ChatBotMessageInterface {
    role: 'system' | 'assistant' | 'user';
    content: string;
    date: string;
}

export interface ChatBotTemplateInterface {
    id: number;
    name: string;
    content: string;
}
