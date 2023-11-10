import { useState,useCallback,useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import qs from 'query-string'

import Heading from "../Heading";
import Modal from "./Modal"
import Map from "../Map";
import CountrySelect from "../inputs/CountrySelect";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

import useSearchModal from "../../hooks/useSearchModal"
import { formatISO } from "date-fns";

const STEPS = {
    LOCATION : 0,
    DATE : 1,
    INFO : 2
}

const SearchModal = () => {
    const [step, setStep] = useState(STEPS.LOCATION);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const searchModal = useSearchModal();

    const [location, setLocation] = useState();
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key:'selection'
    });
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);


    const onNext = useCallback(()=>{
        setStep(value=> value + 1);
    },[])
    const onBack = useCallback(()=>{
        setStep(value=> value - 1);
    },[])

    const onSubmit = useCallback(() => {
        if(step !== STEPS.INFO) return onNext();

        const currentQuery = qs.parse(searchParams.toString());

        const updatedQuery = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            bathroomCount,
            roomCount
        }

        // query로 전달해야 되니깐 포맷 해야됨.
        if(dateRange.startDate) updatedQuery.startDate = formatISO(dateRange.startDate);
        if(dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate)

        const urlWithQuery = qs.stringifyUrl({
            url:'/',
            query: updatedQuery
        });

        setStep(STEPS.LOCATION);
        searchModal.onClose();
        navigate(urlWithQuery);
    },[step,dateRange,guestCount,roomCount,bathroomCount,onNext,searchModal,navigate]);


    const actionText = useMemo(()=>{
        if(step === STEPS.INFO) return '검색하기'
        return '다음'
    },[step]);
    
    const secondaryActionText= useMemo(()=>{
        if(step === STEPS.LOCATION) return undefined;
        return '뒤로'
    },[step]);


    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="어느 나라로 떠나시나요?" subtitle="여행 국가를 선택하세요"/>
            <CountrySelect value={location} onChange={(value)=> setLocation(value)}/>
            <Map center={location?.latlng} />
        </div>
    )

    if(step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="언제 떠나 시나요?" subtitle='여행 날짜를 선택 해주세요'/>
                <Calendar value={dateRange} onChange={value=> setDateRange(value.selection)}/>
            </div>
        )
    }

    if(step === STEPS.INFO){
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="추가 정보를 선택 해주세요" subtitle='추가 정보를 선택해서 나에게 딱 맞는 숙소를 찾아 보세요'/>
                <Counter title="게스트" subtitle='몇명의 손님이 방문 하시나요?' value={guestCount} onChange={value=> setGuestCount(value)}/>
                <Counter title="방" subtitle='몇개의 방이 필요 하신가요?' value={roomCount} onChange={value=> setRoomCount(value)}/>
                <Counter title="손님" subtitle='몇개의 화장실이 필요 하신가요?' value={bathroomCount} onChange={value=> setBathroomCount(value)}/>
            </div>
        )
    }
    return (
        <Modal 
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            title='검색'
            body={bodyContent}
            actionText={actionText}
            secondaryActionText={secondaryActionText}
            secondaryAction={STEPS.LOCATION === step ? undefined:onBack}
            onSubmit={onSubmit}
        />
    )
}

export default SearchModal