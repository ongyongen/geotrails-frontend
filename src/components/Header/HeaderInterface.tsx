import { IHandleNavigate } from "../../interfaces/common"

export interface IHeader {
    (): JSX.Element
}

export interface ILogout {
    (): void
}

export interface IUseHeaderHooks {
    (): {
        methods : {
            handleNavigate:IHandleNavigate
            logout:ILogout
        }
    }
}
