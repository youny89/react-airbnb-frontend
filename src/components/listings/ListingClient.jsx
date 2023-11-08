import { 
    useCallback,
    useEffect,
    useMemo,
    useState } from "react"
import { useNavigate } from "react-router-dom";
import { 
    differenceInCalendarDays,
    eachDayOfInterval } from 'date-fns';
import axios from "axios";
import toast from "react-hot-toast";

import Container from "../Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import useLoginModal from "../../hooks/useLoginMoal";

import { categories } from '../navbar/category/Categories';
import ListingReservation from "./ListingReservation";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

const ListingClient = ({
    list,
    currentUser,
    reservations=[]
}) => {
    const [loading, setLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(list.price)
    const [dateRange, setDateRange] = useState(initialDateRange)

    const navigate = useNavigate();

    const loginModal = useLoginModal();

    const disabledDates = useMemo(()=>{
        let dates = [];

        reservations.forEach(reservation=>{
            const ranges = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ranges]
        })

        return dates;
    },[reservations])

    const category = useMemo(()=>{
        return categories.find(item=> item.label === list.category);
    },[list.category])

    const onCreateReservation = useCallback(()=>{
        if(!currentUser) return loginModal.onOpen();

        setLoading(true)

        axios.post('/api/reservations',{
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listId: list.id
        })
        .then(()=>{
            toast.success('예약 완료')
            setDateRange(initialDateRange)

            // redirect to trips
            window.location.reload();
        })
        .catch(()=>{
            toast.error('예약 실패')
        })
        .finally(()=>{
            setLoading(false)
        })
    },[
        totalPrice,
        dateRange,
        list.id,
        navigate,
        currentUser,
        loginModal
    ]);

    // change total price depending on how user selects the dates in our calendar
    // it it going to notice every time i make a change in my calendar, it is going to count how many days we have selected
    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate) {
            const  dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate)

            if(dayCount && list.price) {
                setTotalPrice(dayCount * list.price)
            } else {
                setTotalPrice(list.price);
            }

        }
    },[dateRange, list.price])

    return (
        <Container>
            <div className="max-w-screen mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead 
                        title={list.title}
                        imageSrc={list.imageSrc}
                        locationValue={list.locationValue}
                        id={list._id}
                        currentUser={currentUser}

                    />

                    <div className="grid gird-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo 
                            user={list.user}
                            category={category}
                            description={list.description}
                            guestCount={list.guestCount}
                            roomCount={list.roomCount}
                            bathroomCount={list.bathroomCount}
                            locationValue={list.locationValue}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation 
                                price={list.price}
                                totalPrice={totalPrice}
                                onChangeDate={value=> setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                diabled={loading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient