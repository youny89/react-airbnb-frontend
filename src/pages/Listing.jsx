import { useParams } from "react-router-dom"
import useFetchData from "../hooks/useFetchData";
import EmptyContent from "../components/EmptyContent";
import useUserStore from "../hooks/useUserStore";
import ListingClient from "../components/listings/ListingClient";

const ListingPage = () => {
    const params = useParams();
    const {data, error, loading} = useFetchData(`/api/listings/${params?.id}`)
    const currentUser = useUserStore(state=>state.currentUser)

    if(!data) {
        return <EmptyContent title="해당 숙소를 찾을수 없습니다."/>
    }

    return (
        <ListingClient list={data} currentUser={currentUser}/>
    )
}

export default ListingPage