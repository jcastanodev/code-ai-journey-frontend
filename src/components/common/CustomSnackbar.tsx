import { Button, Snackbar } from "@mui/material";
import React from "react";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
}
export function CustomSnackbar({ open, setOpen, message }: Props) {
    const onClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={onClose}
                message={message}
                action={(<React.Fragment>
                    <Button color="secondary" onClick={onClose}>
                        UNDO
                    </Button>
                </React.Fragment>)}
            />
        </div >
    );
}
