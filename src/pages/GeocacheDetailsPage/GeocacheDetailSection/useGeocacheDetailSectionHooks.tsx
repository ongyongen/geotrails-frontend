import React from "react";
import { useState } from "react";
import { GET_GEOCACHE_DETAILS_URL, LOG_GEOCACHE } from "../../../routes";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider";
import { tokenToString } from "typescript";

interface IUseGeocacheDetailSectionHooks {
    (code: string|undefined) : any
}

interface IGeocacheDetail {
    cache_code: string; 
    name: string;
    geocache_type: string;
    container_type: string;
    difficulty: string;
    terrain: string;
    planning_area: string;
    owner_name: string;
    found_rate: string;
}

var emptyMap: IGeocacheDetail = {
    cache_code: "",
    name: "",
    geocache_type: "",
    container_type: "",
    difficulty: "",
    terrain: "",
    planning_area: "",
    owner_name: "",
    found_rate: ""
}

export const useGeocacheDetailSectionHooks: IUseGeocacheDetailSectionHooks = (code) => {
    const { user, token } = useContext(AuthContext);

    const [geocacheDetail, setGeocacheDetail] = useState(emptyMap)

    useEffect(() => {
        getGeocacheDetail()
    },[])

    const getGeocacheDetail = () => {
        axios
        .get(GET_GEOCACHE_DETAILS_URL + code)
        .then((res) => {
            console.log(res)
            setGeocacheDetail(res.data)
        })
        .catch((err) => {
            console.log(err)
        })

    }

    const logGeocache = () => {
        var data = {
            "username": user,
            "cache_code" : geocacheDetail["cache_code"],
            "name" : geocacheDetail["name"],
            "geocache_type": geocacheDetail["geocache_type"],
            "container_type": geocacheDetail["container_type"],
            "difficulty": geocacheDetail["difficulty"],
            "terrain": geocacheDetail["terrain"],
            "planning_area": geocacheDetail["planning_area"],
            "owner_name": geocacheDetail["owner_name"],
            "found_rate": geocacheDetail["found_rate"]
        }

        var headers = {
            withCredentials: true,
            headers: { 'Authorization': 'Bearer ' + token }
        }

        axios
            .post(LOG_GEOCACHE, data, headers)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err.message)
            })
    
    }

    const data = {
        geocacheDetail
    }

    const methods = {
        getGeocacheDetail,
        logGeocache
    }

    return { 
        data,
        methods
    }

}