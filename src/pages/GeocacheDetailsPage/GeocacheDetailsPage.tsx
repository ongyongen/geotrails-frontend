import React from "react";
import { useParams } from "react-router-dom";
import { Title } from "../../themes/textStyles";
import { Header } from "../../components/Header/Header";
import { GeocacheDetailSection } from "./GeocacheDetailSection/GeocacheDetailSection";
import styled from "styled-components";

export const GeocacheDetailsPage = () => {

    const { code } = useParams()
    

    return (
        <div>
            <Header></Header>
            <GeocacheDetailSection
                code={code}
            />
        </div>
    )
}

const StyledHeaderContainer = styled.div`
    margin-left:10vw;
`