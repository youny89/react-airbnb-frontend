import useLoginModal from './useLoginMoal';
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useUserStore from "./useUserStore";

const useFavorite = ({
    listingId,
    currentUser
}) => {
    const userStore = useUserStore();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(()=>{
        const list = currentUser?.favorites || [];
        return list.includes(listingId); 
    },[currentUser, listingId])

    const toggleFavoirte = useCallback(async (e)=>{
        e.stopPropagation();
        if(!currentUser) return loginModal.onOpen();
        
        try {
            let reqeust;
            let message;
            if(hasFavorited) {
                reqeust = () => axios.delete(`/api/listings/favorite/${listingId}`)
                message = '관심 숙소에 삭제 완료'
            } else {
                reqeust = () => axios.post(`/api/listings/favorite/${listingId}`)
                message = '관심 숙소에 추가 완료'
            }

            await reqeust();
            userStore.update();
            toast.success(message)
        } catch (error) {
            toast.error('서버에러');
        }

    },[currentUser, hasFavorited, listingId, loginModal, userStore])

    return {
        hasFavorited,
        toggleFavoirte
    }
}

export default useFavorite;