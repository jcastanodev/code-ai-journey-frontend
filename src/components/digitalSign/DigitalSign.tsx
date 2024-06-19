import React from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch } from "@store/hooks";
import { signInAccount } from "@store/reducers/accountReducer";
import { SignInRequestInterface } from "@interfaces/account/SignInRequestInterface";
import { logger } from "@utils/logger";
import { DynamicForm } from "@components/common/forms/DynamicForm";

export function DigitalSign() {
	const dispatch = useAppDispatch();

	const {
		handleSubmit,
		control,
		formState: { isDirty, isValid },
	} = useForm<SignInRequestInterface>({
		mode: "onChange",
		defaultValues: {
			email: "",
			password: "",
			terms_and_conditions: false,
		},
	});

	const [firstSubmit, setFirstSubmit] = React.useState(false);

	const onSubmit: SubmitHandler<SignInRequestInterface> = (data, event) => {
		event?.preventDefault();
		logger.info("data:", data);
		dispatch(signInAccount(data));
	};

	const onSubmitError: SubmitErrorHandler<SignInRequestInterface> = (errors) => {
		logger.error("errors:", errors);
		setFirstSubmit(true);
	};

	return (
		<>
			<form
				onSubmit={(event) => {
					void handleSubmit(onSubmit, onSubmitError)(event);
				}}
				className="flex flex-col gap-2 px-4 text-black bg-transparent dark:text-white"
			>
				<div className="container flex flex-col gap-4 my-2 bg-white/90 dark:bg-black/80">
					<h1>Digital Sign</h1>
				</div>
			</form>
			<DynamicForm formFields={[{ name: 'Name', type: 'text', required: true }]} onSubmit={(event) => { console.log(event) }} />
		</>
	);
}
