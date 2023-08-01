import { ReactNode } from "react"
import { HandlePaginationNavigation } from "../../pages/GeocachesPage/GeocachesTable/GeocachesTableInterface"


export interface IPaginationGroup {
    (): JSX.Element
}