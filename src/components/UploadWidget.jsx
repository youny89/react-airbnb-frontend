// whenever we load our upload script inside of template file(index.html),
// we need a way to save reference to the code that actually loaded.
// so we can use useRef and useEffect    

import { useEffect, useRef } from "react"
import { TbPhotoPlus } from "react-icons/tb";

// When UploadWidget component renders, we want go off and find out that reference and save it
const UploadWidget = ({onChange, value}) => {
    const cloludinaryRef = useRef();
    const widgetRef = useRef();

    // it runs when the components render and then we can store that reference
    useEffect(()=>{
        cloludinaryRef.current = window.cloudinary;
        widgetRef.current = cloludinaryRef.current.createUploadWidget({
            cloudName:'duge0rbag',
            uploadPreset:'xzivg1ue',
            showCompletedButton: true
        }, function (err, result) {
            if(!err && result.event === 'success') {
                onChange(result.info.secure_url);
            }
        })
    },[])

    return (
        <div className='max-w-[400px] max-h-[400px] relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-400'>
            <TbPhotoPlus size={50}/>
            <div onClick={()=> widgetRef.current.open()} className="font-semibold text-lg">사진을 골라주세요</div>
            {value && (
                <div className='absolute inset-0 w-full h-full'>
                    <img 
                        src={value}
                        alt="사진"
                        style={{objectFit:'cover'}}
                    />
                </div>
            )}
        </div>
        // <button onClick={()=> widgetRef.current.open()}>Open Widget</button>
    )
}

export default UploadWidget