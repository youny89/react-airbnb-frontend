import { useSearchParams } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi'

import useSearchModal from '../../hooks/useSearchModal'
import useCountries from '../../hooks/useCountries'
import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';

const Search = () => {
    const searchModal = useSearchModal();
    const [searchParams, setSearchParams] = useSearchParams();

    const { getByValue } = useCountries()

    const locationValue = searchParams.get('locationValue');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const guestCount = searchParams.get('guestCount');

    const locationText= useMemo(()=>{
        if(locationValue) return getByValue(locationValue).label;
        return '어디든지'
    },[locationValue, getByValue])


    const durationText= useMemo(()=>{
        if(startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            let diff = differenceInDays(end, start);

            if(diff === 0) diff = 1;
            return `${diff}일`
        }

        return '언제든지'
    },[startDate, endDate])

    const guestText = useMemo(()=>{
        if(guestCount) return `${guestCount}명`;
        return '게스트 추가'
    },[guestCount])

    return (
        <div onClick={searchModal.onOpen} className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex flex-row items-center justify-between">
                <div className="text-sm font-semibold px-6">
                    {locationText}
                </div>
                <div className="hidden sm:block border-x-[1px] text-center flex-1 text-sm font-semibold px-6">
                    {durationText}
                </div>
                <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
                    <div className="hidden sm:block">
                        {guestText}
                    </div>
                    <div className="p-2 bg-rose-500 rounded-full text-white">
                        <BiSearch />
                    </div>
                </div>
            </div>        
        </div>
    )
}

export default Search