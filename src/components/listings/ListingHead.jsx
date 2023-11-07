import Heading from '../Heading'
import useCountries from '../../hooks/useCountries'
import HeartButton from '../HeartButton'

const ListingHead = ({
    id,
    title,
    imageSrc,
    locationValue,
    currentUser
}) => {
    const { getByValue } = useCountries()
    const location = getByValue(locationValue);

    return (
        <>
            <Heading 
                title={title}
                subtitle={`${location?.region}, ${location.label}`}
            />
            <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
                <img 
                    alt="이미지"
                    src={imageSrc}
                    className='object-cover w-full'
                />
                <div className='absolute top-5 right-5'>
                    <HeartButton listingId={id} currentUser={currentUser}/>
                </div>
            </div>     
        </>
    )
}

export default ListingHead