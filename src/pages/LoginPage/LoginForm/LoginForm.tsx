import { useLoginFormHooks } from "./useLoginFormHooks";
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import { CommonButton } from "../../../components/Buttons/CommonButton";
import { InputGroup } from "../../../components/Forms/Input/InputGroup";
import { ErrorText } from "../../../themes/textStyles";
import { ILoginForm } from "./LoginFormInterface";

// Login Form Text
const USERNAME_LABEL = "Username"
const PASSWORD_LABEL = "Password"
const LOG_IN_BUTTON_TEXT = "Log In"

export const LoginForm: ILoginForm = () => {

    const { data, methods } = useLoginFormHooks()
    const { username, password, error } = data
    const { handleUsernameInput, handlePasswordInput, handleLogin } = methods

    return (
        <>
            <form>
                <StyledContainer>
                    {error !== "" && <ErrorText>{error}</ErrorText>}
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
                </StyledContainer>
                <CommonButton 
                    text={LOG_IN_BUTTON_TEXT}
                    action={handleLogin}
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
