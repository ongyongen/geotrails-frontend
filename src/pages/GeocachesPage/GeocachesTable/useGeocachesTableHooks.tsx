import React from "react";
import axios from "axios";
import { GET_ALL_GEOCACHES_MAP_URL, GET_ALL_GEOCACHES_URL } from "../../../routes";
import { useState } from "react";
import { handleInputOnChange, IFetchDataFunction } from "../../../interfaces/common";
import { IUseGeocachesTableHooks } from "./GeocachesTableInterface";
import { useEffect } from "react";
import { IGeocachesTableData } from "./GeocachesTableInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/storeInterface";
import { resetPages, updateAllGeocaches, updateAllGeocachesMap } from "./geocachesTableSlice";

export const useGeocachesTableHooks: IUseGeocachesTableHooks = () => {

    const [geocaches, setGeocaches] = useState([])
    const [displayedGeocaches, setDisplayedGeocaches] = useState<IGeocachesTableData[]>([])

  
    // Max nos of pages
    const [maxPages, setMaxPages] = useState(0)

    const geocachesData = useSelector((state: any) => state.geocachesTable.geocaches)
    const searchInput = useSelector((state: any) => state.geocachesTable.searchInput)
    const planning_area = useSelector((state: any) => state.geocachesTable.planning_area)
    const difficulty = useSelector((state: any) => state.geocachesTable.difficulty)
    const terrain = useSelector((state: any) => state.geocachesTable.terrain)
    const cache_types = useSelector((state: any) => state.geocachesTable.cache_types)
    const container_types = useSelector((state: any) => state.geocachesTable.container_types)
    const current_page = useSelector((state: any) => (state.geocachesTable.current_page) - 1) * 10

    const dispatch = useDispatch<AppDispatch>();

    const getAllGeocaches: IFetchDataFunction = () => {
        var searchString = "?difficulty=" + difficulty + "&terrain=" + terrain

        if (searchInput !== "") {
            searchString += "&cache_code=" + searchInput
        }

        if (planning_area !== "All" && planning_area !== "") {
            searchString += "&planning_area=" + planning_area.toUpperCase()
        }
        for (const [cache_type, include] of Object.entries(cache_types)) {
            if (include === true) {
                searchString += "&geocache_type=" + cache_type
            }
        }
        for (const [container_type, include] of Object.entries(container_types)) {
            if (include === true) {
                searchString += "&container_type=" + container_type
            }
        }

        searchString += "&page=" + current_page
    
        axios
        .get(GET_ALL_GEOCACHES_URL + searchString)
        .then((res) => {
            if (res.data) {
                console.log(searchString)
                dispatch(updateAllGeocaches(res.data))
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const confirmSearch = () => {
     
        var searchString = "?difficulty=" + difficulty + "&terrain=" + terrain

        if (searchInput !== "") {
            searchString += "&cache_code=" + searchInput
        }

        if (planning_area !== "All" && planning_area !== "") {
            searchString += "&planning_area=" + planning_area.toUpperCase()
        }
        for (const [cache_type, include] of Object.entries(cache_types)) {
            if (include === true) {
                searchString += "&geocache_type=" + cache_type
            }
        }
        for (const [container_type, include] of Object.entries(container_types)) {
            if (include === true) {
                searchString += "&container_type=" + container_type
            }
        }

        searchString += "&page=" + 0
        dispatch(resetPages())
    
        axios
        .get(GET_ALL_GEOCACHES_URL + searchString)
        .then((res) => {
            if (res.data) {
                dispatch(updateAllGeocaches(res.data))
                dispatch(updateAllGeocachesMap(res.data))
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const confirmSearchGeocachesMap = () => {
     
        var searchString = "?difficulty=" + difficulty + "&terrain=" + terrain

        if (searchInput !== "") {
            searchString += "&cache_code=" + searchInput
        }

        if (planning_area !== "All" && planning_area !== "") {
            searchString += "&planning_area=" + planning_area.toUpperCase()
        }
        for (const [cache_type, include] of Object.entries(cache_types)) {
            if (include === true) {
                searchString += "&geocache_type=" + cache_type
            }
        }
        for (const [container_type, include] of Object.entries(container_types)) {
            if (include === true) {
                searchString += "&container_type=" + container_type
            }
        }

        searchString += "&page=" + 0
        dispatch(resetPages())
    
        axios
        .get(GET_ALL_GEOCACHES_MAP_URL + searchString)
        .then((res) => {
            if (res.data) {
                dispatch(updateAllGeocachesMap(res.data))
                
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }



    const data = {
        geocaches,
        displayedGeocaches,
        maxPages,
        searchInput
    }

    const methods = {
        getAllGeocaches,
        confirmSearch,
        confirmSearchGeocachesMap
    }

    return {
        data,
        methods
    }
}