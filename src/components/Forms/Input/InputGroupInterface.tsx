import { handleInputOnChange } from "../../../interfaces/common"

export interface IInputGroupProps {
    label?: string
    input: string
    inputType?: string
    placeholder?:string
    action: handleInputOnChange
}

export interface IInputGroup {
    (props: IInputGroupProps): JSX.Element
}

export interface IUseInputGroupHooks {
    (): void
}