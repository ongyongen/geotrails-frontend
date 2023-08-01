import React from "react";

import { useSignupFormHooks } from "./useSignupFormHooks";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import { CommonButton } from "../../../components/Buttons/CommonButton";
import { Form, Container } from "react-bootstrap";
import styled from "styled-components";
import { InputGroup } from "../../../components/Forms/Input/InputGroup";
import { ErrorText, SuccessText } from "../../../themes/textStyles";
import { ISignupForm } from "./SignupFormInterface";

// Text for signup form
const USERNAME_LABEL = "Username"
const PASSWORD_LABEL = "Password"
const CONFIRM_PASSWORD_LABEL = "Confirm Password"
const SIGNUP_BUTTON_TEXT = "Sign Up"

export const SignupForm: ISignupForm = () => {

    const { user, token } = useContext(AuthContext)

    const { data, methods } = useSignupFormHooks()
    const { username, password, confirmPassword, error, success } = data
    const { handleUsernameInput, handlePasswordInput, handleConfirmPasswordInput, handleSignup } = methods

    return (
        <>
            <form>
                <StyledContainer>
                    {error !== "" && <ErrorText>{error}</ErrorText>}
                    {success !== "" && <SuccessText>{success}</SuccessText>}
                    <InputGroup
                        label={USERNAME_LABEL}
                        input={username}
                        action={handleUsernameInput}
                    />
                    <InputGroup
                        label={PASSWORD_LABEL}
                        input={password}
                        inputType={"password"}
                        action={handlePasswordInput}
                    />
                    <InputGroup
                        label={CONFIRM_PASSWORD_LABEL}
                        input={confirmPassword}
                        inputType={"password"}
                        action={handleConfirmPasswordInput}
                    />
                </StyledContainer>
                <CommonButton 
                    text={SIGNUP_BUTTON_TEXT}
                    action={handleSignup}
                />
            </form>
        </>
    )
}

// Container styles
const StyledContainer = styled(Container)`
    width:30%;
    height:30%;
    margin-top:5vh;
    margin-bottom:5vh;
`
