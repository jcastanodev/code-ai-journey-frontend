import { useAppDispatch, useAppSelector } from "@store/hooks";
import OpenAI from "openai";
import { CustomButton, CustomInput } from "@components/common/material-ui";
import { Message } from "./Message";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { addMessage, setCurrentTemplate, setCurrentTemplateByName, setHistory, setTemplates } from "@store/reducers/ai/chatBot/ChatBotReducer";
import { CustomSelect } from "@components/common/material-ui/CustomSelect";
import React from "react";
import { ChatBotTemplate } from "./ChatBotTemplate";

export function ChatBot() {
    const apiKey = useAppSelector((state) => state.aiPlayground.apiKey);
    const currentTemplate = useAppSelector((state) => state.chatBot.currentTemplate);
    const chatBotTemplates = useAppSelector((state) => state.chatBot.templates);
    const chatBotHistory = useAppSelector((state) => state.chatBot.history);
    const dispatch = useAppDispatch();
    const [openChatBotTemplate, setOpenChatBotTemplate] = React.useState(false);
    const [editChatBotTemplate, setEditChatBotTemplate] = React.useState(false);
    const {
        control,
        getValues,
        setValue,
        formState: { isDirty, isValid },
    } = useForm<{ message: string, template: string }>({
        mode: "onChange",
        defaultValues: {
            message: '',
            template: '',
        },
    });
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

    const handleOpenChatBotTemplate = (edit: boolean = false) => {
        setEditChatBotTemplate(edit);
        setOpenChatBotTemplate(true);
    }

    const handleCloseChatBotTemplate = () => setOpenChatBotTemplate(false);

    const sendMessage = async () => {
        const message = getValues('message');
        if (message) {
            dispatch(addMessage({
                role: 'user',
                content: message,
                date: new Date().toDateString()
            }));
            setValue('message', '');
            const completion = await openai.chat.completions.create({
                messages: chatBotHistory.map((history) => ({ role: history.role, content: history.content })),
                model: "gpt-3.5-turbo",
            });
            if (completion && completion.choices) {
                const content = completion.choices[0].message.content;
                dispatch(addMessage({
                    role: 'assistant',
                    content: content ?? '',
                    date: new Date().toDateString()
                }));
            }
        }
    }

    const changeTemplate = async (event) => {
        if (event && event.target && event.target.value) {
            try {
                const value = event.target.value as string;
                if (value) {
                    await dispatch(setCurrentTemplateByName(value));
                } else {
                    await dispatch(setCurrentTemplate(undefined));
                }
            } catch (e) { }
        } else {
            await dispatch(setCurrentTemplate(undefined));
        }
    }

    const initHistory = () => {
        if (currentTemplate && chatBotHistory && chatBotHistory.length > 0) {
            if (chatBotHistory[0].content !== currentTemplate.content) {
                dispatch(setHistory([{
                    role: 'system',
                    content: currentTemplate.content,
                    date: new Date().toDateString()
                }]));
            }
            return;
        }
        dispatch(setHistory([]));
        setValue('message', '');
    }

    useEffect(() => {
        initHistory();
    }, [currentTemplate]);

    return (
        <div className="h-full mt-4 flex flex-col">
            <div className="flex-none">
                <div className="flex flex-row mb-4 w-full h-fit">
                    <div className="flex-1 mr-4">
                        <Controller
                            control={control}
                            name="template"
                            rules={{ required: false }}
                            render={({ field: { ref, ...field }, fieldState: { error } }) => (
                                <>
                                    <CustomSelect
                                        {...field}
                                        defaultValue={currentTemplate ? currentTemplate.name : ''}
                                        inputRef={ref}
                                        hookError={error}
                                        className=""
                                        placeholder="Select a template"
                                        options={chatBotTemplates ? chatBotTemplates.map((template) => template.name) : []}
                                        onChange={changeTemplate}
                                    />
                                </>
                            )}
                        />
                    </div>
                    {currentTemplate && (
                        <CustomButton color="secondary" onClick={() => handleOpenChatBotTemplate(true)} className="mr-2">
                            Edit template
                        </CustomButton>)}
                    <CustomButton onClick={() => handleOpenChatBotTemplate(false)}>
                        Add template
                    </CustomButton>
                </div>
            </div>
            <div className="flex-1">
                <div className="flex flex-col w-full h-full">
                    <div className="flex-1 overflow-y-auto">
                        <div className="flex flex-col gap-1">
                            {chatBotHistory.map((message, index) => (
                                <Message key={index} {...message} />
                            ))}
                        </div>
                    </div>
                    <div className="flex w-full justify-center my-2">
                        <CustomButton onClick={() => initHistory()}>
                            Reset
                        </CustomButton>
                    </div>
                    <div className="flex w-full items-end">
                        <div className="flex-1">
                            <Controller
                                control={control}
                                name="message"
                                defaultValue={apiKey}
                                rules={{ required: true }}
                                render={({ field: { ref, ...field }, fieldState: { error } }) => (
                                    <>
                                        <CustomInput {...field} inputRef={ref} hookError={error} className="" placeholder="Type here" />
                                    </>
                                )}
                            />
                        </div>
                        <div className="h-fit mb-1 ml-2">
                            <CustomButton className="" disabled={!isDirty || !isValid} onClick={() => sendMessage()}>
                                Send <FontAwesomeIcon icon={faCheck} size="lg" />
                            </CustomButton>
                        </div>
                    </div>
                </div>
            </div>
            <ChatBotTemplate edit={editChatBotTemplate} open={openChatBotTemplate} onClose={handleCloseChatBotTemplate} />
        </div>
    );
}
