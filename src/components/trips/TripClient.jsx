import { useNavigate } from 'react-router-dom'
import Container from '../Container'
import Heading from '../Heading'
import { useCallback, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../listings/ListingCard';

const TripClient = ({
    reservations,
    currentUser
}) => {
    const navigate = useNavigate();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id)=>{
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(()=>{
                toast.success('예약 취소 완료')
                window.location.reload();
            })
            .catch((error)=>{
                toast.error(error?.response?.data?.error);
            })
            .finally(()=>{
                setDeletingId('');
            })
    },[])

    return (
        <Container>
            <Heading 
                title="여행"
                subtitle="내가 떠난 여행들 그리고 떠날 여행들"
            />
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-52xl:grid-cols-6 gap-8'>
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

export default TripClient