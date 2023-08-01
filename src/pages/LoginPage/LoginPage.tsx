import React from "react"
import { LoginForm } from "./LoginForm/LoginForm"
import { Title } from "../../themes/textStyles"
import { Header } from "../../components/Header/Header"
import styled from "styled-components"
import { INoInputComponent } from "../../interfaces/common"

// Login Page Text
const PAGE_TITLE = "Log In"

export const LoginPage: INoInputComponent = () => {
    return (
        <>
            <Header/>
            <StyledImg src={require("../../img/login-page.png")}/>
            <Title>{PAGE_TITLE}</Title>
            <LoginForm/>
        </>
    )
}

// Element styles
const StyledImg = styled.img`
    width:20%;
    height:20%;
    margin-bottom:5vh;
`