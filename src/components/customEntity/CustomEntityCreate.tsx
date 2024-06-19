import React from "react";
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch } from "@store/hooks";
import { fetch } from "@store/reducers/CustomEntity.reducer";
import { logger } from "@utils/logger";
import { CustomInput } from "@components/common/material-ui/CustomInput";
import { CustomButton } from "@components/common/material-ui/CustomButton";
import { CustomEntityInterface } from "@interfaces/customEntity/CustomEntity.interface";

export function CustomEntityCreate() {
	const dispatch = useAppDispatch();

	const {
		handleSubmit,
		control,
		formState: { isDirty, isValid },
	} = useForm<CustomEntityInterface>({
		mode: "onChange",
		defaultValues: {
			name: "",
			attributes: "",
			methods: "",
		},
	});

	const [firstSubmit, setFirstSubmit] = React.useState(false);

	const onSubmit: SubmitHandler<CustomEntityInterface> = (data, event) => {
		event?.preventDefault();
		logger.info("data:", data);
		dispatch(fetch(data));
	};

	const onSubmitError: SubmitErrorHandler<CustomEntityInterface> = (errors) => {
		logger.error("errors:", errors);
		setFirstSubmit(true);
	};

	return (
		<form
			onSubmit={(event) => {
				void handleSubmit(onSubmit, onSubmitError)(event);
			}}
			className="flex justify-center"
		>
			<div className="container flex flex-col gap-2 mx-2 rounded-t-none md:mx-4 bg-container md:p-4">
				<Controller
					control={control}
					name="name"
					defaultValue=""
					rules={{ required: true }}
					render={({ field: { ref, ...field }, fieldState: { error } }) => (
						<>
							<CustomInput {...field} inputRef={ref} hookError={error} placeholder="Name" />
						</>
					)}
				/>
				<Controller
					control={control}
					name="attributes"
					defaultValue=""
					rules={{ required: true }}
					render={({ field: { ref, ...field }, fieldState: { error } }) => (
						<>
							<CustomInput
								{...field}
								inputRef={ref}
								hookError={error}
								className=""
								placeholder="Attributes"
							/>
						</>
					)}
				/>
				<Controller
					control={control}
					name="methods"
					defaultValue=""
					rules={{ required: true }}
					render={({ field: { ref, ...field }, fieldState: { error } }) => (
						<>
							<CustomInput
								{...field}
								inputRef={ref}
								hookError={error}
								className=""
								placeholder="Methods"
							/>
						</>
					)}
				/>
				<CustomButton className="mt-2" type="submit" disabled={firstSubmit && (!isDirty || !isValid)}>
					Create
				</CustomButton>
			</div>
		</form>
	);
}
