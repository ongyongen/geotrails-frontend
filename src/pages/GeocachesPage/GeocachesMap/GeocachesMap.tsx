import { useState } from "react"
import { MAPBOX_TOKEN } from "../../../routes"
import { MAPBOX_MAP_STYLE } from "../../../routes"
import { Marker } from "react-map-gl"
import styled from "styled-components"
import { useSelector } from "react-redux"
import Map from "react-map-gl"
import { useGeocachesTableHooks } from "../GeocachesTable/useGeocachesTableHooks"
import { CommonButton } from "../../../components/Buttons/CommonButton"
import { Popup } from "react-map-gl"
import { useMemo } from "react"
import { PopupText, PopupTitle, Subtitle, Text, Title } from "../../../themes/textStyles"
import { InputGroup } from "../../../components/Forms/Input/InputGroup"
import { Form } from "react-bootstrap"
import { obtain_mapbox_api } from "../../../routes"
import axios from "axios"
import { Header } from "../../../components/Header/Header"
import { useEffect } from "react"
import PopupModal from "../../../components/Modal/PopupModal"
import { Link } from "react-router-dom"

interface IPointMarkerProps {
    latitude: number,
    longitude: number
}

interface IBaseMap {
    (): JSX.Element
}

export interface IPopupInfoMap {
    [info: string | number ] : string;
} 

