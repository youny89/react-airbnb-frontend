import axios from "axios";
import { useEffect, useState } from "react";
import useUserStore from './useUserStore'


const useFetchData = (url) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null);
    const accessToken = useUserStore(state=> state.accessToken);
    axios.defaults.headers.common['Authorization'] = accessToken ? `Bearer ${accessToken}` : undefined;

    useEffect(()=>{
        setLoading(true);
        if(url) {
            axios.get(url)
                .then(response=>setData(response.data))
                .catch(error=> setError(error))
                .finally(()=> setLoading(false))
        } else {
            setLoading(false)
            setError(new Error('url을 입력해주세요.'));
        }
    },[url])


    return {
        data,
        loading,
        error
    }
}

export default useFetchData;