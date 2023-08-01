import React from "react"
import styled from 'styled-components'
import { CommonButton } from "../../components/Buttons/CommonButton"
import { Header } from "../../components/Header/Header"
import { Title, Subtitle } from "../../themes/textStyles"
import { useNavigate } from "react-router-dom"
import { INoInputComponent } from "../../interfaces/common"
import { Counter } from "../../Counter"

// Text for landing page
const LANDING_PAGE_TITLE = "Geotrails 🌎"
const LANDING_PAGE_SUBTITLE = "Plan your next Geocaching Trip in Singapore!"
const VIEW_GEOCACHE_BUTTON = "View all geocaches"
const SIGN_UP_BUTTON = "Sign up"

export const LandingPage: INoInputComponent = () => {
    let navigate = useNavigate()

    return (
        <>
            <Header/>
            <StyledImg 
                src={require("../../img/landing-page.png")} 
            />
            <TitleContainer>
                <Title>{LANDING_PAGE_TITLE}</Title>
                <Subtitle>{LANDING_PAGE_SUBTITLE}</Subtitle>
            </TitleContainer>
            <ButtonContainer>
                <CommonButton text={VIEW_GEOCACHE_BUTTON} action={() => navigate("/geocaches")}/>
                <CommonButton text={SIGN_UP_BUTTON} action={() => navigate("/signup")}/>
            </ButtonContainer>
        </>
    )
}

// Container styles
const TitleContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    margin-top:2vh;
`

const ButtonContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    margin-top:3vh;
`

// Element styles
const StyledImg = styled.img`
    width:40%;
    height:40%;
`
