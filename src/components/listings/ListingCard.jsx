import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom"
import { format } from 'date-fns'

import HeartButton from "../HeartButton";
import Button from "../Button";
import useCountries from "../../hooks/useCountries";
import useUserStore from "../../hooks/useUserStore";

const ListingCard = ({
    data,
    reservation,
    disabled,
    actionLabel,
    actionId,
    onAction
}) => {
    const navigate = useNavigate();
    const currentUser = useUserStore(state=> state.currentUser);
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue)

    console.log('currentUser in ListingCard : ', currentUser);

    const handleCancel = useCallback((e)=>{
        e.stopPropagation();
        if(disabled) return;

        onAction?.(actionId);
    },[onAction, actionId, disabled])

    const price = useMemo(()=>{
        if(reservation) return reservation.totalPrice;
        return data.price;
    },[reservation, data.price])

    const reserverDate = useMemo(()=>{
        if(!reservation) return ;

        const start = new Date(reserverDate.startDate);
        const end = new Date(reserverDate.endDate);

        return `${format(start,('PP'))} ${format(end,'PP')}`
    },[reservation])



    return (
        <div 
            onClick={() => navigate(`/listings/${data._id}`)}
            className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <img 
                        alt="이미지"
                        src={data.imageSrc}
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                    />

                    <div className="absolute top-3 right-3">
                        <HeartButton 
                            listingId={data._id}
                            currentUser={currentUser}
                        />
                    </div>

                </div>
                
                <div className="font-sembold text-lg">
                        {location?.region}, {location?.label}
                    </div>
                    <div className="font-light text-neutral-500">
                        {reserverDate || data.category}
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="font-sembold">
                            {price}원
                        </div>
                        {!reservation && (
                            <div className="font-light">
                                1박
                            </div>
                        )}
                    </div>
                    {onAction && actionLabel && (
                     <Button 
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onoClick={handleCancel}
                     />   
                    )}
            </div>
        </div>
    )
}

export default ListingCard