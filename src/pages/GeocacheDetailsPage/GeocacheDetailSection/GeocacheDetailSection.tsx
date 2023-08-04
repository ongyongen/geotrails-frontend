import React from "react";
import { useGeocacheDetailSectionHooks } from "./useGeocacheDetailSectionHooks";
import { Text, Subtitle, Title } from "../../../themes/textStyles";
import styled from "styled-components";
import { dateFormatter } from "../../../utils";
import { DARK_PURPLE, PURPLE } from "../../../themes/colors";
import Map, { Marker} from 'react-map-gl';
import { useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN } from "../../../routes";
import { MAPBOX_MAP_STYLE } from "../../../routes";
import { useSelector } from "react-redux";
import { Header } from "../../../components/Header/Header";
import { CommonButton } from "../../../components/Buttons/CommonButton";

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

interface IGeocacheDetailSectionProps {
    code: string | undefined
}

interface IPointMarkerProps {
    latitude: number,
    longitude: number
}

interface IBaseMap {
    (props: IPointMarkerProps): JSX.Element
}

const BaseMap: IBaseMap = ({latitude, longitude}) => {

    const [viewState, setViewState] = useState({
        latitude: latitude,
        longitude: longitude,
        zoom: 15
    })

    return (
        <StyledMap
            mapboxAccessToken={MAPBOX_TOKEN}
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle={MAPBOX_MAP_STYLE}
        >
            <Marker
                longitude={longitude}
                latitude={latitude}
                scale={1}
            />
        </StyledMap>
    )
}

export const GeocacheDetailSection = ({code}: IGeocacheDetailSectionProps) => {
    const {data, methods} = useGeocacheDetailSectionHooks(code)
    const { geocacheDetail } = data   
    
    
    const geocaches = useSelector((state: any) => state.geocachesTable.geocaches)


    return (
        <>

        {geocacheDetail && 
        <StyledGeocacheDetailSection>

            <StyledTitle>
                📍 {code} : {geocacheDetail.name} {' '} <CommonButton text={"Log"} action={methods.logGeocache}/>
            </StyledTitle>
        
            <Text>
                {geocacheDetail.planning_area} | {geocacheDetail.latitude}, {geocacheDetail.longitude}
                <br></br>
                Placed on {dateFormatter(geocacheDetail.placed_date)} by {geocacheDetail.owner_name}
            </Text>
            <MapTextContainer>

                <AttributeStatsContainer>
                    <SectionOneContainer>
                        <StyledSubtitle>🗺️ Attributes</StyledSubtitle>
                        <Text>
                            Geocache Type : {geocacheDetail.geocache_type} 
                            <br></br>
                            Container Type : {geocacheDetail.container_type}
                            <br></br>
                            Difficulty : {geocacheDetail.difficulty} 
                            <br></br>
                            Terrain : {geocacheDetail.terrain}
                        </Text>
                    </SectionOneContainer>
                    <SectionOneContainer>
                        <StyledSubtitle>💻 Stats</StyledSubtitle>
                        <Text>
                            Found Rate : {geocacheDetail.found_rate} %
                            <br></br>
                            Last Found : {geocacheDetail.last_found_date !== undefined && dateFormatter(geocacheDetail.last_found_date)}
                            <br></br>
                            Favourites : {geocacheDetail.favorite_points}
                            <br></br>
                            Trackables : {geocacheDetail.trackable_count}
                        </Text>
                    </SectionOneContainer>
                    <HintContainer>
                        <StyledSubtitle>🔎 Hint</StyledSubtitle>
                        <Text>
                            {geocacheDetail.hint && geocacheDetail.hint !== undefined ? geocacheDetail.hint : "No hint available :("}
                        </Text>
                    </HintContainer>
                </AttributeStatsContainer>

        
                <StyledMapContainer>
                {geocacheDetail.longitude && <BaseMap
                    latitude={geocacheDetail.latitude}
                    longitude={geocacheDetail.longitude}
                />}
                </StyledMapContainer>

            </MapTextContainer>
           
            <DescriptionContainer>
                <StyledSubtitle>📝 Description</StyledSubtitle>
                <Text>
                    {geocacheDetail.description && geocacheDetail.description !== undefined ? geocacheDetail.description : "No details available :("}
                </Text>
            </DescriptionContainer>
        </StyledGeocacheDetailSection>
        }
        </>
    )
}

const MapTextContainer = styled.div`
    display:flex;
    flex-direction:row;
    margin-bottom:4vh;
    margin-top:4vh;

`

const StyledGeocacheDetailSection = styled.div`
    text-align:left;
    width:70%;
    max-width:70%;
    overflow-x:break;
    align-items:center;
    justify-content:center;
    margin-left:15%;
    margin-right:15%;
    margin-top:1%;
`

const StyledTitle = styled(Title)`
    color: ${PURPLE};
`

const StyledSubtitle = styled(Subtitle)`
    color: ${PURPLE};
`

const StyledMapContainer = styled.div`
    width:100%;
    max-width:100%;
    margin-bottom:3vh;
`

const AttributeStatsContainer = styled.div`
    display:flex;
    flex-direction:column;
    width:30vw;
    margin-right:4vw;
`
const SectionOneContainer = styled.div`

`

const StyledMap = styled(Map)`
`

const HintContainer = styled.div`
    margin-bottom:2vh;
`

const DescriptionContainer = styled.div`

`
