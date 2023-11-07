import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";

const HeartButton = ({
    listingId,
    currentUser
}) => { 

    const {
        hasFavorited,
        toggleFavoirte
    } = useFavorite({listingId, currentUser})

    return (
        <div className="relative hover:opacity-75 transition cursor-pointer" onClick={toggleFavoirte}>
            <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]"/>
            <AiFillHeart size={24} className={`
                ${hasFavorited ? 'fill-rose-500':'fill-neutral-500/70'}
            `}/>
        </div>
    )
}

export default HeartButton