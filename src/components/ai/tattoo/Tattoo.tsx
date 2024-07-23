import { useAppDispatch, useAppSelector } from "@store/hooks";
import OpenAI from "openai";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { addMessage, setCurrentTemplate, setCurrentTemplateByName, setHistory } from "@store/reducers/ai/chatBot/ChatBotReducer";
import { CustomSelect } from "@components/common/material-ui/CustomSelect";
import { logger } from "@utils/logger";

export function Tattoo() {
    const apiKey = useAppSelector((state) => state.aiPlayground.apiKey);
    const [image, setImage] = useState(null);
    const [bodyPart, setBodyPart] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleBodyPartChange = (e) => {
        setBodyPart(e.target.value);
    };

    const generateTattooImage = async () => {
        if (!image || !bodyPart) {
            alert('Please select an image and a body part.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        const response = await openai.images.createVariation(formData, {
            prompt: `tattoo on ${bodyPart}`,
        });

        logger.info(response);

        setGeneratedImage(response.data.data[0].url);
    };


    const currentTemplate = useAppSelector((state) => state.chatBot.currentTemplate);
    const chatBotTemplates = useAppSelector((state) => state.chatBot.templates);
    const chatBotHistory = useAppSelector((state) => state.chatBot.history);
    const dispatch = useAppDispatch();
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
        <div className="mt-4 flex flex-col">
            <input type="file" onChange={handleImageChange} />
            <select onChange={handleBodyPartChange}>
                <option value="">Select body part</option>
                <option value="arm">Arm</option>
                <option value="back">Back</option>
                {/* Add more body parts as needed */}
            </select>
            {image && (
                <button onClick={generateTattooImage}>
                Generate tattoo image
                </button>
            )}
            {generatedImage && (
                <img src={generatedImage} alt="Generated tattoo" />
            )}
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
                </div>
            </div>
        </div>
    );
}
