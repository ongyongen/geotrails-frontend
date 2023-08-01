import { useState } from "react"
import axios from "axios"
import { LOGIN_URL, HOME_PAGE_PATH } from "../../../routes"
import { handleInputOnChange, handleButtonOnClick } from "../../../interfaces/common"
import { useNavigate } from "react-router-dom"
import { ILoginInputValidator, IUseLoginFormHooks } from "./LoginFormInterface"

const loginInputValidator: ILoginInputValidator = (username, password) => {
  if (username === "") {
    return "Please enter your username"
  } else if (password === "") {
    return "Please enter your password"
  } else {
    return "Valid"
  }
}

export const useLoginFormHooks: IUseLoginFormHooks = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleUsernameInput: handleInputOnChange = (event) => setUsername(event.target.value)
    const handlePasswordInput: handleInputOnChange = (event) => setPassword(event.target.value)

    const handleLogin: handleButtonOnClick = (event) => {
        // Clear all errors from prev submission
        setError("")

        // Prevent page refresh on form submit
        event.preventDefault()

        // Check that user has typed in a username and password
        if (loginInputValidator(username, password) !== "Valid") {
          setError(loginInputValidator(username, password))
        } else {
          const input_data = { 
            "username" : username, 
            "password" : password 
          }
      
          axios
            .post(LOGIN_URL, input_data)
            .then((res) => {
              console.log(res)
  
              const token = res.data.accessToken
              window.localStorage.setItem("token", token)
              window.localStorage.setItem("username", username)
              window.location.href = HOME_PAGE_PATH

              setUsername("")
              setPassword("")
            })
            .catch((err) => {
              console.log(err.message)
              setError("Username or password is invalid")
            })
        }
      }

    const data = {
        username,
        password,
        error
    }

    const methods = {
        handleUsernameInput,
        handlePasswordInput,
        handleLogin
    }

    return {
        data,
        methods
    }
}


 