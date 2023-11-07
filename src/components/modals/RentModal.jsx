import { useMemo, useState, lazy, Suspense, useEffect} from "react"
import Modal from "./Modal"
import useRentModal from '../../hooks/useRentModal'

import Heading from '../Heading';

import { categories } from '../navbar/category/Categories';
import CategoryInput from "../inputs/CategoryInput";
import { useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import Map from "../Map";
import Counter from "../inputs/Counter";
import Input from '../inputs/Input';
import UploadWidget from "../UploadWidget";
import axios from "axios";
import toast from "react-hot-toast";
// const Map = lazy(()=> import('../Map'))


const STEPS = {
    CATEGORY:0,
    LOCATION:1,
    INFO:2,
    IMAGES:3,
    DESCRIPTION:4,
    PRICE:5
}

const RentModal = () => {
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(STEPS.CATEGORY);

    const rentModal = useRentModal();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState:{ errors}
    } = useForm({
        defaultValues:{
            category:'',
            location:null,
            guestCount:1,
            roomCount:1,
            bathroomCount:1,
            imageSrc:'',
            price:1,
            title:'',
            description:''
        }
    })

    // we created custom categoryInput, we have to create a work around.
    // so first things we have to create a way to watch our category value.
    const category = watch('category'); 
    const location = watch('location'); 
    const guestCount = watch('guestCount'); 
    const roomCount = watch('roomCount'); 
    const bathroomCount = watch('bathroomCount'); 
    const imageSrc = watch('imageSrc'); 

    // in react hook form, setValue by default, it does set the value, but it is not re-render the page.
    // so we have to motivate a little bit.
    const setCustomValue = (id, value) => setValue(id, value, {
        shouldValidate:true,
        shouldDirty:true,
        shouldTouch:true
    })


    const onBack = () => setStep(prev=> prev -1 );
    const onNext = () => setStep(prev=> prev +1 );

    const actionText = useMemo(()=>{
        if(step === STEPS.PRICE) return '완료하기'
        return '다음';
    },[step])

    const secondaryActionText = useMemo(()=>{
        if(step === STEPS.CATEGORY) return undefined;

        return '뒤로';
    },[step])


    const onSubmit = (data) => {
        if(step !== STEPS.PRICE) return onNext();
        setLoading(true);
        console.log('data: ', data);
        axios.post(`/api/listings`, data)
            .then(()=>{
                toast.success('숙소 등록 완료')
                reset();
                rentModal.onClose()
                window.location.reload();
            })
            .catch((error)=>{
                console.log(error)
                toast.error('슥소 등록 실패')
            })
            .finally(()=>{
                setLoading(false);
            })
    }

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title='숙소 정보를 알려주세요'
                subtitle='다음중 숙소를 가장 잘 설명하는 것은 무엇입니까?'
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 h-full overflow-auto max-h-[50vh]">
                {categories.map(item=>(
                    <div key={item.label} className="cols-span-1">
                        <CategoryInput 
                            onClick={(category)=> setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if(step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="숙소 위치는 어디인가요?"
                    subtitle='주소는 게스트의 예약이 확정된 후에 공개됩니다.'
                />
                <CountrySelect
                    value={location}
                    onChange={value=> setCustomValue('location', value)}
                 />
                 <Suspense fallback={<p>로딩중...</p>}>
                    <Map 
                        center={location?.latlng}
                    />
                 </Suspense>
            </div>
        )
    }

    if(step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title='기본 사항 작성하기'
                    subtitle=''
                />
                <Counter 
                    title="게스트"
                    subtitle="숙박 가능한 인원은 명 명인가요?"
                    value={guestCount}
                    onChange={value=> setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter 
                    title="방"
                    subtitle="이용 가능한 방은 몇 개인가요?"
                    value={roomCount}
                    onChange={value=> setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter 
                    title="화장실"
                    subtitle="이용 가능한 화장실은 몇 개인가요?"
                    value={bathroomCount}
                    onChange={value=> setCustomValue('bathroomCount', value)}
                />
                <hr />
            </div>
        )
    }

    if(step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <Heading 
                    title='숙소 사진을 추가 해주세요'
                    subtitle='숙소의 매력을 돋 보이기에 하세요'
                />
                {/* <ImageUpload /> */}
                <UploadWidget 
                    onChange={value=> setCustomValue('imageSrc', value)}
                    value={imageSrc}/>
            </div>
        )
    }

    if(step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="숙소 이름과 설명을 작성해주세요"
                    subtitle="숙소 이름은 짧을수록 효과적입니다. 나중에 언제든지 변경할 수 있으니, 걱정하지 마세요" 
                />
                <Input 
                    id="title"
                    label="제목"
                    disabled={loading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input 
                    id="description"
                    label="설명"
                    disabled={loading}
                    register={register}
                    errors={errors}
                    required
                />
                
            </div>
        )
    }

    if(step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="요금을 작성 해주세요"
                    subtitle='1박 요금을 작성하고 등록을 완료해주세요!'
                />

                <Input 
                    id="price"
                    label="가격"
                    formatPrice
                    disabled={loading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    const footerContent = (
        <p>footer cotent</p>
    )
    return (
        <Modal 
            title='숙소 대여'
            actionText={actionText}
            secondaryActionText={secondaryActionText}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
            footer={footerContent}
            disabled={loading}
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
        />
    )
}

export default RentModal