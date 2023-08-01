import { Button } from "react-bootstrap";
import styled from "styled-components";
import { WHITE, PURPLE } from "../../themes/colors";
import { IButton } from "./CommonButtonInterface";

export const CommonButton = (props:any) => {
    return (
        <StyledButton onClick={props.action}>
            {props.text}
        </StyledButton>
    )
}

const StyledButton = styled(Button)
    .attrs(() => ({ className: 'outline-primary'}))`

    background-color:${WHITE};
    border-color: ${PURPLE};
    color: ${PURPLE};
    margin-left:0.5vw;
    margin-right:0.5vw;

    &:hover {
        background-color: ${PURPLE};
        border-color: ${PURPLE};
    }

    &:active:focus {
        background-color: ${PURPLE};
        border-color: ${PURPLE};
    }
`
