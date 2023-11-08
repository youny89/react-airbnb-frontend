import { useParams } from "react-router-dom"
import useFetchData from "../hooks/useFetchData";
import EmptyContent from "../components/EmptyContent";
import useUserStore from "../hooks/useUserStore";
import ListingClient from "../components/listings/ListingClient";

const ListingPage = () => {
    const params = useParams();
    const {data:list, error:listError, loading:listLoading} = useFetchData(`/api/listings/${params?.id}`)
    const {data:reservations, error:resversationError, loading:reservationLoading} = useFetchData(`/api/reservations?listId=${params.id}`)

    const currentUser = useUserStore(state=>state.currentUser)
    if(!list) {
        return <EmptyContent title="해당 숙소를 찾을수 없습니다."/>
    }

    return (
        <ListingClient
            reservations={reservations || []}
            list={list}
            currentUser={currentUser}/>
    )
}

export default ListingPage