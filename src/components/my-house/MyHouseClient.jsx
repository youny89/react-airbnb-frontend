import { useState } from "react"
import Container from "../Container"
import Heading from "../Heading"
import ListingCard from "../listings/ListingCard"
import axios from "axios"
import { useCallback } from "react"
import toast from "react-hot-toast"

const MyHouseClient = ({currentUser, listings}) => {
    const [deletingId, setDeletingId] = useState('')

    const onDelete = useCallback((id) => {
        setDeletingId(id)
        axios.delete(`/api/listings/${id}`)
            .then(()=>{
                toast.success('숙소 삭제 완료')

            })
            .catch(error=>{
                toast.error('숙소 삭제 실패')
            })
            .finally(()=>{
                setDeletingId('');
            })
    })

    return (
        <Container>
            <Heading title="내 숙소 목록" subtitle="숙소를 등록/ 수정/ 삭제 등 관리 하세요"/>
            <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {listings?.map(listing=>(
                    <ListingCard 
                        key={listing._id}
                        data={listing}
                        actionId={listing._id}
                        actionLabel='삭제하기'
                        onAction={onDelete}
                        disabled={deletingId === listing._id}
                    />

                ))}
            </div>
        </Container>
    )
}

export default MyHouseClient