import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { GET_ALL_FOUND_GEOCACHES, GET_ALL_GEOCACHES_FOR_A_DATE, GET_ALL_GEOCACHES_FOUND_BY_DATE, GET_CACHES_FOUND_BY_CACHE_OWNER, GET_CACHES_FOUND_BY_PLANNING_AREA } from "../../routes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/storeInterface";
import { useSelector } from "react-redux";
import { updateAllFoundGeocaches, updateAvgDifficulty, updateAvgTerrain, updateCacheTypes, updateCalendarClickedCount, updateCalendarClickedDate, updateContainerTypes, updateGeocachesByCacheOwner, updateGeocachesByPlanningArea, updateGeocachesCountByDate, updateGeocachesOnCurrentDate, updateTotalCachesFound } from "./ProfileSlice";


import { 
    CACHE_TYPE_TRADITIONAL,
    CACHE_TYPE_MULTICACHE,
    CACHE_TYPE_VIRTUAL,
    CACHE_TYPE_LETTERBOX,
    CACHE_TYPE_EVENT,
    CACHE_TYPE_MYSTERY,
    CACHE_TYPE_EARTH,
    CACHE_TYPE_WHEREIGO,
    CONTAINER_TYPE_MICRO,
    CONTAINER_TYPE_SMALL,
    CONTAINER_TYPE_REGULAR,
    CONTAINER_TYPE_LARGE,
    CONTAINER_TYPE_OTHER,
    CONTAINER_TYPE_VIRTUAL,
    CONTAINER_TYPE_NOT_SPECIFIED
} from "../../components/Modal/constants";

interface IFoundGeocache {
    date: string; 
    count: number
}
 
export interface ICacheTypeMap {
    [cache_type: string] : number;
} 

export interface IContainerTypeMap {
    [container_type: string] : number;
} 

export interface IPlanningAreaMap {
    [planning_area: string] : number;
} 
  
export interface ICacheOwnerMap {
    [cache_owner: string] : number;
} 
  

