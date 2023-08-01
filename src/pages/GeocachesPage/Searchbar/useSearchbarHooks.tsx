import { useState } from "react"
import axios from "axios"
import { GET_GEOCACHE_DETAILS_URL } from "../../../routes"

export const useSearchbarHooks = () => {

    const [searchInput, setSearchInput] = useState("")

    const handleSearchInput = (e:any) => {
        setSearchInput(e.target.value)
    }

    const confirmSearch = (e:any) => {
        axios
        .get(GET_GEOCACHE_DETAILS_URL + searchInput)
        .then((res) => {
            console.log(res)

        })
        .catch((error) => {
            console.log(error)
        })


    }

    const data = {
        searchInput
    }

    const methods = {
        handleSearchInput,
        confirmSearch
    }

    return {
        data,
        methods
    }


}