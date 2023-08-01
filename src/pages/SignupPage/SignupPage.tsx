import React from "react"
import { Title } from "../../themes/textStyles"
import { Header } from "../../components/Header/Header"
import { SignupForm } from "./SignupForm/SignupForm"
import styled from "styled-components"
import { INoInputComponent } from "../../interfaces/common"
import { useContext } from "react"
import { AuthContext } from "../../AuthProvider"

// Signup page text
const SIGN_UP = "Sign Up"

export const SignupPage: INoInputComponent = () => {

    return (
        <>
            <Header/>
            <StyledImg src={require("../../img/signup-page.png")}/>
            <Title>{SIGN_UP}</Title>
            <SignupForm/>
        </>
    )
}

// Element styles
const StyledImg = styled.img`
    width:20%;
    height:20%;
    margin-bottom:5vh;
`