export const useProfileHooks = () => {

    const { user, token } = useContext(AuthContext)

    const all_found_geocaches = useSelector((state: any) => state.Profile.all_found_geocaches)

    const dispatch = useDispatch<AppDispatch>();


    const getGeocacheForADate = (value:IFoundGeocache) => {
        if (value) {
            dispatch(updateCalendarClickedCount(value["count"]))
            dispatch(updateCalendarClickedDate(value["date"]))

            axios
            .get(GET_ALL_GEOCACHES_FOR_A_DATE + "?date=" + value["date"], {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                dispatch(updateGeocachesOnCurrentDate(res.data))

            })
        }
    }

    const getAllFoundGeocaches = () => {
        axios
        .get(GET_ALL_GEOCACHES_FOUND_BY_DATE, { 
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.data) {

                var found: Array<IFoundGeocache> = []
                var seenDates: Array<String> = []
                res.data.forEach((data:any) => {
                    const date = data["_id"]
                    const count = data["total_caches"]
                    if (date) {
                        const caches_found: IFoundGeocache = {
                            "date" : date,
                            "count" : count
                        }
                        found.push(caches_found)
                        seenDates.push(date)
                    }  
                })

                var start = new Date(new Date().getFullYear(), 0, 1)

                Array.from(Array(365).keys()).forEach((num) => {
                    const curr_month = start.getMonth() + 1
                    const curr_month_str = curr_month < 10 ? "0" + curr_month.toString() : curr_month.toString() 
                    
                    const curr_date = start.getDate()
                    const curr_date_str = curr_date < 10 ? "0" + curr_date.toString() : curr_date.toString() 
                    const dateStr = start.getFullYear().toString() + "-" + curr_month_str + "-" + curr_date_str

                    if (!seenDates.includes(dateStr)) {
                        const caches_found: IFoundGeocache = {
                            "date" : dateStr,
                            "count": 0
                        }
                        found.push(caches_found)
                    }
                    start.setDate(start.getDate() + 1);
                })
                dispatch(updateGeocachesCountByDate(found))
            }
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    const generateDateForDashboard = () => {
        getCachesAttributeData()
        getCachesFoundByPlanningArea()
        getCachesFoundByCacheOwner()
    }

    const getCachesAttributeData = () => {
        axios
        .get(GET_ALL_FOUND_GEOCACHES, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            dispatch(updateAllFoundGeocaches(res.data))
            var total_difficulty = 0
            var total_terrain = 0
            var total_caches_found = 0
            var num_caches = res.data.length
            
            var cache_types_map: ICacheTypeMap = {}  
            cache_types_map[CACHE_TYPE_TRADITIONAL] = 0
            cache_types_map[CACHE_TYPE_MULTICACHE] = 0
            cache_types_map[CACHE_TYPE_VIRTUAL] = 0
            cache_types_map[CACHE_TYPE_LETTERBOX] = 0
            cache_types_map[CACHE_TYPE_EVENT] = 0
            cache_types_map[CACHE_TYPE_MYSTERY] = 0
            cache_types_map[CACHE_TYPE_EARTH] = 0
            cache_types_map[CACHE_TYPE_WHEREIGO] = 0
            
            var container_types_map: IContainerTypeMap = {}
            container_types_map[CONTAINER_TYPE_MICRO] = 0
            container_types_map[CONTAINER_TYPE_SMALL] = 0
            container_types_map[CONTAINER_TYPE_REGULAR] = 0
            container_types_map[CONTAINER_TYPE_LARGE] = 0
            container_types_map[CONTAINER_TYPE_VIRTUAL] = 0
            container_types_map[CONTAINER_TYPE_OTHER] = 0
            container_types_map[CONTAINER_TYPE_NOT_SPECIFIED] = 0

            res.data.forEach((data:any) => {
                if (typeof data["difficulty"] === "number") {
                    total_difficulty += data["difficulty"]
                }

                if (typeof data["terrain"] === "number") {
                    total_terrain += data["terrain"]
                }

                if (data["geocache_type"] in cache_types_map) {
                    cache_types_map[data["geocache_type"]] += 1
                    total_caches_found += 1
                }

                if (data["container_type"] in container_types_map) {
                    container_types_map[data["container_type"]] += 1
                }

            })

            var cache_types_arr = []
            for (const [key, value] of Object.entries(cache_types_map)) { 
                const curr = {
                    "geocache_type": key,
                    "count": value
                }
                cache_types_arr.push(curr)
            }

            var container_types_arr = []
            for (const [key, value] of Object.entries(container_types_map)) { 
                const curr = {
                    "container_type": key,
                    "count": value
                }
                container_types_arr.push(curr)
            }


            dispatch(updateCacheTypes(cache_types_arr))
            dispatch(updateContainerTypes(container_types_arr))
            dispatch(updateAvgDifficulty((total_difficulty/num_caches).toFixed(2)))
            dispatch(updateAvgTerrain((total_terrain/num_caches).toFixed(2)))
            dispatch(updateTotalCachesFound(total_caches_found))

        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getCachesFoundByPlanningArea = () => {
        axios
        .get(GET_CACHES_FOUND_BY_PLANNING_AREA, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            var caches_planning_area:any = []
            res.data.forEach((data:any) => {
                const curr = {
                    "planning_area": data["_id"],
                    "count": data["total_caches"]
                }
                caches_planning_area.push(curr)
            })

            if (caches_planning_area.length > 5) {
                dispatch(updateGeocachesByPlanningArea(caches_planning_area.slice(0,5)))
            } else {
                dispatch(updateGeocachesByPlanningArea(caches_planning_area))
            }

        })
        .catch((err) => {
            console.log(err)
        })
    }

    const getCachesFoundByCacheOwner = () => {
        axios
        .get(GET_CACHES_FOUND_BY_CACHE_OWNER, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            var caches_cache_owner:any = []
            res.data.forEach((data:any) => {
                const curr = {
                    "cache_owner": data["_id"],
                    "count": data["total_caches"]
                }
                caches_cache_owner.push(curr)
            })

            if (caches_cache_owner.length > 5) {
                dispatch(updateGeocachesByCacheOwner(caches_cache_owner.slice(0,5)))
            } else {
                dispatch(updateGeocachesByCacheOwner(caches_cache_owner))
            }

        })
        .catch((err) => {
            console.log(err)
        })
    }


    const data = {

    }

    const methods = {
        getAllFoundGeocaches,
        getGeocacheForADate,
        generateDateForDashboard
    }

    return {
        data,
        methods
    }


}

