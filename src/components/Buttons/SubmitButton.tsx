import { Button } from "react-bootstrap";
import styled from "styled-components";
import { WHITE, GREEN } from "../../themes/colors";
import { IButton } from "./CommonButtonInterface";

export const SubmitButton: IButton = ({text, action}) => {
    return (
        <StyledButton onClick={action}>
            {text}
        </StyledButton>
    )
}

const StyledButton = styled(Button)
    .attrs(() => ({ className: 'outline-primary'}))`

    background-color:${WHITE};
    border-color: ${GREEN};
    color: ${GREEN};
    margin-left:0.5vw;
    margin-right:0.5vw;

    &:hover {
        background-color: ${GREEN};
        border-color: ${GREEN};
    }

    &:active:focus {
        background-color: ${GREEN};
        border-color: ${GREEN};
    }
`
