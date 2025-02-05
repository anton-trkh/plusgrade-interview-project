import { createContext } from "react";
import { ErrorKind } from "../Enums/ErrorReducer";

export interface IErrorContext {
  dispatch: (errorKind: ErrorKind) => void
}
export const ErrorContext = createContext<IErrorContext>({
  dispatch: () => undefined
});