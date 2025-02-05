import { TextField } from "@mui/material";

interface ITextInput {
    error: boolean;
    helperText: string;
    errorText: string;
    value: string;
    callback: (value: string) => void
}

export default function TextInput ({error, helperText, errorText, value, callback}: ITextInput) {
    if (error) {
        return (
            <TextField
                data-testid="input-field"
                helperText={helperText}
                error
                label={errorText}
                value={value}
                onChange={(e) => {callback(e.target.value)}}
            />
        );
    }
    return (
        <TextField
            data-testid="input-field"
            helperText={helperText}
            value={value}
            onChange={(e) => {callback(e.target.value)}}
        />
    );
}