interface IPopupInfo {
    latitude: string, 
    longitude: string,
    cache_code: string,
    name: string,
    geocache_type: string,
    container_type: string,
    difficulty: string,
    terrain: string,

}

  
const GeocachesBaseMap: IBaseMap = () => {
    var geocaches_map = useSelector((state: any) => state.geocachesTable.geocaches_map)

    const { data, methods } = useGeocachesTableHooks()

    const [searchMap, setSearchMap] = useState("")
    const [searchMapRefresh, setSearchMapRefresh] = useState(false)

    useEffect(() => {
        methods.confirmSearchGeocachesMap()
    }, [searchMapRefresh])

    console.log(searchMapRefresh)

    console.log(geocaches_map)

    const [showPopup, setShowPopup] = useState(true)

    const [popupInfo, setPopupInfo] = useState<IPopupInfo>(
        {
            "latitude":"", 
            "longitude": "", 
            "cache_code": "",
            "name": "",
            "geocache_type": "",
            "container_type": "",
            "difficulty": "",
            "terrain": ""
        }
    )

    const pins = useMemo(
      () =>
        geocaches_map.map((cache:any) => (
          <Marker
            longitude={cache.longitude}
            latitude={cache.latitude}
            anchor="bottom"
            color={"#d48aff"}
            onClick={e => {
              e.originalEvent.stopPropagation()
              setPopupInfo(cache)
              setShowPopup(true)
            }}
          >
            {cache["geocache_type"] == "traditional" && <StyledMarkerImg src={require('./traditional-cache.png')} />}
            {cache["geocache_type"] == "multi-cache" && <StyledMarkerImg src={require('./multi-cache.png')} />}
            {cache["geocache_type"] == "whereigo" && <StyledMarkerImg src={require('./whereigo.png')} />}
            {cache["geocache_type"] == "virtual" && <StyledMarkerImg src={require('./virtual-cache.png')} />}
            {cache["geocache_type"] == "letterbox" && <StyledMarkerImg src={require('./letterbox-cache.png')} />}
            {cache["geocache_type"] == "event" && <StyledMarkerImg src={require('./event-cache.png')} />}
            {cache["geocache_type"] == "mystery" && <StyledMarkerImg src={require('./mystery-cache.png')} />}
            {cache["geocache_type"] == "earth" && <StyledMarkerImg src={require('./earth-cache.png')} />}

          </Marker>
        )),
      [geocaches_map]
    );

    const [viewState, setViewState] = useState({
        latitude: 1.3521,
        longitude: 103.8198,
        zoom: 11
    })

    // const [searchMap, setSearchMap] = useState("")
    const [searchLat, setSearchLat] = useState(null)
    const [searchLon, setSearchLon] = useState(null)

    const obtainNewGeocodedCoords = () => {
        const MAPBOX_SEARCH_API = obtain_mapbox_api(searchMap)
        setSearchMapRefresh(!searchMapRefresh)

        axios
        .get(MAPBOX_SEARCH_API)
        .then((res) => {
            const lat = res["data"]["results"][0]["LATITUDE"]
            const lon = res["data"]["results"][0]["LONGITUDE"]
            setSearchLat(lat)
            setSearchLon(lon)
            setViewState({
                latitude: lat,
                longitude: lon,
                zoom: 13,
            })
        })
        .catch((err) => {
            setViewState({
                latitude: 1.3521,
                longitude: 103.8198,
                zoom: 11
            })
            setSearchLat(null)
            setSearchLon(null)
        })
       
    }

    return (
        <>
         
         <InputGroupContainer>
            <Form.Control
                value={searchMap}
                type={"Text"}
                placeholder={"Enter a postal code or building name in Singapore"}
                onChange={(e) => setSearchMap(e.target.value)}
            />    
            <PopupModal/>
            <CommonButton
                text={"Search"}
                action={obtainNewGeocodedCoords}
            />
        </InputGroupContainer>
      
    
         <StyledMap
            mapboxAccessToken={MAPBOX_TOKEN}
            mapStyle={MAPBOX_MAP_STYLE}
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
        >
           {pins}
          {searchLat && searchLon && <Marker
            longitude={searchLon}
            latitude={searchLat}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation()
            }}
            color={"red"}
          />}

           {showPopup && 
                <StyledPopup
                    anchor="top"
                    longitude={Number(popupInfo["longitude"])}
                    latitude={Number(popupInfo["latitude"])}
                    onClose={() => setShowPopup(false)}
                >
                    <PopupContainer>
                        <PopupTitle><a href={"localhost:3000/geocache/" + popupInfo["cache_code"]}>{popupInfo["cache_code"]} : {popupInfo["name"]}</a></PopupTitle>
                        <PopupText>Cache Type : {popupInfo["geocache_type"]}</PopupText>
                        <PopupText>Container Type : {popupInfo["container_type"]}</PopupText>
                        <PopupText>Difficulty : {popupInfo["difficulty"]}</PopupText>
                        <PopupText>Terrain : {popupInfo["terrain"]}</PopupText>
                    </PopupContainer>
                </StyledPopup>
            }
        </StyledMap>

        </>
       
    )
}

export const GeocachesMap = () => {
    var geocaches_map = useSelector((state: any) => state.geocachesTable.geocaches_map)

    const { data, methods } = useGeocachesTableHooks()

    return (
        <>
    
        <StyledMapContainer>
            <StyledLinkContainer>
            <Link to={"/geocaches"}>Back</Link>

            </StyledLinkContainer>
            <GeocachesBaseMap/>
     

        </StyledMapContainer>
           
        </>
    )
}

const StyledLinkContainer = styled.div`
    margin-bottom:2vh;
`

const StyledMap = styled(Map)`
`
const StyledMapContainer = styled.div`
    width:100%;
    max-width:100%;
    height:78vh;
    max-height:80vh;
    margin-top:3vh;
    margin-bottom:3vh;
    text-align:left;
`

const PopupContainer = styled.div`
    align-items:left;
    text-align:left;
    margin-top:3vh;
    border-radius:20px;
`

const StyledPopup = styled(Popup)`
    border-radius: 20px;
    box-shadow: 0px 10px 8px rgba(38, 38, 38, 0.2);
`

const StyledMarkerImg = styled.img`
    width: 25px;
    height: 25px;
`

const InputGroupContainer = styled.div`
    display:flex;
    flex-direction:row;
    margin-bottom:3vh;
`
