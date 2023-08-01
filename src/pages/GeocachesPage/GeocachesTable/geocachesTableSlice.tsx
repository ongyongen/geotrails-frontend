import { createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'
import { GET_ALL_GEOCACHES_URL } from '../../../routes'

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
} from '../../../components/Modal/constants';

export interface ICacheTypeMap {
  [cache_type: string] : boolean;
} 

export interface IContainerTypeMap {
  [container_type: string] : boolean;
} 

const cache_types_map: ICacheTypeMap = {}  
cache_types_map[CACHE_TYPE_TRADITIONAL] = true
cache_types_map[CACHE_TYPE_MULTICACHE] = true
cache_types_map[CACHE_TYPE_VIRTUAL] = true
cache_types_map[CACHE_TYPE_LETTERBOX] = true
cache_types_map[CACHE_TYPE_EVENT] = true
cache_types_map[CACHE_TYPE_MYSTERY] = true
cache_types_map[CACHE_TYPE_EARTH] = true
cache_types_map[CACHE_TYPE_WHEREIGO] = true

const container_types_map: IContainerTypeMap = {}
container_types_map[CONTAINER_TYPE_MICRO] = true
container_types_map[CONTAINER_TYPE_SMALL] = true
container_types_map[CONTAINER_TYPE_REGULAR] = true
container_types_map[CONTAINER_TYPE_LARGE] = true
container_types_map[CONTAINER_TYPE_VIRTUAL] = true
container_types_map[CONTAINER_TYPE_OTHER] = true
container_types_map[CONTAINER_TYPE_NOT_SPECIFIED] = true

export const geocachesTableSlice = createSlice({
  name: 'geocachesTable',

  initialState: {
    geocaches: [],
    geocaches_map: [],
    searchInput: "",
    planning_area: "All",
    difficulty: 5,
    terrain: 5,
    cache_types: cache_types_map,
    container_types: container_types_map,
    current_page: 1,
    confirmSearch: true
  },

  reducers: {
    updateAllGeocaches: (state, action) => {
      state.geocaches = action.payload
    },

    updateAllGeocachesMap: (state, action) => {
      state.geocaches_map = action.payload
    },

    updateSearchInput: (state, action) => {
      state.searchInput = action.payload.toUpperCase()
    },

    updatePlanningArea: (state, action) => {
      state.planning_area = action.payload
    },

    updateDifficulty: (state, action) => {
      state.difficulty = parseInt(action.payload)
    },

    updateTerrain: (state, action) => {
      state.terrain = parseInt(action.payload)
    },

    updateCacheTypes: (state, action) => {
      var cache_type = action.payload
      state.cache_types[cache_type] = !state.cache_types[cache_type] 
    },

    updateContainerTypes: (state, action) => {
      var container_type = action.payload
      state.container_types[container_type] = !state.container_types[container_type] 
    },

    incrementPage: (state) => {
      state.current_page += 1
    },

    decrementPage: (state) => {
      state.current_page -= 1
    },

    resetPages: (state) => {
      state.current_page = 1
    }

  },
})

export const { 
  updateAllGeocaches, 
  updateAllGeocachesMap,
  updateSearchInput, 
  updatePlanningArea,
  updateDifficulty, 
  updateTerrain, 
  updateCacheTypes,
  updateContainerTypes,
  incrementPage,
  decrementPage,
  resetPages
} = geocachesTableSlice.actions

export default geocachesTableSlice.reducer