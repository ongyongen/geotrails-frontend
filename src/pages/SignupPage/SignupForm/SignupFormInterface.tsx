import React from "react"
import { handleButtonOnClick, handleInputOnChange } from "../../../interfaces/common"

export interface ISignupForm {
  (): JSX.Element
}

export interface ISignupInputValidator {
    (username: string, password:string, confirmPassword:string): string
}

export interface IUseSignupFormHooks {
    (): {
      data: {
        username: string,
        password: string,
        confirmPassword: string,
        error: string,
        success: string
      },
      methods: {
        handleUsernameInput: handleInputOnChange,
        handlePasswordInput: handleInputOnChange,
        handleConfirmPasswordInput: handleInputOnChange,
        handleSignup: handleButtonOnClick
      }
    } 
  }
  