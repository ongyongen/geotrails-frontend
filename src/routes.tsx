
// const BASE_URL =  "http://127.0.0.1:8000/api"
const BASE_URL = "https://www.geotrails.net/api"

export const CREATE_ACCOUNT_URL = `${BASE_URL}/create_account`
export const LOGIN_URL = `${BASE_URL}/login`
export const LOGOUT_URL = `${BASE_URL}/logout`
export const GET_ALL_GEOCACHES_URL = `${BASE_URL}/geocaches`
export const GET_ALL_GEOCACHES_MAP_URL = `${BASE_URL}/geocaches_map`

export const GET_GEOCACHE_DETAILS_URL = `${BASE_URL}/geocache?cache_code=`

export const LOG_GEOCACHE = `${BASE_URL}/log_geocache`
export const GET_ALL_GEOCACHES_FOUND_BY_DATE = `${BASE_URL}/geocaches_records_agg_date`
export const GET_ALL_GEOCACHES_FOR_A_DATE = `${BASE_URL}/geocaches_records_by_date`
export const GET_ALL_FOUND_GEOCACHES = `${BASE_URL}/geocaches_records`
export const GET_CACHES_FOUND_BY_PLANNING_AREA = `${BASE_URL}/geocaches_records_agg_planning_area`
export const GET_CACHES_FOUND_BY_CACHE_OWNER = `${BASE_URL}/geocaches_records_agg_cache_owner`

export const HOME_PAGE_PATH = "/"
export const GEOCACHES_PAGE_PATH = "/geocaches"
export const GEOCACHES_PAGE_MAP_PATH = "/geocaches/map"

export const GEOCACHE_DETAILS_PAGE_PATH = "/geocache/:code"
export const NAV_TO_GEOCACHE_DETAILS_PAGE_PATH = "/geocache/"

export const LOGIN_PAGE_PATH = "/login"
export const SIGNUP_PAGE_PATH = "/signup"
export const USER_PROFILE_PAGE_PATH = "/profile"
export const LOGOUT_PAGE_PATH = "/logout"

export const USER_DASHBOARD_PATH = "/profile/dashboard"

export const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN
export const MAPBOX_MAP_STYLE = "mapbox://styles/mapbox/streets-v9"


export const obtain_mapbox_api = (searchString: string) => {
    return `https://developers.onemap.sg/commonapi/search?searchVal=${searchString}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
}
