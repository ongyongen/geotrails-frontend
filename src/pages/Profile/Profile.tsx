import React from "react";
import { Header } from "../../components/Header/Header";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { Title } from "../../themes/textStyles";
import { Subtitle } from "../../themes/textStyles";
import CalendarHeatmap from "react-calendar-heatmap";
import 'react-calendar-heatmap/dist/styles.css';
import styled from "styled-components";
import { useState } from "react";
import { Text } from "../../themes/textStyles";
import axios from "axios";
import { useEffect } from "react";
import { useProfileHooks } from "./useProfileHooks";
import "./profile.css"
import { LIGHT_PURPLE } from "../../themes/colors";
import { useNavigate } from "react-router-dom";
import { NAV_TO_GEOCACHE_DETAILS_PAGE_PATH, USER_DASHBOARD_PATH } from "../../routes";
import { useSelector } from "react-redux";

let colourTaskCompletion = (value:any) => {
    let colScale = 1
    if (!value) {
      return 'color-empty';
    } else {
        let count = value.count
        switch (true) {
            case count == 0:
                colScale = 1
                break
            case count <= 5:
                colScale = 2
                break
            case count <= 10:
                colScale = 3
                break
            case count <= 15:
                colScale = 4
                break
            case count > 15:
                colScale = 5
                break
            default:
                colScale = 0
        }
    }
    return `color-scale-${colScale}`
}


export const Profile = () => {

    const { user, token } = useContext(AuthContext);

    const {data, methods} = useProfileHooks()
    
    const calendar_clicked_count = useSelector((state: any) => state.Profile.calendar_clicked_count)
    const calendar_clicked_date = useSelector((state: any) => state.Profile.calendar_clicked_date)
    const all_found_geocaches = useSelector((state: any) => state.Profile.all_found_geocaches)
    const geocaches_on_current_date = useSelector((state: any) => state.Profile.geocaches_on_current_date)
    const geocaches_count_by_date = useSelector((state: any) => state.Profile.geocaches_count_by_date)

    useEffect(() => {
        if (token) {
            methods.getAllFoundGeocaches()
        }
    }, [token])

    const navigate = useNavigate();

    function navigateToGeocache(code:string) {
      navigate(NAV_TO_GEOCACHE_DETAILS_PAGE_PATH + code);
    }

    function navigateToDashboard() {
        navigate(USER_DASHBOARD_PATH);
    }

    return (
        <>
        <Header/>
        <TitleContainer>
            <ProfileTitle>
                {user}'s geocaching calendar 
            </ProfileTitle>
            <Subtitle onClick={() => navigateToDashboard()}>📊</Subtitle>
        </TitleContainer>

        <CalendarHeatmapContainer>
            {geocaches_count_by_date && 
                <CalendarHeatmap
                    startDate={new Date(`${new Date().getFullYear()-1}-12-31`)}
                    endDate={new Date(`${new Date().getFullYear()}-12-31`)}
                    showMonthLabels={true}
                    values={geocaches_count_by_date}
                    onClick={value => methods.getGeocacheForADate(value)}
                    classForValue={(value) => colourTaskCompletion(value)}
                   
                />
            }

            <TextContainer>
                {geocaches_on_current_date && calendar_clicked_date !== "" && 
                    <Subtitle>
                      You found {calendar_clicked_count} geocaches on {calendar_clicked_date} 🎉 
                    </Subtitle>
                }
            </TextContainer>            
        </CalendarHeatmapContainer>
        <FoundCacheContainer>

        {geocaches_on_current_date &&
            geocaches_on_current_date.map((data:any) => (
                <CardContainer onClick={() => navigateToGeocache(data["cache_code"])}>
                    <p>{data["cache_code"]} : {data["name"]}</p>
                </CardContainer>
            ))
        }
        </FoundCacheContainer>
        </>
    )
}

const ProfileTitle = styled(Title)`
    margin-right:1vw;
`

const TextContainer = styled.div`
    margin-top:5vh;
`

const CalendarHeatmapContainer = styled.div`
    margin-top:5vh;
    width:80%;
    margin-left:10%;
    margin-right:10%;
    text-align:left;
`

const FoundCacheContainer = styled.div`
    text-align:left;
    margin-left:10%;
    margin-top:3vh;
`

const CardContainer = styled.div`
    text-align:left;
    background: #fff;
    width:90%;
    text-overflow: scroll;
    transition: all 0.3s ease-out;
    text-decoration: none;
    border-radius:10px;
    padding-left:1%;
    padding-right:1%;
    padding-top:0.5%;
    display:flex;
    align-items:center;
    margin-top:1%;
    margin-bottom:1%;

    &:hover {
        transform: translateY(-5px) scale(1.005) translateZ(0);
        box-shadow: 0 24px 36px rgba(0,0,0,0.11), 0 24px 46px var(--box-shadow-color);
        background: ${LIGHT_PURPLE};
    }
`

const TitleContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;
`