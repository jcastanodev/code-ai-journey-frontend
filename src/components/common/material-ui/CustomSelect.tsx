import { FormLabel, InputLabel, MenuItem, Select, SelectProps } from "@mui/material";
import React, { RefObject } from "react";
import { FieldError } from "react-hook-form";
import { ClassNameValue, twMerge } from "tailwind-merge";

type Props = {
	options?: string[];
	hookError?: FieldError;
};

export class CustomSelect extends React.Component<SelectProps & Props> {
	ref: ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined;

	render(): React.ReactNode {
		const { value, defaultValue, options, hookError, ...restProps } = this.props;
		const isDarkMode = localStorage.getItem("darkMode") === "true";
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		const className: string = twMerge(
			`w-full text-black dark:text-white border ${hookError
			&& 'border-red-600 focus:shadow-[inset_0_0_8px_-2px_red]'
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
				<Select
					{...restProps}
					value={defaultValue ? defaultValue : ''}
					defaultValue={defaultValue ? defaultValue : ''}
					className={isDarkMode ? "dark" : ""}
					slotProps={{
						...this.props.slotProps,
						root: {
							className,
						},
					}}>
					<MenuItem value=''>None</MenuItem>
					{options?.map((opt, index) => (
						<MenuItem key={index} value={opt}>{opt}</MenuItem>
					))}
				</Select>
			</div>
		);
	}
}
