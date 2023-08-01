import React, { useEffect } from "react";
import { CommonTable } from "../../../components/Table/CommonTable";
import styled from "styled-components";
import { IFetchedData } from "../../../interfaces/common";
import { IGeocachesTable } from "./GeocachesTableInterface";
import { Text } from "../../../themes/textStyles";
import { dateFormatter } from "../../../utils";
import { Table } from "react-bootstrap";
import { DARK_PURPLE } from "../../../themes/colors";
import { Pagination } from "react-bootstrap";
import { useGeocachesTableHooks } from "./useGeocachesTableHooks";
import { PaginationGroup } from "../../../components/Table/PaginationGroup";
import { useNavigate } from "react-router-dom";
import { NAV_TO_GEOCACHE_DETAILS_PAGE_PATH } from "../../../routes";
import { Searchbar } from "../Searchbar/Searchbar";
import { Title } from "../../../themes/textStyles";
import { InputGroup } from "../../../components/Forms/Input/InputGroup";
import { CommonButton } from "../../../components/Buttons/CommonButton";
import PopupModal from "../../../components/Modal/PopupModal";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/storeInterface";

const GEOCACHES_PAGE_TITLE = "Geocaches in Singapore"
const SEARCH_BAR_INPUT_PLACEHOLDER_TEXT = "Search by geocache code"
const SEARCH_BUTTON_TEXT = "Search"

const headers = [
    "cache code & name",
    "type",
    "container",
    "difficulty | terrain",
    "placed",
    "last found",
    "found rate",
    "area",
    "owner",
]

export const GeocachesTable: IGeocachesTable = ({
    geocaches,
    displayedGeocaches,
    searchInput,
    getAllGeocaches,
    confirmSearch,
}) => {

    const navigate = useNavigate();

    function navigateToGeocache(code:string) {
      navigate(NAV_TO_GEOCACHE_DETAILS_PAGE_PATH + code);
    }

    const geocachesData = useSelector((state: any) => state.geocachesTable.geocaches)

    
    return (
        <>
        <Title>{GEOCACHES_PAGE_TITLE}</Title>
        <SearchContainer>
            <Searchbar/>
        </SearchContainer>
        <TableContainer>
            <StyledTable responsive>
                <thead>
                    <tr>
                        {headers && headers.map((h, index) => (
                            <th key={index}><TableHeading>{h}</TableHeading></th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {geocachesData && geocachesData.map((d:any, index:any) => (
                        <StyledTr key={index} onClick={() => navigateToGeocache(d["cache_code"])}>
                            <StyledTdColWider>
                                <TableCellText>{d["cache_code"]}{' : '}{d["name"]}</TableCellText>
                            </StyledTdColWider>
                            <StyledTdCol>
                                <TableCellText>{d["geocache_type"]}</TableCellText>
                            </StyledTdCol>
                            <StyledTdCol>
                                <TableCellText>{d["container_type"]}</TableCellText>
                            </StyledTdCol>
                            <StyledTdCol>
                                <TableCellText>{d["difficulty"]}{' | '}{d["terrain"]}</TableCellText>
                            </StyledTdCol>
                            <StyledTdCol>
                                <TableCellText>{dateFormatter(d["placed_date"])}</TableCellText>
                            </StyledTdCol>
                            <StyledTdCol>
                                <TableCellText>{dateFormatter(d["last_found_date"])}</TableCellText>
                            </StyledTdCol>
                            <StyledTdCol>
                                <TableCellText>{d["found_rate"]}</TableCellText>
                            </StyledTdCol>
                            <StyledTdCol>
                                <TableCellText>{d["planning_area"]}</TableCellText>
                            </StyledTdCol>
                            <StyledTdCol>
                                <TableCellText>{d["owner_name"]}</TableCellText>
                            </StyledTdCol>
                        </StyledTr>
                    ))}
                </tbody>
            </StyledTable>
        </TableContainer>
        </>
    )
}

const SearchContainer = styled.div`
    text-align:center;
    width:50%;
    margin-left:25%;
    border-radius:10px;
    margin-bottom:3%;
`

const TableContainer = styled.div`
    max-height:55vh;
    overflow-y: scroll;
    margin-bottom:2vh;
  
`

const StyledTable = styled(Table)`
    text-align:left;

`

const StyledTr = styled.tr`
    padding-top:70px;
    &:hover td {
        background-color:#fbf5ff;
    }
`

const StyledTdCol = styled.td`
    border-width:0px!important;
    max-width:10vw;
    overflow-wrap: break-word;    
    text-align:left;
`
const StyledTdColWider = styled.td`
    border-width:0px!important;
    max-width:15vw;
    overflow-wrap: break-word;    
    text-align:left;
`

const TableHeading = styled.p`
    font-size: 0.9rem;
    font-weight: 500;
    color: ${DARK_PURPLE};
`

const TableCellText = styled.p`
    font-size: 0.9rem;

`
