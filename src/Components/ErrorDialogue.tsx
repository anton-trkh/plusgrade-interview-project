import { Dialog, DialogTitle } from "@mui/material";
import { ErrorKind } from "../Enums/ErrorReducer";

interface IErrorDialogue{
    error: ErrorKind;
    setError: React.Dispatch<ErrorKind>
}

export default function ErrorDialogue({
    error,
    setError
}: IErrorDialogue) {
    return(
        <Dialog
            open={error != ErrorKind.NONE}
            onClose={() => setError(ErrorKind.NONE)}
        >
            <DialogTitle>
                {error == ErrorKind.NOT_FOUND && 'Specified tax year has not been found, please try a different year.'}
                {error == ErrorKind.INTERNAL_SERVER_ERROR && 'A server error has occurred. Please try again later.'}
                {error == ErrorKind.UNKNOWN && 'An unknown error has occurred. Check your connection and try again.'}
            </DialogTitle>
        </Dialog>
    );
}