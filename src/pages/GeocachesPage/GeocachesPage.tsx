import React from "react";
import { Header } from "../../components/Header/Header";
import { Title } from "../../themes/textStyles";
import { GeocachesTable } from "./GeocachesTable/GeocachesTable";
import styled from "styled-components";
import { useGeocachesTableHooks } from "./GeocachesTable/useGeocachesTableHooks";
import { useEffect } from "react";
import { LIGHT_PURPLE } from "../../themes/colors";
import { InputGroup } from "../../components/Forms/Input/InputGroup";
import { CommonButton } from "../../components/Buttons/CommonButton";
import Pagination from 'react-bootstrap/Pagination';
import { INoInputComponent } from "../../interfaces/common";
import { Searchbar } from "./Searchbar/Searchbar";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store/storeInterface";
import { PaginationGroup } from "../../components/Table/PaginationGroup";
import { MAPBOX_TOKEN } from "../../routes";
import { MAPBOX_MAP_STYLE } from "../../routes";
import { useState } from "react";
import { Marker } from "react-map-gl";
import Map from "react-map-gl";

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
        <Map
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
        </Map>
    )
}


// Text for geocaches page
const GEOCACHES_PAGE_TITLE = "Geocaches in Singapore"

export const GeocachesPage: INoInputComponent = () => {
    const { data, methods } = useGeocachesTableHooks()
    
    const { 
        displayedGeocaches, 
        searchInput
    } = data

    const { 
        getAllGeocaches, 
        confirmSearch,
     } = methods


    const current_page = useSelector((state: any) => state.geocachesTable.current_page)
    const geocaches = useSelector((state: any) => state.geocachesTable.geocaches)

    useEffect(() => {
        getAllGeocaches()
    }, [current_page])


    return (
        <>
            <Header/>
            <GeocachesTableContainer>
                <GeocachesTable
                    geocaches={geocaches}
                    displayedGeocaches={displayedGeocaches}
                    searchInput={searchInput}
                    getAllGeocaches={getAllGeocaches}
                    confirmSearch={confirmSearch}
                />
                <PaginationGroup/>
            </GeocachesTableContainer>
        </>
    )
}

const SearchContainer = styled.div`
    text-align:center;
    width:50%;
    margin-left:25%;
    border-radius:10px;
`

const SearchInputContainer = styled.div`
    display:flex;
    flex-direction:row;
    margin-top:5vh;
`

const StyledInputGroup = styled.div`
    display:flex;
    flex-direction:row;
    margin-left:0.5vw;
`

const GeocachesTableContainer = styled.div`
    max-width:80vw;
    max-height:80vh;
    margin-left:5vw;
`
