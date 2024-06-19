import { Button as BaseButton, ButtonProps } from "@mui/base";
import React from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface Props extends ButtonProps {
	color: "primary" | "secondary";
}
export class CustomButton extends React.Component<ButtonProps> {
	render(): React.ReactNode {
		const color = this.props.color ? this.props.color : "primary";
		const className: string = twMerge(
			`p-1 rounded cursor font-bold text-md text-title bg-${color} hover:bg-${color}-hover disabled:bg-gray-500 dark:disabled:bg-gray-500 disabled:cursor-not-allowed`,
			this.props.className
				? this.props.className
				: (this.props.slotProps?.root?.className as ClassNameValue)
		);

		return (
			<BaseButton
				{...this.props}
				slotProps={{
					...this.props.slotProps,
					root: {
						className,
					},
				}}
			/>
		);
	}
}
