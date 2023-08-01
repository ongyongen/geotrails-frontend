import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { IHandleNavigate } from "../../interfaces/common"
import axios from "axios"
import { LOGOUT_URL, HOME_PAGE_PATH } from "../../routes"
import { IUseHeaderHooks, ILogout } from "./HeaderInterface"

export const useHeaderHooks: IUseHeaderHooks = () => {

    let navigate = useNavigate()

    const handleNavigate: IHandleNavigate = (path) => {
        return navigate(path)
    }

    const logout: ILogout = () => {
        axios
        .post(LOGOUT_URL)
        .then((res) => {
            window.localStorage.setItem("token", "")
            window.localStorage.setItem("username", "")
            window.location.href = HOME_PAGE_PATH
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const methods = {
        handleNavigate,
        logout
    }

    return { methods }
}