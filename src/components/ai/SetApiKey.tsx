import { CustomButton } from "@components/common/material-ui";
import { CustomInput } from "@components/common/material-ui/CustomInput";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AIPlaygroundInterface } from "@interfaces/ai/AIPlaygroundInterface";
import { BaseLayout } from "@layouts/BaseLayout";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { setApiKey } from "@store/reducers/ai/AIPlaygroundReducer";
import { logger } from "@utils/logger";
import { useForm, SubmitHandler, SubmitErrorHandler, Controller } from "react-hook-form";

export function SetApiKey() {
    const apiKey = useAppSelector((state) => state.aiPlayground.apiKey);
    const dispatch = useAppDispatch();

    const {
        handleSubmit,
        control,
        formState: { isDirty, isValid },
    } = useForm<AIPlaygroundInterface>({
        mode: "onChange",
        defaultValues: {
            apiKey: "",
        },
    });

    const onSubmit: SubmitHandler<AIPlaygroundInterface> = (data, event) => {
        event?.preventDefault();
        logger.info("data:", data);
        dispatch(setApiKey(data.apiKey));
    };

    const onSubmitError: SubmitErrorHandler<AIPlaygroundInterface> = (errors) => {
        logger.error("errors:", errors);
    };

    const resetApiKey = () => {
        logger.info("resetApiKey");
        dispatch(setApiKey(''));
    };

    return (
        <>
            {apiKey && (<>
                <div className="bg-slate-600 text-white flex w-full items-end">
                    <div className="flex-1 pl-2 py-1">Api key: <span className="font-bold">{apiKey}</span></div>
                    <div className="ml-2">
                        <CustomButton className="bg-red-500 hover:bg-red-300 text-white" onClick={() => resetApiKey()}>
                            <FontAwesomeIcon icon={faClose} size="xl" />
                        </CustomButton>
                    </div>
                </div>
            </>)}
            {!apiKey && (<div className="min-h-full flex flex-wrap items-center w-full">
                <form onSubmit={(event) => {
                    void handleSubmit(onSubmit, onSubmitError)(event);
                }} className="w-full">
                    <h2>Please set a Open AI api key for continue</h2>
                    <div className="flex w-full items-end">
                        <div className="flex-1">
                            <Controller
                                control={control}
                                name="apiKey"
                                defaultValue={apiKey}
                                rules={{ required: true }}
                                render={({ field: { ref, ...field }, fieldState: { error } }) => (
                                    <>
                                        <CustomInput {...field} inputRef={ref} hookError={error} className="" placeholder="Open AI api key" />
                                    </>
                                )}
                            />
                        </div>
                        <div className="h-fit mb-1 ml-2">
                            <CustomButton className="mt-2" type="submit" disabled={!isDirty || !isValid}>
                                <FontAwesomeIcon icon={faCheck} size="lg" />
                            </CustomButton>
                        </div>
                    </div>
                </form>
            </div>)}
        </>
    );
}
