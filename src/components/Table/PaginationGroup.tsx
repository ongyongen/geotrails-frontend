import { Pagination } from "react-bootstrap";
import { IPaginationGroup } from "./PaginationGroupInterface";
import styled from "styled-components";
import { PURPLE } from "../../themes/colors";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store/storeInterface";
import { useGeocachesTableHooks } from "../../pages/GeocachesPage/GeocachesTable/useGeocachesTableHooks";
import { decrementPage, incrementPage } from "../../pages/GeocachesPage/GeocachesTable/geocachesTableSlice";

export const PaginationGroup: IPaginationGroup = () => {
    
    const {data, methods} = useGeocachesTableHooks()
    const dispatch = useDispatch<AppDispatch>();

    const geocaches = useSelector((state: any) => state.geocachesTable.geocaches)
    const current_page = useSelector((state: any) => state.geocachesTable.current_page)


    return (
        <Pagination>
            {
                current_page > 1 && 
                <StyledPaginationPrev onClick={() => dispatch(decrementPage())}/>
            }
            {
                current_page <= 1 && 
                <StyledPaginationPrev disabled />
            }

            <StyledPaginationItem>
                {current_page}
            </StyledPaginationItem>
            

            {   geocaches.length >= 10 &&
                <StyledPaginationNext onClick={() => dispatch(incrementPage())}/>
            }
            {   geocaches.length < 10 &&
                <StyledPaginationNext disabled/>
            }
        </Pagination>
    )
}

const StyledPaginationFirst = styled(Pagination.First)`
    > a, a:hover, a:focus {
        color:${PURPLE};
    }
`

const StyledPaginationLast = styled(Pagination.Last)`
    > a, a:hover, a:focus {
        color:${PURPLE};
    }
`

const StyledPaginationNext = styled(Pagination.Next)`
    > a, a:hover, a:focus {
        color:${PURPLE};
    }
`

const StyledPaginationPrev = styled(Pagination.Prev)`
    > a, a:hover, a:focus {
        color:${PURPLE};
    }
`

const StyledPaginationItem = styled(Pagination.Item)`
    > a, a:hover, a:focus {
        color:${PURPLE};
    }
`