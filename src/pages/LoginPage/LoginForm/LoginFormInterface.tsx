import { handleButtonOnClick, handleInputOnChange } from "../../../interfaces/common"

export interface ILoginForm {
  (): JSX.Element
}

export interface ILoginInputValidator {
    (username: string, password:string): string
}
  
export interface IUseLoginFormHooks {
    (): { 
          data: {
            username: string, 
            password:string,
            error:string
          }, 
          methods: {
            handleUsernameInput: handleInputOnChange,
            handlePasswordInput: handleInputOnChange,
            handleLogin: handleButtonOnClick
          } 
      }
  }
  