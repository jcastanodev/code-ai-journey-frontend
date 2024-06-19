import { Input as BaseInput, InputProps } from "@mui/base";
import React, { RefObject } from "react";
import { FieldError } from "react-hook-form";
import { ClassNameValue, twMerge } from "tailwind-merge";

type Props = {
	label?: string;
	hookError?: FieldError;
};

export class CustomInput extends React.Component<InputProps & Props> {
	ref: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined;

	render(): React.ReactNode {
		const { label, hookError, inputRef, ...restProps } = this.props;
		const isDarkMode = localStorage.getItem("darkMode") === "true";
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		const className: string = twMerge(
			`w-full px-3 py-2 font-normal bg-transparent border rounded-md text-black dark:text-white placeholder:text-gray-500 outline-none ${
				hookError
					? "border-red-600 focus:shadow-[inset_0_0_8px_-2px_red]"
					: "border-gray-500 focus:border-blue-600 dark:focus:border-green-600 focus:shadow-[inset_0_0_10px_-5px_blue] dark:focus:shadow-[inset_0_0_10px_-2px_green] hover:border-blue-500 dark:hover:border-green-500"
			}`,
			this.props.className
				? this.props.className
				: (this.props.slotProps?.root?.className as ClassNameValue)
		);

		return (
			<div className="text-right">
				{hookError && (
					<span className="text-xs text-red-600">{hookError.type}</span>
				)}
				<BaseInput
					ref={this.ref}
					{...restProps}
					className={isDarkMode ? "dark" : ""}
					slotProps={{
						...this.props.slotProps,
						input: {
							className,
						},
					}}
				/>
				{label && <label>{label}</label>}
			</div>
		);
	}
}
