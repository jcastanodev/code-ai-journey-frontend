import React from "react";
import { ControllerRenderProps, FieldError } from "react-hook-form";

export class CustomCheckbox extends React.Component<
	ControllerRenderProps & { children: React.ReactNode; hookError?: FieldError; 'stroke-width'?: number }
> {
	render(): React.ReactNode {
		const { children, hookError, ...field } = this.props;

		return (
			<div className="flex flex-col text-right">
				{this.props.hookError && (
					<span className="text-xs text-red-600">{this.props.hookError.type}</span>
				)}
				<div className="inline-flex items-center">
					<label
						className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
						htmlFor="checkbox"
						data-ripple-dark="true"
					>
						<input
							type="checkbox"
							className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-blue-600 checked:before:bg-blue-600 dark:checked:bg-green-600 dark:checked:before:bg-green-600 hover:before:opacity-10"
							{...field}
						/>
						<span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-3.5 w-3.5"
								viewBox="0 0 20 20"
								fill="currentColor"
								stroke="currentColor"
								stroke-width="1"
							>
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"
								></path>
							</svg>
						</span>
					</label>
					<label
						className="mt-px font-light text-gray-800 cursor-pointer select-none dark:text-white"
						htmlFor="checkbox"
					>
						{children}
					</label>
				</div>
			</div>
		);
	}
}
function useController(arg0: { control: any; name: void }): { field: any } {
	throw new Error("Function not implemented.");
}

function render() {
	throw new Error("Function not implemented.");
}
