import React, { ReactNode } from "react";
import { IFetchedData, IFetchDataFunction, handleInputOnChange, handleButtonOnClick } from "../../../interfaces/common";

export type HandlePaginationNavigation = () => void

export interface IGeocachesTableData extends IFetchedData {
    cache_code: string,
    container_type: string,
    difficulty: string,
    found_rate: string,
    geocache_type: string,
    last_found_date: string,
    name: string,
    owner_name: string,
    placed_date:string,
    planning_area:string,
    terrain:string,
}

interface GeocachesTableProps {
    geocaches: Array<IGeocachesTableData>
    displayedGeocaches: Array<IGeocachesTableData>,
    searchInput: string,
    getAllGeocaches: IFetchDataFunction,
    confirmSearch: IFetchDataFunction
}

export interface IGeocachesTable {
    (props: GeocachesTableProps): JSX.Element
}

export interface IUseGeocachesTableHooks {
    (): {
        data: {
            geocaches: Array<IGeocachesTableData>,
            displayedGeocaches: Array<IGeocachesTableData>,
            searchInput: string
        },
        methods: {
            getAllGeocaches: IFetchDataFunction,
            confirmSearch: any,
            confirmSearchGeocachesMap: any
        }
    }
}

