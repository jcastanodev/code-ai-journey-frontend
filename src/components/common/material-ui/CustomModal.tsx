import React from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";
import { Dialog, DialogProps } from "@mui/material";

export class CustomModal extends React.Component<DialogProps> {
    render(): React.ReactNode {
        const { children, ...restProps } = this.props;
        const className: string = twMerge(
            "max-h-screen",
            this.props.className
                ? this.props.className
                : (this.props.slotProps?.root?.className as ClassNameValue)
        );

        return (
            <Dialog
                {...restProps}
                className={className}>
                <div className="min-w-[200] overflow-auto max-w-5xl bg-white/90 dark:bg-black/80">
                    {children}
                </div>
            </Dialog>
        );
    }
}
