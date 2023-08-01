import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

interface ButtonProps {
    name: string
    action: () => void

}

export const SubmitButton: React.FC<ButtonProps> = ({action, name}: ButtonProps) => {
    return (
        <StyledButton variant="outline-primary" onClick={action}>
            {name}
        </StyledButton>
    )
}

const StyledButton = styled(Button)
    .attrs(() => ({ className: 'outline-primary'}))`
    border-color: #a200ff;
    color: #a200ff;
    background-color:#ffff;
    &:hover {
        border-color:#a200ff;
        background-color: #a200ff;
    }
    &:active:focus {
        border-color:#a200ff;
        background-color: #a200ff;
    }
`
