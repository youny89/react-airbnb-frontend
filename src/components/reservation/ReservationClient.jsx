import { useCallback, useState } from "react"

import Container from "../Container"
import Heading from "../Heading"
import ListingCard from "../listings/ListingCard"
import axios from "axios"
import toast from "react-hot-toast"

const ReservationClient = ({
    reservations,
    currentUser
}) => {
    const [deletingId, setDeletingId] = useState(false)

    const onCancel = useCallback((id) => {
        setDeletingId(id);
        
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success('예약 취소 완료')
            window.location.reload();
        })
        .catch((error)=>{
            console.log(error);
            toast.error(error?.response?.data?.error);
        })
        .finally(()=>{
            setDeletingId('');
        })
    },[])

    return (
        <Container>
            <Heading title='숙소 예약' subtitle='게스트들의 예약 목록입니다.'/>
            <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {reservations?.map(reservation => (
                    <ListingCard 
                        key={reservation?._id}
                        data={reservation?.listing}
                        reservation={reservation}
                        actionId={reservation?._id}
                        onAction={onCancel}
                        actionLabel="숙박 예약 취소하기"
                        disabled={deletingId === reservation?._id}
                        currentUser={currentUser}
                />
                ))}
            </div>
        </Container>
    )
}

export default ReservationClient