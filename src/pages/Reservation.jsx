import EmptyContent from "../components/EmptyContent";
import ReservationClient from "../components/reservation/ReservationClient";
import useFetchData from "../hooks/useFetchData";
import useUserStore from "../hooks/useUserStore"

const ReservationPage = () => {
    const currentUser = useUserStore(state=> state.currentUser);
    const {data, loading, error } = useFetchData(`/api/reservations?creatorId=${currentUser?._id}`)
    console.log(data);
    if(!currentUser) {
        return (
            <EmptyContent title="401" subtitle="로그인 해주세요"/>
        )
    }

    if(data?.length === 0) {
        return (
            <EmptyContent title="예약 정보가 없습니다." subtitle="게스트에게 매력적으로 보이도록 숙소 정보를 입력 해보세요."/>
        )
    }

    return (
        <ReservationClient 
            reservations={data}
            currentUser={currentUser}
        />
    )
}

export default ReservationPage