import { CustomSnackbar } from "@components/common/CustomSnackbar";
import { CustomInput, CustomCheckbox, CustomButton } from "@components/common/material-ui";
import { CustomModal } from "@components/common/material-ui/CustomModal";
import { ChatBotTemplateInterface } from "@interfaces/ai/chatBot/ChatBotInterface";
import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { addTemplate, setCurrentTemplate, setTemplates } from "@store/reducers/ai/chatBot/ChatBotReducer";
import { logger } from "@utils/logger";
import React, { useEffect } from "react";
import { SubmitHandler, SubmitErrorHandler, Controller, useForm } from "react-hook-form";

export interface CreateTemplateInterface extends ChatBotTemplateInterface {
    useThis: boolean;
}

interface Props {
    edit: boolean;
    open: boolean;
    onClose: () => void;
}
export function ChatBotTemplate({ edit, open, onClose }: Props) {
    const template = useAppSelector((state) => state.chatBot.currentTemplate);
    const templates = useAppSelector((state) => state.chatBot.templates);
    const dispatch = useAppDispatch();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const msgSnackbar = 'Name is already on use!';

    const {
        handleSubmit,
        setValue,
        setError,
        control,
        formState: { isDirty, isValid },
    } = useForm<CreateTemplateInterface>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            content: '',
            useThis: false,
        },
    });

    const onSubmit: SubmitHandler<CreateTemplateInterface> = (data, event) => {
        event?.preventDefault();
        if (edit) {
            let templatesEdited = templates;
            templatesEdited = templatesEdited.map((template) => {
                if (template.id === data.id) {
                    return data;
                }
                return template;
            });
            dispatch(setTemplates(templatesEdited));
        } else {
            for (let i = 0; i < templates.length; i++) {
                if (templates[i].name === data.name) {
                    setError('name', { message: msgSnackbar });
                    setOpenSnackbar(true);
                    return;
                }
            }
            data.id = templates.length > 0 ? (templates[templates.length - 1].id ?? 1) + 1 : 1;
            dispatch(addTemplate(data));
        }
        if (data.useThis) {
            dispatch(setCurrentTemplate(data));
        }
        logger.info("data:", data);
        onClose();
    };

    const onSubmitError: SubmitErrorHandler<CreateTemplateInterface> = (errors) => {
        logger.error("errors:", errors);
    };

    useEffect(() => {
        if (edit) {
            setValue('name', template?.name ?? '');
            setValue('content', template?.content ?? '');
        } else {
            setValue('name', '');
            setValue('content', '');
        }
    }, [template, edit]);

    return (
        <CustomModal open={open} onClose={onClose}>
            <form
                onSubmit={(event) => {
                    void handleSubmit(onSubmit, onSubmitError)(event);
                }}
                className="container"
            >
                <div className="flex flex-col gap-4 my-2">
                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: true }}
                        render={({ field: { ref, ...field }, fieldState: { error } }) => (
                            <>
                                <CustomInput
                                    {...field}
                                    inputRef={ref}
                                    hookError={error}
                                    className=""
                                    placeholder="Name"
                                />
                            </>
                        )}
                    />
                    <Controller
                        control={control}
                        name="content"
                        rules={{ required: true }}
                        render={({ field: { ref, ...field }, fieldState: { error } }) => (
                            <>
                                <TextField
                                    {...field}
                                    className="text-white dark:text-white placeholder:text-gray-500"
                                    inputRef={ref}
                                    placeholder="Template"
                                    multiline
                                    rows={4}
                                />
                            </>
                        )}
                    />
                    <Controller
                        control={control}
                        name="useThis"
                        rules={{ required: false }}
                        render={({ field, fieldState: { error } }) => (
                            <>
                                <CustomCheckbox {...field} hookError={error}>
                                    <p className="flex items-center text-sm antialiased font-normal leading-normal">
                                        Use this template
                                    </p>
                                </CustomCheckbox>
                            </>
                        )}
                    />
                    <CustomButton type="submit" disabled={!isDirty || !isValid}>
                        {edit ? "Edit template" : "Add template"}
                    </CustomButton>
                </div>
            </form>
            <CustomSnackbar open={openSnackbar} setOpen={setOpenSnackbar} message={msgSnackbar} />
        </CustomModal>
    );
}
