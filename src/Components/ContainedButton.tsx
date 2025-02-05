import { Button } from "@mui/material";

interface IContainedButton {
    isButtonEnabled: boolean;
    text: string;
    handleSubmit: () => void;
}

export default function ContainedButton({
    handleSubmit,
    text,
    isButtonEnabled
}: IContainedButton) {
    return(
        <Button
            variant="contained" 
            onClick={handleSubmit}
            disabled={!isButtonEnabled}
        >
            {text}
        </Button>
    );
}