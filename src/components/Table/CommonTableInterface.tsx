import { IGeocachesTableData } from "../../pages/GeocachesPage/GeocachesTable/GeocachesTableInterface";

export interface ICommonTableProps {
    headers: Array<String>
    data: Array<IGeocachesTableData>
}

export interface ICommonTable {
    (props: ICommonTableProps): JSX.Element
}
