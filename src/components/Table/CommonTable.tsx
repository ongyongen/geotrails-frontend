import React from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { Text } from "../../themes/textStyles";
import { dateFormatter } from "../../utils";
import { ICommonTable } from "./CommonTableInterface";

export const CommonTable: ICommonTable = ({headers, data}) => {
    return (
        <>
            <StyledTable responsive>
                <thead>
                    <tr>
                        {headers && headers.map((h) => (
                            <th><Text>{h}</Text></th>
                        ))}
                    </tr>
                </thead>
                <StyledTbody>
                {data && data.map((d) => (
                    <StyledTr>
                        <StyledTdCol>
                            <Text>{d["cache_code"]}</Text>
                            <Text>{d["name"]}</Text>
                        </StyledTdCol>
                        <StyledTd>{d["geocache_type"]}</StyledTd>
                        <StyledTd>{d["container_type"]}</StyledTd>
                        <StyledTdCol>
                            <Text>{d["difficulty"]} {' | '}{d["terrain"]}</Text>
                        </StyledTdCol>
                        <StyledTd>{dateFormatter(d["placed_date"])}</StyledTd>
                        <StyledTd>{dateFormatter(d["last_found_date"])}</StyledTd>
                        <StyledTd>{d["found_rate"]}</StyledTd>
                        <StyledTd>{d["planning_area"]}</StyledTd>
                        <StyledTd>{d["owner_name"]}</StyledTd>

                    </StyledTr>
                ))}
                </StyledTbody>
            </StyledTable>
        </>
    )
}

const StyledTable = styled(Table)`
    text-align:left;
`

const StyledTbody = styled.tbody`
`

const StyledTr = styled.tr`
    &:hover td {
        background-color:#fbf5ff;
    }
`

const StyledTd = styled.td`
    border-width:0px!important;
    max-width:10vw;
    overflow-wrap: break-word;    
`
const StyledTdCol = styled.td`
    border-width:0px!important;
    max-width:10vw;
    overflow-wrap: break-word;    
    text-align:left;
`
