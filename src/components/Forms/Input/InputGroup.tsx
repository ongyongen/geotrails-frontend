import React from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import { IInputGroup } from "./InputGroupInterface";

export const InputGroup: IInputGroup = ({label, input, inputType, placeholder, action}) => {

    return (
        <>
          <StyledFormLabel>{label}</StyledFormLabel>
            <Form.Control 
                value={input}
                onChange={action}
                type={inputType || "text"}
                placeholder={placeholder || ""}
            />
        </>
    )
}

const StyledFormLabel = styled(Form.Label)`
    display:flex;
    margin-bottom:1vh;
    margin-top:1vh;
    text-align:start;
`