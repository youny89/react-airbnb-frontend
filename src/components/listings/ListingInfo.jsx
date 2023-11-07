import Avatar from '../Avatar'
import useCountries from "../../hooks/useCountries"
import ListingCategory from './ListingCategory'
import Map from "../Map";

const ListingInfo = ({
    user,
    category,
    guestCount,
    roomCount,
    bathroomCount,
    description,
    locationValue
}) => {
    const { getByValue } = useCountries()
    const coordinates = getByValue(locationValue)?.latlng

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>주인장: {user?.name || user?.email}</div>
                    <Avatar src={user?.image}/>
                </div>

                <div className='flex flex-row items-center gap-4 font-light text-neutral-600'>
                    <div>손님 : {guestCount}</div>
                    <div>방 : {roomCount}</div>
                    <div>화장실 : {bathroomCount}</div>
                </div>
            </div>
            <hr />

            {category && (
                <ListingCategory 
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />

            <div className='text-lg font-light text-neutral-500'>
                {description}
            </div>
            <hr />

            <Map center={coordinates}/>
        </div>
    )
}

export default ListingInfo