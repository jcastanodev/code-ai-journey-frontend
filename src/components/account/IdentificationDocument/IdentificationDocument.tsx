import { useAppDispatch } from "@store/hooks";
import { signInAccount } from "@store/reducers/accountReducer";
import React from "react";
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import { SignInRequestInterface } from "@interfaces/account/SignInRequestInterface";
import { logger } from "@utils/logger";
import { CustomButton, CustomCheckbox, CustomInput } from "@components/common/material-ui";

export function IdentificationDocument() {
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
		if (unauthorizedRoute) {
			//redirect to unauthorizedRoute
		} else {
			//redirect to home
		}
	};

	const onSubmitError: SubmitErrorHandler<SignInRequestInterface> = (errors) => {
		logger.error("errors:", errors);
		setFirstSubmit(true);
	};

	return (
		<form
			onSubmit={(event) => {
				void handleSubmit(onSubmit, onSubmitError)(event);
			}}
			className="flex flex-col gap-2 px-4 mx-auto my-auto text-black bg-transparent dark:text-white"
		>
			<div className="container flex flex-col gap-4 my-2 bg-white/90 dark:bg-black/80">
				<Controller
					control={control}
					name="email"
					defaultValue=""
					rules={{ required: true }}
					render={({ field: { ref, ...field }, fieldState: { error } }) => (
						<>
							<CustomInput {...field} inputRef={ref} hookError={error} className="" placeholder="Email" />
						</>
					)}
				/>
				<Controller
					control={control}
					name="password"
					defaultValue=""
					rules={{ required: true }}
					render={({ field: { ref, ...field }, fieldState: { error } }) => (
						<>
							<CustomInput
								{...field}
								inputRef={ref}
								hookError={error}
								className=""
								placeholder="Password"
								type="password"
							/>
						</>
					)}
				/>
				<Controller
					control={control}
					name="terms_and_conditions"
					rules={{ required: true }}
					render={({ field, fieldState: { error } }) => (
						<>
							<CustomCheckbox {...field} hookError={error}>
								<p className="flex items-center text-sm antialiased font-normal leading-normal">
									I agree the
									<a
										className="font-medium transition-colors hover:text-blue-600 dark:hover:text-green-600"
										href="/terms_and_conditions"
									>
										&nbsp;Terms and Conditions
									</a>
								</p>
							</CustomCheckbox>
						</>
					)}
				/>
				<CustomButton type="submit" disabled={firstSubmit && (!isDirty || !isValid)}>
					Sign in
				</CustomButton>
				<p className="block text-base antialiased font-normal leading-relaxed text-center text-gray-800 dark:text-white">
					Want to create an account?
					<a
						className="ml-2 font-medium text-blue-600 hover:text-green-600 dark:text-green-600 dark:hover:text-blue-600 transition-colors"
						href="/sign-up"
					>
						Sign Up
					</a>
				</p>
			</div>
		</form>
	);
}
