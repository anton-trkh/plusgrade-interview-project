import { createContext } from "react";
import { ErrorType } from "../Utils/ErrorType";

export interface IErrorContext {
  dispatch: (errorKind: ErrorType) => void
}
export const ErrorContext = createContext<IErrorContext>({
  dispatch: () => undefined
});