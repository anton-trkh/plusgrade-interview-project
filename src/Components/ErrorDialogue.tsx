import { Dialog, DialogTitle } from "@mui/material";
import { ErrorType } from "../Types/ErrorType";

interface IErrorDialogue{
    error: ErrorType;
    setError: React.Dispatch<ErrorType>
}

export default function ErrorDialogue({
    error,
    setError
}: IErrorDialogue) {
    return(
        <Dialog
            open={error != ErrorType.NONE}
            onClose={() => setError(ErrorType.NONE)}
        >
            <DialogTitle>
                {error == ErrorType.NOT_FOUND && 'Specified tax year has not been found, please try a different year.'}
                {error == ErrorType.INTERNAL_SERVER_ERROR && 'A server error has occurred. Please try again later.'}
                {error == ErrorType.UNKNOWN && 'An unknown error has occurred. Check your connection and try again.'}
            </DialogTitle>
        </Dialog>
    );
}