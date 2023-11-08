import EmptyContent from '../components/EmptyContent'

import TripClient from '../components/trips/TripClient';
import useUserStore from '../hooks/useUserStore'
import useFetchData from '../hooks/useFetchData';

const Trip = () => {
    const currentUser = useUserStore(state=> state.currentUser);
    const {data, loading, error} = useFetchData(`/api/reservations?userId=${currentUser._id}`) || [];

    if(!currentUser) {
        return (
            <EmptyContent title='로그인 해주세요' subtitle='로그인 후 이용 가능합니다.'/>
        )
    }

    if(data?.length ===0) {
        return (
            <EmptyContent title='여행 정보가 없습니다.' subtitle='숙박 예약 먼저 해주세요'/>
        )
    }


    return (
        <TripClient 
            reservations={data}
            currentUser={currentUser}
        />
    )
}

export default Trip