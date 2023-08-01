import styled from "styled-components";
import { RED, GREEN } from "./colors";

export const Title = styled.h1`
    font-size: 2rem;
    font-weight:500;
    font-family: 'Jost', sans-serif;
    font-family: 'Karla', sans-serif;
`

export const Subtitle = styled.h2`
    font-size: 1.5rem;
    font-family: 'Jost', sans-serif;
    font-family: 'Karla', sans-serif;
`

export const HeaderBrand = styled.p`
    font-size: 1.3rem;
    font-weight: 500;
`
export const HeaderLink = styled.p`
    font-size: 1rem
`

export const ChartTitle = styled.p`
    font-size: 1.3rem;
    font-family: 'Jost', sans-serif;
    font-family: 'Karla', sans-serif;
`

export const Text = styled.p`
    font-size: 1rem;
    font-family: 'Jost', sans-serif;
    font-family: 'Karla', sans-serif;
`

export const PopupTitle = styled.h3`
    font-size: 0.9rem;
    font-family: 'Jost', sans-serif;
    font-family: 'Karla', sans-serif;
    font-weight:500;
`

export const PopupText = styled.h3`
    font-size: 0.8rem;
    font-family: 'Jost', sans-serif;
    font-family: 'Karla', sans-serif;
`

export const ErrorText = styled(Text)`
    color: ${RED};
`

export const SuccessText = styled(Text)`
    color: ${GREEN};
`