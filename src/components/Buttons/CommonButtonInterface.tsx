import { handleButtonOnClick } from "../../interfaces/common";

export interface IButtonProps {
    text: string
    action?: handleButtonOnClick
}

export interface IButton {
    (props:IButtonProps): JSX.Element
}