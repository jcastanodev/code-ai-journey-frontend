import { FormControl, Select, MenuItem, Button } from "@mui/material";
import { TextField, InputLabel } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

interface FormField {
    name: string;
    type: string;
    required: boolean;
    options?: string[];
}

interface Props {
    formFields: FormField[];
    onSubmit: SubmitHandler<FieldValues>;
}
export const DynamicForm = ({ formFields, onSubmit }: Props) => {
    const { control, handleSubmit } = useForm();

    const renderField = (formField: FormField) => {
        switch (formField.type) {
            case 'text':
                return (
                    <Controller
                        control={control}
                        name={formField.name}
                        rules={{ required: formField.required }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={field.name}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                        )}
                    />
                );
            case 'select':
                return (
                    <Controller
                        control={control}
                        name={formField.name}
                        rules={{ required: formField.required }}
                        render={({ field }) => (
                            <FormControl className="w-full" variant="outlined">
                                <InputLabel htmlFor={field.name}>{field.name}</InputLabel>
                                <Select {...field}>
                                    {!formField.required && (
                                        <MenuItem value="">
                                            None
                                        </MenuItem>)}
                                    {formField.options && formField.options.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {formFields.map((field) => (
                <div key={field.name}>{renderField(field)}</div>
            ))}
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};
