import { createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'


interface IFoundGeocache {
    date: string; 
    count: number
}
 

export const ProfileSlice = createSlice({
    name: 'Profile',
  
    initialState: {
        calendar_clicked_count: 0,
        calendar_clicked_date: "",
        all_found_geocaches: [],
        geocaches_count_by_date: [],
        geocaches_on_current_date: [],
        cache_types: [],
        container_types: [],
        avg_terrain: 0,
        avg_difficulty: 0,
        total_caches_found: 0,
        geocaches_by_planning_area: [],
        geocaches_by_cache_owner: []
    },
  
    reducers: {
        updateCalendarClickedCount: (state, action) => {
            state.calendar_clicked_count = action.payload
        },

        updateCalendarClickedDate: (state, action) => {
            state.calendar_clicked_date = action.payload
        },
    
        updateAllFoundGeocaches: (state, action) => {
            state.all_found_geocaches = action.payload
        },

        updateGeocachesCountByDate: (state, action) => {
            state.geocaches_count_by_date = action.payload
        },

        updateGeocachesOnCurrentDate: (state, action) => {
            state.geocaches_on_current_date = action.payload
        },

        updateCacheTypes: (state, action) => {
            state.cache_types = action.payload
        },

        updateContainerTypes: (state, action) => {
            state.container_types = action.payload
        },

        updateAvgDifficulty: (state, action) => {
            state.avg_difficulty = action.payload
        },

        updateAvgTerrain: (state, action) => {
            state.avg_terrain = action.payload
        },

        updateTotalCachesFound: (state, action) => {
            state.total_caches_found = action.payload
        },

        updateGeocachesByPlanningArea: (state, action) => {
            state.geocaches_by_planning_area = action.payload
        },

        updateGeocachesByCacheOwner: (state, action) => {
            state.geocaches_by_cache_owner = action.payload
        }


    },
  })
  

export const { 
    updateCalendarClickedCount,
    updateCalendarClickedDate,
    updateAllFoundGeocaches,
    updateGeocachesCountByDate,
    updateGeocachesOnCurrentDate,
    updateCacheTypes,
    updateContainerTypes,
    updateAvgDifficulty,
    updateAvgTerrain,
    updateTotalCachesFound,
    updateGeocachesByPlanningArea,
    updateGeocachesByCacheOwner
} = ProfileSlice.actions
  
export default ProfileSlice.reducer

