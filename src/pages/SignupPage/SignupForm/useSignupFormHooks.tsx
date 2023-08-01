import { useState } from "react"
import axios from "axios"
import { CREATE_ACCOUNT_URL } from "../../../routes"
import { handleInputOnChange, handleButtonOnClick } from "../../../interfaces/common"
import { ISignupInputValidator, IUseSignupFormHooks } from "./SignupFormInterface"

const signupInputValidator: ISignupInputValidator = (username, password, confirmPassword) => {
  if (username.length === 0) {
    return "Username field cannot be empty"
  } else if (password.length < 8) {
    return "Password should be at least 8 characters"
  } else if (password !== confirmPassword) {
    return "Passwords provided do not match"
  } else {
    return "Valid"
  }
}

export const useSignupFormHooks: IUseSignupFormHooks = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [success, setSuccessMessage] = useState("")
    const [error, setError] = useState("")

    const handleUsernameInput: handleInputOnChange = (event) => setUsername(event.target.value)
    const handlePasswordInput: handleInputOnChange = (event) => setPassword(event.target.value)
    const handleConfirmPasswordInput: handleInputOnChange = (event) => setConfirmPassword(event.target.value)

    const handleSignup: handleButtonOnClick = (event) => {
        // Clear all success messages and errors from prev submission
        setSuccessMessage("")
        setError("")

        // Prevent page refresh on form submit
        event.preventDefault()

        // Check password validity 
        if (signupInputValidator(username, password, confirmPassword) !== "Valid") {
            setError(signupInputValidator(username, password, confirmPassword))
        } else {
          const input_data = { 
            "username" : username, 
            "password" : password 
          }
      
          axios
            .post(CREATE_ACCOUNT_URL, input_data)
            .then((res) => {
              console.log(res)
              setUsername("")
              setPassword("")
              setConfirmPassword("")
              setSuccessMessage("Account is created. You can now log in to your account")
            })
            .catch((err) => {
              console.log(err)
              setError(err.message)
            })
        }
    }

    const data = {
        username,
        password,
        confirmPassword,
        error,
        success
    }

    const methods = {
        handleUsernameInput,
        handlePasswordInput,
        handleConfirmPasswordInput,
        handleSignup
    }

    return {
        data,
        methods
    }
}