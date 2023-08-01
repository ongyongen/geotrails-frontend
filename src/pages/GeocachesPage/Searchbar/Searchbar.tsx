import { InputGroup } from "../../../components/Forms/Input/InputGroup"
import { CommonButton } from "../../../components/Buttons/CommonButton";
import { ISearchBar } from "./SearchbarInterface";
import styled from "styled-components";
import PopupModal from "../../../components/Modal/PopupModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/storeInterface";
import { updateSearchInput } from "../GeocachesTable/geocachesTableSlice";
import { useGeocachesTableHooks } from "../GeocachesTable/useGeocachesTableHooks";
import { useSearchbarHooks } from "./useSearchbarHooks";
import { Link } from "react-router-dom";

const SEARCH_BAR_INPUT_PLACEHOLDER_TEXT = "Search by geocache code"
const SEARCH_BUTTON_TEXT = "Search"
const MAP_TEXT = "Map"

export const Searchbar: ISearchBar = () => {

    const searchInput = useSelector((state: any) => state.geocachesTable.searchInput)
    const dispatch = useDispatch<AppDispatch>();
    const { data, methods } = useGeocachesTableHooks()

    return (
        <SearchInputContainer>
            <InputGroup 
                input={searchInput}
                action={(e) => dispatch(updateSearchInput(e.target.value))}
                placeholder={SEARCH_BAR_INPUT_PLACEHOLDER_TEXT}
            />
            <PopupModal/>
            <CommonButton
                text={SEARCH_BUTTON_TEXT}
                action={methods.confirmSearch}
            />
            <MapContainer>
                <Link to={"/geocaches/map"}>
                    <StyledImg
                        src={require('./map.png')} 
                        alt={"map"}
                    />
                </Link>
            </MapContainer>
            
           
        </SearchInputContainer>
    )
}

const SearchInputContainer = styled.div`
    display:flex;
    flex-direction:row;
    margin-top:5vh;
`

const StyledImg = styled.img`
    width:35px;
    height:35px;
`

const MapContainer = styled.div`
    margin-left:0.3vw;
`